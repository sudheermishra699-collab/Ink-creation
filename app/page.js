'use client'

import { useState, useEffect } from 'react'
import { Film, Shield, Wallet, Users, Star, Zap, Lock, Loader2, LogOut, BarChart3, Search, ShoppingBag, MessageSquare, Network, Briefcase, PlayCircle, Crown, Award, Trophy, User, Video, TrendingUp } from 'lucide-react'

export default function Home() {
  const [authOpen, setAuthOpen] = useState(false)
  const [authMode, setAuthMode] = useState('login')
  const [defaultRole, setDefaultRole] = useState('customer')
  const [currentUser, setCurrentUser] = useState(null)
  const [view, setView] = useState('landing')

  useEffect(() => {
    const savedUser = localStorage.getItem('ink_user')
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser))
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('ink_user_token')
    localStorage.removeItem('ink_user')
    setCurrentUser(null)
    setView('landing')
  }

  const handleAuthSuccess = (user) => {
    setCurrentUser(user)
    setAuthOpen(false)
    setView('dashboard')
  }

  if (view === 'dashboard' && currentUser) {
    return currentUser.role === 'editor' ? (
      <EditorDashboard user={currentUser} onLogout={handleLogout} onHome={() => setView('landing')} />
    ) : (
      <CustomerDashboard user={currentUser} onLogout={handleLogout} onHome={() => setView('landing')} />
    )
  }

  return (
    <>
      <Landing 
        currentUser={currentUser}
        onAdminClick={() => alert('Admin authentication layer active.')}
        onAuthClick={(mode, role = 'customer') => {
          setAuthMode(mode)
          setDefaultRole(role)
          setAuthOpen(true)
        }}
        onDashClick={() => setView('dashboard')}
        onLogout={handleLogout}
      />
      <AuthDialog 
        open={authOpen}
        mode={authMode}
        defaultRole={defaultRole}
        onClose={() => setAuthOpen(false)}
        onAuthed={handleAuthSuccess}
      />
    </>
  )
}

function Landing({ onAdminClick, onAuthClick, currentUser, onDashClick, onLogout }) {
  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans">
      <nav className="flex items-center justify-between px-6 py-5 lg:px-12 border-b border-white/5">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center font-bold">IC</div>
          <span className="text-xl font-semibold tracking-tight">Ink Creation</span>
        </div>
        <div className="flex items-center gap-4">
          {currentUser ? (
            <>
              <button onClick={onDashClick} className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition">
                <User className="w-4 h-4" /> My Dashboard
              </button>
              <button onClick={onLogout} className="text-white/60 hover:text-white transition">
                <LogOut className="w-4 h-4" />
              </button>
            </>
          ) : (
            <>
              <button onClick={() => onAuthClick('login')} className="text-white/70 hover:text-white text-sm font-medium transition">Login</button>
              <button onClick={() => onAuthClick('signup')} className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition">Sign Up Free</button>
            </>
          )}
          <button onClick={onAdminClick} className="text-white/40 hover:text-white transition">
            <Lock className="w-4 h-4" />
          </button>
        </div>
      </nav>

      <section className="px-6 lg:px-12 pt-20 pb-24 text-center max-w-5xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs mb-6">
          <Zap className="w-3 h-3" /> Next-Gen Editing Marketplace
        </div>
        <h1 className="text-5xl lg:text-7xl font-bold tracking-tight mb-6 leading-[1.05]">
          Where <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Editors</span><br />
          Meet <span className="bg-gradient-to-r from-pink-400 to-orange-400 bg-clip-text text-transparent">Creators</span>
        </h1>
        <p className="text-lg lg:text-xl text-white/60 max-w-2xl mx-auto mb-10">
          Escrow-protected projects. Watermarked previews. 3 free revisions. Instant UPI payouts. Built for India&apos;s creator economy.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition text-base" onClick={() => onAuthClick('signup', 'customer')}>
            <User className="w-5 h-5" /> I&apos;m a Client
          </button>
          <button className="border border-white/20 hover:bg-white/5 text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition text-base" onClick={() => onAuthClick('signup', 'editor')}>
            <Video className="w-5 h-5" /> I&apos;m an Editor
          </button>
        </div>
      </section>

      <section className="px-6 lg:px-12 pb-24 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: Shield, title: 'Escrow Protection', desc: '100% UPI funds locked until you approve.' },
            { icon: Film, title: 'Smart Watermarked Preview', desc: 'Adaptive 360p–1080p streaming until clean unlock.' },
            { icon: Wallet, title: 'Instant UPI Payouts', desc: 'Editors withdraw earnings with one tap.' },
            { icon: Users, title: 'Follow & Notify', desc: 'Get pinged when your favorite editor uploads.' },
            { icon: Star, title: 'Level System', desc: 'Bronze → Silver → Gold tiers with lower commissions.' },
            { icon: Zap, title: 'Resumable Uploads', desc: 'Chunked uploads survive any network drop.' },
          ].map((f, i) => (
            <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-6 text-left backdrop-blur">
              <f.icon className="w-8 h-8 text-purple-400 mb-3" />
              <h3 className="text-xl font-bold text-white mb-2">{f.title}</h3>
              <p className="text-white/60 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-white/5 px-6 py-8 text-center text-sm text-white/40">
        © 2026 Ink Creation. Founders: Krishna Kant, Vishal Mishra. CEO: Mohit Mishra.
      </footer>
    </div>
  )
}

