import './App.css'
import { Button } from './components/ui/button'
import { Badge } from './components/ui/badge'
import { ArrowRight, Bot, CheckCircle, Users, Zap, MessageSquare, X, Sparkles, Brain, Target, Rocket, Trash2, AlertTriangle, Calendar } from 'lucide-react'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Navigation Header */}
      <nav className="border-b bg-white/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Bot className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">NoForma</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">Features</a>
              <a href="#how-it-works" className="text-gray-600 hover:text-gray-900 transition-colors">How it Works</a>
              <Button className="bg-blue-600 hover:bg-blue-700">Get Started</Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-purple-50/30 to-cyan-50/50"></div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <Badge className="mb-6 bg-gradient-to-r from-red-500/10 to-orange-500/10 text-red-700 border-red-200/50 backdrop-blur-sm">
            <AlertTriangle className="w-3 h-3 mr-1" />
            Your Competitors Are Stealing Your Deals
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="text-gray-900">Stop Losing Deals to</span>
            <br />
            <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
              Faster Competitors
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
              Respond in Minutes, Not Days
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-4xl mx-auto leading-relaxed">
            <span className="font-semibold">For SMBs:</span> While you're checking contact forms once a week,
            your competitors with instant AI responses are
            <span className="font-semibold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent"> closing your deals</span>.
            NoForma gives you the speed advantage of enterprise companies.
          </p>

          {/* Problem Highlight */}
          <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl p-6 mb-8 max-w-4xl mx-auto border border-red-200/50">
            <div className="grid md:grid-cols-2 gap-6 text-left">
              <div className="flex items-start space-x-3">
                <X className="h-6 w-6 text-red-500 mt-1 flex-shrink-0" />
                <div>
                  <div className="font-semibold text-red-800 mb-1">Your Current Reality</div>
                  <div className="text-red-700 text-sm">Client submits form → Gets buried in spam → You see it 5 days later → Deal already closed with competitor</div>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <div className="font-semibold text-green-800 mb-1">With NoForma</div>
                  <div className="text-green-700 text-sm">Client talks to AI → Qualified in 60 seconds → You get hot lead alert → Deal closed before competitors respond</div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-10 py-5 shadow-2xl hover:shadow-blue-500/25 transition-all duration-300">
              <Rocket className="mr-2 h-5 w-5" />
              Beat Your Competitors Today
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-10 py-5 border-2 hover:bg-gray-50 transition-all duration-300">
              <Target className="mr-2 h-5 w-5" />
              See Speed Demo
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="p-6 rounded-2xl bg-white/60 backdrop-blur-sm border border-gray-200/50 shadow-lg">
              <div className="text-3xl font-bold text-red-600 mb-2">73%</div>
              <div className="text-sm text-gray-600">of SMB deals lost to faster response</div>
            </div>
            <div className="p-6 rounded-2xl bg-white/60 backdrop-blur-sm border border-gray-200/50 shadow-lg">
              <div className="text-3xl font-bold text-blue-600 mb-2">2min</div>
              <div className="text-sm text-gray-600">Average NoForma response time</div>
            </div>
            <div className="p-6 rounded-2xl bg-white/60 backdrop-blur-sm border border-gray-200/50 shadow-lg">
              <div className="text-3xl font-bold text-green-600 mb-2">340%</div>
              <div className="text-sm text-gray-600">Increase in deal closure rate</div>
            </div>
          </div>
        </div>
      </section>      {/* Problems Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-red-50 to-orange-50 relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(239,68,68,0.1),transparent_70%)]"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <Badge className="mb-6 bg-red-100 text-red-700 border-red-200">
              <AlertTriangle className="w-3 h-3 mr-1" />
              The SMB Reality Check
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Why SMBs Are <span className="text-red-500">Losing Deals</span> Every Day
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Small and medium businesses don't have dedicated sales teams to monitor contact forms.
              In this chaotic reality, quality deals slip away while you're busy running your business.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-16">
            <div className="p-8 rounded-3xl bg-white/80 backdrop-blur-sm border border-red-200/50 shadow-lg">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0 mt-1">
                  <Users className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center">
                    <X className="h-5 w-5 text-red-500 mr-2" />
                    No Dedicated Sales Team
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    You're the founder, marketer, and salesperson all in one. Contact forms sit unchecked
                    while you handle operations, leaving potential clients wondering if you're even in business.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-white/80 backdrop-blur-sm border border-red-200/50 shadow-lg">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0 mt-1">
                  <Calendar className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center">
                    <X className="h-5 w-5 text-red-500 mr-2" />
                    Weekly Form Checking (If You're Lucky)
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    You check contact forms once a week, maybe twice if you remember. By then, serious prospects
                    have already moved on to competitors who responded within hours.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-white/80 backdrop-blur-sm border border-red-200/50 shadow-lg">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center flex-shrink-0 mt-1">
                  <Trash2 className="h-6 w-6 text-yellow-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center">
                    <X className="h-5 w-5 text-red-500 mr-2" />
                    Quality Leads Lost in Spam
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Your inbox is 90% spam, 5% irrelevant, and 5% gold. That one perfect client inquiry
                    gets buried between "URGENT: MAKE MONEY FAST" and "SEO SERVICES FROM INDIA."
                  </p>
                </div>
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-white/80 backdrop-blur-sm border border-red-200/50 shadow-lg">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0 mt-1">
                  <Zap className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center">
                    <X className="h-5 w-5 text-red-500 mr-2" />
                    Speed = Everything
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Clients pitch to 5-10 companies for quotes. The first to respond (professionally)
                    often wins, even if you could offer 30% better pricing. Speed beats perfection.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Real World Scenario */}
          <div className="bg-gradient-to-r from-red-100 to-orange-100 rounded-3xl p-8 max-w-4xl mx-auto border border-red-200/50">
            <div className="text-center mb-6">
              <AlertTriangle className="h-12 w-12 text-red-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900">This Happened Last Week</h3>
            </div>
            <div className="space-y-4 text-gray-700">
              <div className="flex items-start space-x-3">
                <span className="font-bold text-red-600">Monday 9 AM:</span>
                <span>Perfect client submits contact form for $50K project</span>
              </div>
              <div className="flex items-start space-x-3">
                <span className="font-bold text-red-600">Monday 2 PM:</span>
                <span>Client gets instant response from Competitor A via AI chat</span>
              </div>
              <div className="flex items-start space-x-3">
                <span className="font-bold text-red-600">Tuesday:</span>
                <span>Client has initial call with Competitor A</span>
              </div>
              <div className="flex items-start space-x-3">
                <span className="font-bold text-red-600">Wednesday:</span>
                <span>Competitor A sends proposal</span>
              </div>
              <div className="flex items-start space-x-3">
                <span className="font-bold text-red-600">Friday:</span>
                <span>You finally check emails, see the form, respond "Thanks for your interest!"</span>
              </div>
              <div className="flex items-start space-x-3">
                <span className="font-bold text-green-600">Result:</span>
                <span className="font-semibold">Deal already signed with Competitor A (at 20% higher price than you would have charged)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Transition */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Level the Playing Field
            </span>
          </h2>
          <p className="text-xl text-gray-700 mb-8">
            <span className="font-semibold">NoForma gives SMBs the response speed of Fortune 500 companies.</span>
            While competitors check emails, your AI is already building relationships and closing deals.
          </p>
          <div className="flex justify-center">
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-8 py-4">
              <Zap className="mr-2 h-5 w-5" />
              Get Your Speed Advantage
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-purple-50/30"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <Badge className="mb-6 bg-gradient-to-r from-green-500/10 to-blue-500/10 text-green-700 border-green-200/50">
              <Zap className="w-3 h-3 mr-1" />
              Speed-First Solutions for SMBs
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Win More Deals with <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">Lightning Speed</span>
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Every minute counts when competing for clients. NoForma ensures you're first to respond,
              first to engage, and first to close the deal.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-gradient-to-br from-green-50 to-emerald-100/50 border border-green-200/50 hover:border-green-300 transition-all duration-300 hover:shadow-xl hover:shadow-green-500/20">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                2-Minute Response Time
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                While competitors take days to respond, NoForma's AI engages prospects within 2 minutes of inquiry.
                First mover advantage in every single deal.
              </p>
              <div className="flex items-center text-sm text-green-600 font-medium">
                <CheckCircle className="w-4 h-4 mr-2" />
                Beat 95% of competitors on speed
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-gradient-to-br from-blue-50 to-blue-100/50 border border-blue-200/50 hover:border-blue-300 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/20">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <Target className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Instant Qualification
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                AI automatically identifies serious buyers vs. time-wasters. Only qualified, budget-ready
                prospects reach your inbox - no more spam sorting.
              </p>
              <div className="flex items-center text-sm text-blue-600 font-medium">
                <CheckCircle className="w-4 h-4 mr-2" />
                90% spam reduction guarantee
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-gradient-to-br from-purple-50 to-purple-100/50 border border-purple-200/50 hover:border-purple-300 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/20">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <Brain className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                24/7 Never Miss a Lead
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Your AI sales agent works around the clock. Weekend inquiries? Handled. 3 AM prospects?
                Engaged. You sleep, deals still close.
              </p>
              <div className="flex items-center text-sm text-purple-600 font-medium">
                <CheckCircle className="w-4 h-4 mr-2" />
                Zero leads lost to timing
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-gradient-to-br from-orange-50 to-orange-100/50 border border-orange-200/50 hover:border-orange-300 transition-all duration-300 hover:shadow-xl hover:shadow-orange-500/20">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <Rocket className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Instant Quote Generation
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Clients get preliminary quotes in real-time during the conversation. Strike while the iron is hot
                with immediate pricing that competitors can't match.
              </p>
              <div className="flex items-center text-sm text-orange-600 font-medium">
                <CheckCircle className="w-4 h-4 mr-2" />
                Close deals in first interaction
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-gradient-to-br from-cyan-50 to-cyan-100/50 border border-cyan-200/50 hover:border-cyan-300 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/20">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Smart Handoff to You
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                When AI identifies a hot prospect, you get instant alerts with full conversation context.
                Jump in at the perfect moment to close the deal.
              </p>
              <div className="flex items-center text-sm text-cyan-600 font-medium">
                <CheckCircle className="w-4 h-4 mr-2" />
                Perfect timing, every time
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-gradient-to-br from-pink-50 to-pink-100/50 border border-pink-200/50 hover:border-pink-300 transition-all duration-300 hover:shadow-xl hover:shadow-pink-500/20">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-pink-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <Sparkles className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Competitive Intelligence
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Learn how many competitors clients are considering and their timelines.
                Position your offer strategically to win against specific competitors.
              </p>
              <div className="flex items-center text-sm text-pink-600 font-medium">
                <CheckCircle className="w-4 h-4 mr-2" />
                Know your competition
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-purple-50/30"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <Badge className="mb-6 bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-blue-700 border-blue-200/50">
              <Sparkles className="w-3 h-3 mr-1" />
              AI-Powered Solutions
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              How NoForma <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Revolutionizes</span> Lead Capture
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Experience the future of client onboarding with intelligent AI that thinks, learns, and adapts to every conversation.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-gradient-to-br from-blue-50 to-blue-100/50 border border-blue-200/50 hover:border-blue-300 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/20">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <Brain className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Intelligent Conversations
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Our AI doesn't just collect information—it engages in meaningful dialogue, asks follow-up questions, and understands context like a skilled sales professional.
              </p>
              <div className="flex items-center text-sm text-blue-600 font-medium">
                <CheckCircle className="w-4 h-4 mr-2" />
                Zero spam, 100% qualified leads
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-gradient-to-br from-green-50 to-green-100/50 border border-green-200/50 hover:border-green-300 transition-all duration-300 hover:shadow-xl hover:shadow-green-500/20">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <Target className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Smart Lead Qualification
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Automatically identifies high-value prospects and filters out time-wasters. Only qualified leads make it to your inbox.
              </p>
              <div className="flex items-center text-sm text-green-600 font-medium">
                <CheckCircle className="w-4 h-4 mr-2" />
                5x better lead quality
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-gradient-to-br from-purple-50 to-purple-100/50 border border-purple-200/50 hover:border-purple-300 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/20">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <Rocket className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Instant Project Estimation
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Real-time cost and timeline estimates based on your historical data and current capacity. No more guesswork or delays.
              </p>
              <div className="flex items-center text-sm text-purple-600 font-medium">
                <CheckCircle className="w-4 h-4 mr-2" />
                Sub-60 second estimates
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-gradient-to-br from-orange-50 to-orange-100/50 border border-orange-200/50 hover:border-orange-300 transition-all duration-300 hover:shadow-xl hover:shadow-orange-500/20">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Frictionless Booking
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Seamlessly transitions from conversation to calendar booking. No email chains, no back-and-forth scheduling headaches.
              </p>
              <div className="flex items-center text-sm text-orange-600 font-medium">
                <CheckCircle className="w-4 h-4 mr-2" />
                90% fewer scheduling emails
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-gradient-to-br from-cyan-50 to-cyan-100/50 border border-cyan-200/50 hover:border-cyan-300 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/20">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Human-AI Collaboration
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Your team reviews and approves all estimates before client presentation. AI handles qualification, humans ensure quality.
              </p>
              <div className="flex items-center text-sm text-cyan-600 font-medium">
                <CheckCircle className="w-4 h-4 mr-2" />
                Best of both worlds
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-gradient-to-br from-pink-50 to-pink-100/50 border border-pink-200/50 hover:border-pink-300 transition-all duration-300 hover:shadow-xl hover:shadow-pink-500/20">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-pink-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <Sparkles className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Continuous Evolution
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Machine learning algorithms continuously improve qualification accuracy and conversation quality based on your successful projects.
              </p>
              <div className="flex items-center text-sm text-pink-600 font-medium">
                <CheckCircle className="w-4 h-4 mr-2" />
                Gets smarter over time
              </div>
            </div>
          </div>
        </div>
      </section>      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.2),transparent_70%)]"></div>
        <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(147,51,234,0.1)_0%,transparent_50%,rgba(59,130,246,0.1)_100%)]"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <Badge className="mb-6 bg-white/10 text-white border-white/20 backdrop-blur-sm">
              <Rocket className="w-3 h-3 mr-1" />
              The Future is Here
            </Badge>
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Experience the
              <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent"> Magic</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Watch how NoForma transforms a simple website visit into a qualified lead
              with intelligent AI conversations that feel completely natural.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 mb-16">
            <div className="text-center group">
              <div className="relative mb-8">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-3xl flex items-center justify-center mx-auto shadow-2xl shadow-blue-500/30 group-hover:shadow-blue-500/50 transition-all duration-300">
                  <MessageSquare className="h-12 w-12 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white text-sm font-bold">1</span>
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4">
                Instant AI Engagement
              </h3>
              <p className="text-gray-300 leading-relaxed mb-6">
                The moment a visitor shows interest, our AI initiates a natural conversation.
                No forms to fill, no barriers—just intelligent dialogue that adapts in real-time.
              </p>
              <div className="flex justify-center">
                <Badge variant="outline" className="text-cyan-400 border-cyan-400/30 bg-cyan-400/10 backdrop-blur-sm">
                  <Sparkles className="w-3 h-3 mr-1" />
                  Zero Friction
                </Badge>
              </div>
            </div>

            <div className="text-center group">
              <div className="relative mb-8">
                <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl flex items-center justify-center mx-auto shadow-2xl shadow-purple-500/30 group-hover:shadow-purple-500/50 transition-all duration-300">
                  <Brain className="h-12 w-12 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white text-sm font-bold">2</span>
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4">
                Smart Analysis & Qualification
              </h3>
              <p className="text-gray-300 leading-relaxed mb-6">
                Advanced AI analyzes requirements, qualifies the lead, and generates precise
                project estimates—all while maintaining engaging conversation flow.
              </p>
              <div className="flex justify-center">
                <Badge variant="outline" className="text-purple-400 border-purple-400/30 bg-purple-400/10 backdrop-blur-sm">
                  <Target className="w-3 h-3 mr-1" />
                  Laser Precision
                </Badge>
              </div>
            </div>

            <div className="text-center group">
              <div className="relative mb-8">
                <div className="w-24 h-24 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-3xl flex items-center justify-center mx-auto shadow-2xl shadow-emerald-500/30 group-hover:shadow-emerald-500/50 transition-all duration-300">
                  <CheckCircle className="h-12 w-12 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white text-sm font-bold">3</span>
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4">
                Seamless Handoff
              </h3>
              <p className="text-gray-300 leading-relaxed mb-6">
                Qualified prospects are instantly connected to your team with complete context,
                project details, and timeline—ready to close the deal.
              </p>
              <div className="flex justify-center">
                <Badge variant="outline" className="text-emerald-400 border-emerald-400/30 bg-emerald-400/10 backdrop-blur-sm">
                  <Zap className="w-3 h-3 mr-1" />
                  Instant Success
                </Badge>
              </div>
            </div>
          </div>

          <div className="flex gap-3 items-center justify-center">
            <div className="inline-flex items-center p-6 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 mb-8">
              <Rocket className="h-8 w-8 text-cyan-400 mr-4" />
              <div className="text-left">
                <div className="font-bold text-xl">Result:</div>
                <div className="text-gray-300">5x more qualified meetings, 90% less time wasted, 100% better client experience</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-green-600 via-blue-600 to-purple-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(34,197,94,0.3),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.1),transparent_50%)]"></div>
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="mb-8">
            <Zap className="h-16 w-16 text-green-300 mx-auto mb-4" />
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Stop Losing Deals to
            <span className="bg-gradient-to-r from-green-300 to-cyan-300 bg-clip-text text-transparent"> Faster Competitors</span>
          </h2>
          <p className="text-xl text-blue-100 mb-12 max-w-3xl mx-auto leading-relaxed">
            <span className="font-semibold">Join 500+ SMBs</span> who've ditched slow contact forms and now close
            deals before their competitors even see the inquiry. Your next big client is waiting.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-10 py-5 shadow-2xl hover:shadow-white/25 transition-all duration-300">
              <Rocket className="mr-2 h-5 w-5" />
              Get Speed Advantage Now
            </Button>
            <div className="flex items-center text-white text-lg font-medium cursor-pointer hover:underline">
              <Target className="mr-2 h-5 w-5" />
              See 2-Min Demo
            </div>
          </div>

          {/* SMB Success Stories */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
            <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20">
              <div className="text-3xl font-bold text-white mb-2">$847K</div>
              <div className="text-sm text-blue-100 mb-3">Revenue rescued from slow responses</div>
              <div className="text-xs text-green-300">This month alone</div>
            </div>
            <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20">
              <div className="text-3xl font-bold text-white mb-2">67%</div>
              <div className="text-sm text-blue-100 mb-3">More deals won vs. competitors</div>
              <div className="text-xs text-green-300">Average across all SMBs</div>
            </div>
            <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20">
              <div className="text-3xl font-bold text-white mb-2">15min</div>
              <div className="text-sm text-blue-100 mb-3">Average time saved per lead</div>
              <div className="text-xs text-green-300">vs. manual qualification</div>
            </div>
          </div>

          {/* Testimonial */}
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 max-w-3xl mx-auto border border-white/20">
            <div className="text-lg text-white italic mb-4">
              "We were losing 3 out of 5 deals to competitors who responded faster.
              With NoForma, we're now the first to respond 100% of the time. Our close rate went from 20% to 61%."
            </div>
            <div className="text-sm text-blue-200">
              <span className="font-semibold">Sarah Chen</span> • Digital Marketing Agency • 12 employees
            </div>
          </div>
        </div>
      </section>      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center space-x-2 mb-4">
                <Bot className="h-8 w-8 text-blue-400" />
                <span className="text-2xl font-bold">NoForma</span>
              </div>
              <p className="text-gray-400 mb-4">
                AI-powered client onboarding that transforms how you gather requirements
                and estimate projects.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Status</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2025 NoForma. All rights reserved. Built with AI-powered excellence.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
