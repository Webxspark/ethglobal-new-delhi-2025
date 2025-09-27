import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, ArrowRight, Zap, Clock, Users, TrendingUp, Star } from 'lucide-react'

export default function LandingPage() {
    const [isVideoPlaying, setIsVideoPlaying] = useState(false)
    const videoRef = useRef<HTMLVideoElement>(null)

    const handleVideoPlay = () => {
        setIsVideoPlaying(true)
        if (videoRef.current) {
            videoRef.current.play()
        }
    }

    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-sm">N</span>
                            </div>
                            <span className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                                NoForma
                            </span>
                        </div>

                        <nav className="hidden md:flex items-center space-x-8">
                            <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">Features</a>
                            <a href="#pricing" className="text-gray-600 hover:text-gray-900 transition-colors">Pricing</a>
                            <a href="#contact" className="text-gray-600 hover:text-gray-900 transition-colors">Contact</a>
                            <Button variant="outline" className="ml-4">Sign In</Button>
                            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                                Start Free Trial
                            </Button>
                        </nav>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center max-w-4xl mx-auto">
                        <Badge className="mb-6 bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100">
                            🚀 Stop Losing Deals to Faster Competitors
                        </Badge>

                        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                            Your Leads Demand
                            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent block">
                                Instant Responses
                            </span>
                        </h1>

                        <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                            While you sleep, competitors are stealing your qualified leads. NoForma's AI agents respond in
                            <span className="font-semibold text-blue-600"> 30 seconds</span> or less, converting 3x more inquiries into sales.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8 py-3 text-lg">
                                Start Converting More Leads
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                            <Button variant="outline" size="lg" className="px-8 py-3 text-lg">
                                Watch 2-Min Demo
                            </Button>
                        </div>

                        {/* Social Proof */}
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-gray-500">
                            <div className="flex items-center">
                                <div className="flex -space-x-2 mr-3">
                                    <div className="w-6 h-6 rounded-full bg-blue-500"></div>
                                    <div className="w-6 h-6 rounded-full bg-green-500"></div>
                                    <div className="w-6 h-6 rounded-full bg-purple-500"></div>
                                </div>
                                <span>Trusted by 2,500+ SMBs</span>
                            </div>
                            <div className="flex items-center">
                                <Star className="w-4 h-4 text-yellow-400 mr-1" />
                                <span>4.9/5 from 1,200+ reviews</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Problems Section - SMB Focused */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">
                            Why SMBs Lose 67% of Qualified Leads
                        </h2>
                        <p className="text-xl text-gray-600">The harsh reality of manual lead response</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-6">
                                <Clock className="h-6 w-6 text-red-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">Response Time = Deal Death</h3>
                            <p className="text-gray-600 mb-6">
                                Leads expect responses within 5 minutes. The average SMB takes 47 hours.
                                By then, your competitor already closed the deal.
                            </p>
                            <div className="bg-red-50 p-4 rounded-lg">
                                <p className="text-sm text-red-800">
                                    <span className="font-bold">Reality Check:</span> 78% of customers buy from the first responder
                                </p>
                            </div>
                        </div>

                        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-6">
                                <Users className="h-6 w-6 text-orange-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">Small Team, Big Demands</h3>
                            <p className="text-gray-600 mb-6">
                                Your 2-3 person team can't monitor leads 24/7. International inquiries come at 3 AM.
                                Weekend leads sit unanswered until Monday.
                            </p>
                            <div className="bg-orange-50 p-4 rounded-lg">
                                <p className="text-sm text-orange-800">
                                    <span className="font-bold">The Cost:</span> $50,000+ in lost revenue per late response
                                </p>
                            </div>
                        </div>

                        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-6">
                                <TrendingUp className="h-6 w-6 text-yellow-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">Enterprise Competitors Win</h3>
                            <p className="text-gray-600 mb-6">
                                Big companies have 24/7 sales teams and instant-response systems.
                                They're stealing your qualified leads while you're in meetings.
                            </p>
                            <div className="bg-yellow-50 p-4 rounded-lg">
                                <p className="text-sm text-yellow-800">
                                    <span className="font-bold">Market Reality:</span> Speed beats price in 89% of B2B purchases
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Solution Section */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">
                            Level the Playing Field with AI Speed
                        </h2>
                        <p className="text-xl text-gray-600">Respond faster than Fortune 500 companies</p>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-8">
                            <div className="flex items-start space-x-4">
                                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                                    <CheckCircle className="h-5 w-5 text-green-600" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">30-Second Response Guarantee</h3>
                                    <p className="text-gray-600">
                                        Our AI agents respond to every lead within 30 seconds, 24/7/365.
                                        No coffee breaks, no vacation days, no sick leave.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                                    <CheckCircle className="h-5 w-5 text-blue-600" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Intelligent Qualification</h3>
                                    <p className="text-gray-600">
                                        AI doesn't just respond—it qualifies. Budget, timeline, decision-maker status.
                                        Only qualified leads reach your sales team.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                                    <CheckCircle className="h-5 w-5 text-purple-600" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Seamless Handoff</h3>
                                    <p className="text-gray-600">
                                        When a lead is qualified, your team gets notified instantly with all conversation context.
                                        No awkward "let me get my colleague" moments.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8">
                                <div className="bg-white rounded-xl p-6 shadow-sm mb-4">
                                    <div className="flex items-center space-x-3 mb-4">
                                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                                            <span className="text-white text-xs font-bold">AI</span>
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-900">NoForma Assistant</p>
                                            <p className="text-xs text-gray-500">Online • Responds in 30s</p>
                                        </div>
                                    </div>
                                    <p className="text-gray-700 bg-gray-50 rounded-lg p-3">
                                        "Hi John! Thanks for your interest in our premium service package.
                                        I can see you're looking at our enterprise solution—let me get you
                                        the exact ROI numbers you need for your team of 50..."
                                    </p>
                                </div>
                                <div className="text-center">
                                    <Badge className="bg-green-100 text-green-700">
                                        Responded in 28 seconds
                                    </Badge>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section id="features" className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">
                            Everything Your Sales Team Needs
                        </h2>
                        <p className="text-xl text-gray-600">Built specifically for growing SMBs</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                                <Zap className="h-6 w-6 text-blue-600" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Lightning-Fast Setup</h3>
                            <p className="text-gray-600">
                                Connect your existing contact forms in 5 minutes. No coding, no complex integrations.
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                                <Users className="h-6 w-6 text-green-600" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Multi-Channel Support</h3>
                            <p className="text-gray-600">
                                Website forms, email, SMS, social media. One AI handles all your channels.
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                                <TrendingUp className="h-6 w-6 text-purple-600" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Smart Analytics</h3>
                            <p className="text-gray-600">
                                See which leads are hottest, response time improvements, and conversion metrics.
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                                <Clock className="h-6 w-6 text-orange-600" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">24/7 Availability</h3>
                            <p className="text-gray-600">
                                Never miss a lead again. International customers, weekend inquiries—we've got you covered.
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                                <CheckCircle className="h-6 w-6 text-red-600" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Industry-Specific Training</h3>
                            <p className="text-gray-600">
                                Upload your product docs, FAQs, and pricing. AI learns your business inside and out.
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                                <Star className="h-6 w-6 text-indigo-600" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">White-Label Ready</h3>
                            <p className="text-gray-600">
                                Your brand, your voice. Customers never know they're talking to AI until you tell them.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16">
                <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
                    <h2 className="text-4xl font-bold text-gray-900 mb-6">
                        Stop Losing Leads to Faster Competitors
                    </h2>
                    <p className="text-xl text-gray-600 mb-8">
                        Join 2,500+ SMBs who chose speed over slow. Start converting more leads today.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                        <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-12 py-4 text-lg">
                            Start Your Free 14-Day Trial
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                        <p className="text-sm text-gray-500">No credit card required • Setup in 5 minutes</p>
                    </div>

                    <div className="bg-blue-50 rounded-xl p-6 text-left">
                        <h3 className="font-semibold text-gray-900 mb-4">What you get in your free trial:</h3>
                        <div className="grid sm:grid-cols-2 gap-3">
                            <div className="flex items-center">
                                <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                                <span className="text-gray-700">100 AI responses included</span>
                            </div>
                            <div className="flex items-center">
                                <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                                <span className="text-gray-700">All premium features unlocked</span>
                            </div>
                            <div className="flex items-center">
                                <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                                <span className="text-gray-700">5-minute setup assistance</span>
                            </div>
                            <div className="flex items-center">
                                <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                                <span className="text-gray-700">Cancel anytime, no questions</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-gray-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="grid md:grid-cols-4 gap-8">
                        <div>
                            <div className="flex items-center space-x-2 mb-4">
                                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                                    <span className="text-white font-bold text-sm">N</span>
                                </div>
                                <span className="text-xl font-bold text-white">NoForma</span>
                            </div>
                            <p className="text-gray-400">
                                AI-powered lead response that converts 3x more inquiries into sales.
                            </p>
                        </div>

                        <div>
                            <h4 className="font-semibold text-white mb-4">Product</h4>
                            <ul className="space-y-2">
                                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Integrations</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-semibold text-white mb-4">Company</h4>
                            <ul className="space-y-2">
                                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-semibold text-white mb-4">Support</h4>
                            <ul className="space-y-2">
                                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Status</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center">
                        <p className="text-gray-400">© 2024 NoForma. All rights reserved.</p>
                        <div className="flex space-x-6 mt-4 sm:mt-0">
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms</a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy</a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">Cookies</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}