function AuthDialog({ open, mode, defaultRole, onClose, onAuthed }) {
  const [tab, setTab] = useState(mode || 'login')
  const [role, setRole] = useState(defaultRole || 'customer')
  const [form, setForm] = useState({ name: '', email: '', password: '', phone: '' })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setTab(mode || 'login')
    setRole(defaultRole || 'customer')
    setForm({ name: '', email: '', password: '', phone: '' })
  }, [open, mode, defaultRole])

  if (!open) return null

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      const mockUserData = {
        name: form.name || (form.email.split('@')[0]),
        email: form.email,
        role: role,
        walletBalance: 0,
        availableBalance: 0,
        level: 'Bronze',
        following: []
      }
      setLoading(false)
      onAuthed(mockUserData)
    }, 1200)
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-slate-900 border border-white/10 text-white rounded-xl max-w-md w-full p-6 relative shadow-2xl">
        <button onClick={onClose} className="absolute top-4 right-4 text-white/40 hover:text-white text-lg">✕</button>
        
        <div className="mb-4 text-left">
          <h2 className="text-2xl font-bold">{tab === 'signup' ? 'Create your account' : 'Welcome back'}</h2>
          <p className="text-white/50 text-sm mt-1">
            {tab === 'signup' ? 'Join Ink Creation as a Client or Editor' : 'Sign in to continue to Ink Creation'}
          </p>
        </div>

        <div className="flex bg-white/5 p-1 rounded-lg mb-4">
          <button onClick={() => setTab('login')} className={`flex-1 py-1.5 text-sm font-medium rounded-md transition ${tab === 'login' ? 'bg-purple-600 text-white shadow' : 'text-white/60 hover:text-white'}`}>Login</button>
          <button onClick={() => setTab('signup')} className={`flex-1 py-1.5 text-sm font-medium rounded-md transition ${tab === 'signup' ? 'bg-purple-600 text-white shadow' : 'text-white/60 hover:text-white'}`}>Sign Up</button>
        </div>

        <div className="grid grid-cols-2 gap-2 mb-4">
          <button type="button" onClick={() => setRole('customer')}
            className={`p-3 rounded-lg border text-left transition ${role === 'customer' ? 'border-purple-500 bg-purple-500/10' : 'border-white/10 bg-white/5'}`}>
            <User className="w-5 h-5 mb-1 text-purple-300" />
            <div className="text-sm font-medium">Client</div>
            <div className="text-xs text-white/50">Order video edits</div>
          </button>
          <button type="button" onClick={() => setRole('editor')}
            className={`p-3 rounded-lg border text-left transition ${role === 'editor' ? 'border-pink-500 bg-pink-500/10' : 'border-white/10 bg-white/5'}`}>
            <Video className="w-5 h-5 mb-1 text-pink-300" />
            <div className="text-sm font-medium">Editor</div>
            <div className="text-xs text-white/50">Earn from edits</div>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          {tab === 'signup' && (
            <div>
              <label className="text-white/80 text-xs font-medium block mb-1">Full Name</label>
              <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-purple-500" placeholder="Your name" />
            </div>
          )}
          <div>
            <label className="text-white/80 text-xs font-medium block mb-1">Email</label>
            <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-purple-500" placeholder="you@example.com" />
          </div>
          {tab === 'signup' && (
            <div>
              <label className="text-white/80 text-xs font-medium block mb-1">Phone (optional)</label>
              <input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-purple-500" placeholder="+91 98765 43210" />
            </div>
          )}
          <div>
            <label className="text-white/80 text-xs font-medium block mb-1">Password</label>
            <input type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} required
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-purple-500" placeholder="••••••••" />
          </div>
          <button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 rounded-lg text-sm flex items-center justify-center disabled:opacity-50 transition" disabled={loading}>
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : (tab === 'signup' ? 'Create Account' : 'Sign In')}
          </button>
        </form>
      </div>
    </div>
  )
}

