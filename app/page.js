'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { toast } from 'sonner'
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
    toast.success('Logged out successfully')
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
        onAdminClick={() => toast.info('Admin authentication layer active.')}
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
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950/40 to-slate-950 text-white">
      <nav className="flex items-center justify-between px-6 py-5 lg:px-12 border-b border-white/5">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center font-bold">IC</div>
          <span className="text-xl font-semibold tracking-tight">Ink Creation</span>
        </div>
        <div className="flex items-center gap-2">
          {currentUser ? (
            <>
              <Button onClick={onDashClick} size="sm" className="bg-purple-600 hover:bg-purple-700">
                <User className="w-4 h-4 mr-2" /> My Dashboard
              </Button>
              <Button onClick={onLogout} size="sm" variant="ghost" className="text-white/60"><LogOut className="w-4 h-4" /></Button>
            </>
          ) : (
            <>
              <Button onClick={() => onAuthClick('login')} variant="ghost" size="sm" className="text-white/70 hover:text-white">Login</Button>
              <Button onClick={() => onAuthClick('signup')} size="sm" className="bg-purple-600 hover:bg-purple-700">Sign Up Free</Button>
            </>
          )}
          <Button onClick={onAdminClick} variant="ghost" size="sm" className="text-white/40 hover:text-white">
            <Lock className="w-4 h-4" />
          </Button>
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
        <div className="flex gap-3 justify-center flex-wrap">
          <Button size="lg" className="bg-purple-600 hover:bg-purple-700" onClick={() => onAuthClick('signup', 'customer')}>
            <User className="w-4 h-4 mr-2" /> I&apos;m a Client
          </Button>
          <Button size="lg" variant="outline" className="border-white/20 hover:bg-white/5" onClick={() => onAuthClick('signup', 'editor')}>
            <Video className="w-4 h-4 mr-2" /> I&apos;m an Editor
          </Button>
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
            <Card key={i} className="bg-white/5 border-white/10 backdrop-blur text-left">
              <CardHeader>
                <f.icon className="w-8 h-8 text-purple-400 mb-2" />
                <CardTitle className="text-white">{f.title}</CardTitle>
                <CardDescription className="text-white/60">{f.desc}</CardDescription>
              </CardHeader>
            </Card>
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
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="bg-slate-900 border-white/10 text-white max-w-md">
        <DialogHeader>
          <DialogTitle>{tab === 'signup' ? 'Create your account' : 'Welcome back'}</DialogTitle>
          <DialogDescription className="text-white/50">
            {tab === 'signup' ? 'Join Ink Creation as a Client or Editor' : 'Sign in to continue to Ink Creation'}
          </DialogDescription>
        </DialogHeader>

        <Tabs value={tab} onValueChange={setTab}>
          <TabsList className="bg-white/5 w-full">
            <TabsTrigger value="login" className="flex-1">Login</TabsTrigger>
            <TabsTrigger value="signup" className="flex-1">Sign Up</TabsTrigger>
          </TabsList>

          <div className="mt-4 grid grid-cols-2 gap-2">
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

          <form onSubmit={handleSubmit} className="space-y-3 mt-4">
            {tab === 'signup' && (
              <div>
                <Label className="text-white/80 text-sm">Full Name</Label>
                <Input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required
                  className="bg-white/5 border-white/10 text-white mt-1" placeholder="Your name" />
              </div>
            )}
            <div>
              <Label className="text-white/80 text-sm">Email</Label>
              <Input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required
                className="bg-white/5 border-white/10 text-white mt-1" placeholder="you@example.com" />
            </div>
            {tab === 'signup' && (
              <div>
                <Label className="text-white/80 text-sm">Phone (optional)</Label>
                <Input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })}
                  className="bg-white/5 border-white/10 text-white mt-1" placeholder="+91 98765 43210" />
              </div>
            )}
            <div>
              <Label className="text-white/80 text-sm">Password</Label>
              <Input type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} required
                className="bg-white/5 border-white/10 text-white mt-1" placeholder="••••••••" />
            </div>
            <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700" disabled={loading}>
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : (tab === 'signup' ? 'Create Account' : 'Sign In')}
            </Button>
          </form>
        </Tabs>
      </DialogContent>
    </Dialog>
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
            <Card className="bg-amber-500/10 border-amber-500/30 mb-6 text-left">
              <CardContent className="p-4 flex items-center gap-3">
                <Lock className="w-6 h-6 text-amber-300" />
                <div className="flex-1">
                  <div className="font-semibold text-amber-200">Subscription Required</div>
                  <div className="text-sm text-amber-200/70">Activate a Weekly/Monthly/Yearly plan to start accepting client briefs.</div>
                </div>
                <Button className="bg-amber-500 hover:bg-amber-600 text-black" onClick={() => setActive('subscription')}>Activate</Button>
              </CardContent>
            </Card>
          )}
          <div className="mb-6 text-left">
            <Card className="bg-gradient-to-r from-slate-900 to-slate-800 border-white/10">
              <CardContent className="p-6 flex items-center gap-4">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${lvl.color} flex items-center justify-center`}>
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
              </CardContent>
            </Card>
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
    <div className="min-h-screen bg-slate-950 text-white flex">
      <aside className="w-64 bg-slate-900/60 border-r border-white/5 p-4 flex flex-col justify-between">
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
          <button onClick={onHome} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-white/60 hover:bg-white/5 hover:text-white">← Home</button>
          <button onClick={onLogout} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-red-300 hover:bg-red-500/10"><LogOut className="w-4 h-4" /> Logout</button>
        </div>
      </aside>
      <main className="flex-1 p-8 overflow-y-auto text-left">{children}</main>
    </div>
  )
}

function StatGrid({ stats, title }) {
  return (
    <div>
      {title && <h1 className="text-3xl font-bold mb-6 text-left">{title}</h1>}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
        {stats.map((s, i) => (
          <Card key={i} className="bg-white/5 border-white/10">
            <CardContent className="p-6">
              <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${s.color} mb-3`} />
              <div className="text-3xl font-bold text-white">{s.value}</div>
              <div className="text-sm text-white/50 mt-1">{s.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

function PlaceholderTab({ label }) {
  return (
    <Card className="bg-white/5 border-white/10 text-left">
      <CardHeader>
        <CardTitle className="text-white">{label}</CardTitle>
        <CardDescription className="text-white/50">This module activates in the next development phase.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-center py-16 text-white/40">
          <TrendingUp className="w-10 h-10 mx-auto mb-3 opacity-30" />
          <p>Coming soon — Phase 2 build in progress.</p>
        </div>
      </CardContent>
    </Card>
  )
}

function BrowseEditors() {
  const [editors, setEditors] = useState([])
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    setTimeout(() => {
      setEditors([
        { id: 1, name: 'Amit Kumar', level: 'Gold', rating: 4.9 },
        { id: 2, name: 'Rahul Sharma', level: 'Silver', rating: 4.6 }
      ])
      setLoading(false)
    }, 1000)
  } , [])

  return (
    <div className="text-left">
      <h1 className="text-3xl font-bold mb-6">Browse Editors</h1>
      {loading ? (
        <p className="text-white/40">Loading...</p>
      ) : editors.length === 0 ? (
        <p className="text-white/40">No editors yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {editors.map(e => (
            <Card key={e.id} className="bg-white/5 border-white/10">
              <CardContent className="p-5">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 to-orange-500 flex items-center justify-center text-lg font-bold mb-3">
                  {e.name?.[0]?.toUpperCase()}
                </div>
                <div className="font-semibold text-lg text-white">{e.name}</div>
                <div className="text-sm text-purple-400 mt-0.5">{e.level} Rank Editor</div>
                <div className="text-xs text-white/40 mt-2">Rating: {e.rating} ★</div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