function CustomerDashboard({ user, onLogout, onHome }) {
  const [active, setActive] = useState('dashboard')
  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'browse', label: 'Browse Editors', icon: Search },
    { id: 'network', label: 'My Network', icon: Network },
    { id: 'order', label: 'Place Order', icon: ShoppingBag },
    { id: 'wallet', label: 'Ink Wallet', icon: Wallet },
    { id: 'support', label: 'Support', icon: MessageSquare },
  ]
  return (
    <RoleLayout brandColor="purple" role="Client" user={user} tabs={tabs} active={active} setActive={setActive} onLogout={onLogout} onHome={onHome}>
      {active === 'dashboard' && <StatGrid stats={[
        { label: 'Active Orders', value: 0, color: 'from-purple-500 to-pink-500' },
        { label: 'Completed', value: 0, color: 'from-green-500 to-emerald-500' },
        { label: 'Editors Followed', value: user.following?.length || 0, color: 'from-blue-500 to-cyan-500' },
        { label: 'Wallet (₹)', value: user.walletBalance || 0, color: 'from-orange-500 to-red-500' },
      ]} title={`Welcome, ${user.name}`} />}
      {active === 'browse' && <BrowseEditors />}
      {active !== 'dashboard' && active !== 'browse' && <PlaceholderTab label={tabs.find(t => t.id === active).label} />}
    </RoleLayout>
  )
}

function EditorDashboard({ user, onLogout, onHome }) {
  const [active, setActive] = useState('workspace')
  const tabs = [
    { id: 'workspace', label: 'My Workspace', icon: Briefcase },
    { id: 'portfolio', label: 'Portfolio Manager', icon: PlayCircle },
    { id: 'fans', label: 'My Fans', icon: Users },
    { id: 'earnings', label: 'Earnings & Wallet', icon: Wallet },
    { id: 'subscription', label: 'Subscription', icon: Crown },
  ]
  const levelMeta = {
    Bronze: { icon: Award, color: 'from-orange-600 to-amber-700', commission: '25%' },
    Silver: { icon: Trophy, color: 'from-slate-400 to-slate-600', commission: '20%' },
    Gold: { icon: Crown, color: 'from-yellow-400 to-amber-600', commission: '15%' },
  }
  const lvl = levelMeta[user.level || 'Bronze']
  return (
    <RoleLayout brandColor="pink" role="Editor" user={user} tabs={tabs} active={active} setActive={setActive} onLogout={onLogout} onHome={onHome}>
      {active === 'workspace' && (
        <>
          {!user.subscriptionActive && (
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 flex items-center gap-4 mb-6 text-left">
              <Lock className="w-6 h-6 text-amber-300 flex-shrink-0" />
              <div className="flex-1">
                <div className="font-semibold text-amber-200">Subscription Required</div>
                <div className="text-sm text-amber-200/70">Activate a Weekly/Monthly/Yearly plan to start accepting client briefs.</div>
              </div>
              <button className="bg-amber-500 hover:bg-amber-600 text-black px-4 py-2 rounded-lg text-sm font-medium transition" onClick={() => setActive('subscription')}>Activate</button>
            </div>
          )}
          <div className="mb-6 text-left">
            <div className="bg-gradient-to-r from-slate-900 to-slate-800 border border-white/10 rounded-xl p-6 flex items-center gap-4">
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${lvl.color} flex items-center justify-center flex-shrink-0`}>
                <lvl.icon className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <div className="text-xs text-white/50">Current Level</div>
                <div className="text-2xl font-bold">{user.level || 'Bronze'}</div>
                <div className="text-sm text-white/60 mt-1">Platform Commission: {lvl.commission}</div>
              </div>
              <div className="text-right">
                <div className="text-xs text-white/50">Completed Orders</div>
                <div className="text-2xl font-bold">{user.completedOrders || 0}</div>
              </div>
            </div>
          </div>
          <StatGrid stats={[
            { label: 'Active Briefs', value: 0, color: 'from-purple-500 to-pink-500' },
            { label: 'Followers', value: 0, color: 'from-blue-500 to-cyan-500' },
            { label: 'Available (₹)', value: user.availableBalance || 0, color: 'from-green-500 to-emerald-500' },
            { label: 'Rating', value: (user.rating || 0).toFixed(1) + ' ★', color: 'from-yellow-500 to-orange-500' },
          ]} />
        </>
      )}
      {active !== 'workspace' && <PlaceholderTab label={tabs.find(t => t.id === active).label} />}
    </RoleLayout>
  )
}

function RoleLayout({ brandColor, role, user, tabs, active, setActive, onLogout, onHome, children }) {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex font-sans">
      <aside className="w-64 bg-slate-900/60 border-r border-white/5 p-4 flex flex-col justify-between hidden md:flex flex-shrink-0">
        <div>
          <div className="flex items-center gap-2 px-2 py-3 mb-4 text-left">
            <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${brandColor === 'pink' ? 'from-pink-500 to-orange-500' : 'from-purple-500 to-pink-500'} flex items-center justify-center font-bold text-sm`}>IC</div>
            <div>
              <div className="text-sm font-semibold">Ink Creation</div>
              <div className="text-xs text-white/40">{role} Panel</div>
            </div>
          </div>
          <nav className="space-y-1">
            {tabs.map(t => (
              <button key={t.id} onClick={() => setActive(t.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition ${active === t.id ? `${brandColor === 'pink' ? 'bg-pink-600/20 text-pink-200 border border-pink-500/30' : 'bg-purple-600/20 text-purple-200 border border-purple-500/30'}` : 'text-white/60 hover:bg-white/5 hover:text-white'}`}>
                <t.icon className="w-4 h-4" /> {t.label}
              </button>
            ))}
          </nav>
        </div>
        <div className="space-y-1 pt-4 border-t border-white/5 text-left">
          <div className="px-3 py-2 text-xs text-white/40 truncate">{user.email}</div>
          <button onClick={onHome} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-white/60 hover:bg-white/5 hover:text-white transition">← Home</button>
          <button onClick={onLogout} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-red-300 hover:bg-red-500/10 transition"><LogOut className="w-4 h-4" /> Logout</button>
        </div>
      </aside>
      <main className="flex-1 p-6 md:p-8 overflow-y-auto text-left">{children}</main>
    </div>
  )
}

function StatGrid({ stats, title }) {
  return (
    <div>
      {title && <h1 className="text-3xl font-bold mb-6 text-left">{title}</h1>}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
        {stats.map((s, i) => (
          <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-6">
            <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${s.color} mb-4`} />
            <div className="text-3xl font-bold text-white">{s.value}</div>
            <div className="text-sm text-white/50 mt-1">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function PlaceholderTab({ label }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-left">
      <h3 className="text-xl font-bold text-white mb-1">{label}</h3>
      <p className="text-white/50 text-sm mb-6">This module activates in the next development phase.</p>
      <div className="text-center py-16 text-white/40 border border-dashed border-white/10 rounded-lg">
        <TrendingUp className="w-10 h-10 mx-auto mb-3 opacity-30" />
        <p className="text-sm">Coming soon — Phase 2 build in progress.</p>
      </div>
    </div>
  )
}

function BrowseEditors()
