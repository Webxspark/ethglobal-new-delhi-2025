import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import {
    Bot,
    Calculator,
    Plus,
    Minus,
    Check,
    ArrowRight,
    ArrowLeft,
    Zap
} from 'lucide-react'

const steps = [
    'Agent Selection',
    'Configuration',
]

type AgentType = {
    id: string
    name: string
    description: string
    basePrice: number
    baseLimit: number
    extraCost: number
    icon: any
    features: string[]
}

const agentTypes: AgentType[] = [
    {
        id: 'conversational',
        name: 'Conversational Agent',
        description: 'Handles new client meetings and lead onboarding',
        basePrice: 150,
        baseLimit: 100,
        extraCost: 1.5,
        icon: Bot,
        features: [
            'Natural conversation flow',
            'Lead qualification',
            'Meeting scheduling',
            '24/7 availability',
            'Multi-language support'
        ]
    },
    {
        id: 'estimation',
        name: 'Estimation Agent',
        description: 'Provides cost and resource estimation for projects',
        basePrice: 50,
        baseLimit: 100,
        extraCost: 0.5,
        icon: Calculator,
        features: [
            'Automatic cost calculation',
            'Resource planning',
            'Timeline estimation',
            'Historical data analysis',
            'Custom pricing rules'
        ]
    }
]

export default function CompanyOnboardingPage() {
    const [currentStep, setCurrentStep] = useState(0)
    const [companyData, setCompanyData] = useState({
        name: '',
        about: '',
        size: '',
        niche: ''
    })
    const [selectedAgents, setSelectedAgents] = useState<{ [key: string]: { enabled: boolean, limit: number, concurrentClients?: number } }>({
        conversational: { enabled: true, limit: 100, concurrentClients: 1 }
    })

    const handleNext = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1)
        }
    }

    const handlePrevious = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1)
        }
    }

    const updateAgentLimit = (agentId: string, newLimit: number) => {
        setSelectedAgents(prev => ({
            ...prev,
            [agentId]: { ...prev[agentId], limit: Math.max(100, newLimit) }
        }))

        // Sync estimation agent with conversational agent
        if (agentId === 'conversational' && selectedAgents.estimation?.enabled) {
            setSelectedAgents(prev => ({
                ...prev,
                estimation: { ...prev.estimation, limit: Math.max(100, newLimit) }
            }))
        }
    }

    const updateConcurrentClients = (agentId: string, concurrentClients: number) => {
        setSelectedAgents(prev => ({
            ...prev,
            [agentId]: { ...prev[agentId], concurrentClients: concurrentClients }
        }))
    }

    const toggleAgent = (agentId: string) => {
        if (agentId === 'conversational') return // Always required

        setSelectedAgents(prev => ({
            ...prev,
            [agentId]: {
                enabled: !prev[agentId]?.enabled,
                limit: prev[agentId]?.limit || agentTypes.find(a => a.id === agentId)?.baseLimit || 100,
                concurrentClients: prev[agentId]?.concurrentClients || 1
            }
        }))
    }

    const calculateTotal = () => {
        let total = 0
        agentTypes.forEach(agent => {
            const selection = selectedAgents[agent.id]
            if (selection?.enabled) {
                const extraCalls = Math.max(0, selection.limit - agent.baseLimit)
                total += agent.basePrice + (extraCalls * agent.extraCost)
            }
        })
        return total
    }

    const renderStep = () => {
        switch (currentStep) {

            case 0:
                return (
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-lg font-semibold mb-2">Select Your AI Agents</h3>
                            <p className="text-gray-600 mb-6">Choose the agents that best fit your business needs</p>
                        </div>

                        <div className="space-y-4">
                            {agentTypes.map((agent) => {
                                const isSelected = selectedAgents[agent.id]?.enabled
                                const isRequired = agent.id === 'conversational'
                                const IconComponent = agent.icon

                                return (
                                    <Card key={agent.id} className={`cursor-pointer transition-all ${isSelected ? 'border-blue-500 bg-blue-50' : 'hover:bg-gray-50'}`}>
                                        <CardContent className="p-6">
                                            <div className="flex items-start justify-between">
                                                <div className="flex items-start space-x-4 flex-1">
                                                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${isSelected ? 'bg-blue-100' : 'bg-gray-100'}`}>
                                                        <IconComponent className={`h-6 w-6 ${isSelected ? 'text-blue-600' : 'text-gray-600'}`} />
                                                    </div>

                                                    <div className="flex-1">
                                                        <div className="flex items-center space-x-2 mb-2">
                                                            <h4 className="font-semibold">{agent.name}</h4>
                                                            {isRequired && <Badge className="bg-green-100 text-green-800">Required</Badge>}
                                                            {isSelected && !isRequired && <Badge className="bg-blue-100 text-blue-800">Selected</Badge>}
                                                        </div>

                                                        <p className="text-gray-600 text-sm mb-3">{agent.description}</p>

                                                        <div className="grid grid-cols-2 gap-4 text-xs text-gray-500">
                                                            {agent.features.map((feature, idx) => (
                                                                <div key={idx} className="flex items-center">
                                                                    <Check className="h-3 w-3 text-green-500 mr-1" />
                                                                    {feature}
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="text-right">
                                                    <div className="text-lg font-bold text-gray-900">
                                                        ${agent.basePrice}/month
                                                    </div>
                                                    <div className="text-xs text-gray-500">
                                                        {agent.baseLimit} {agent.id === 'conversational' ? 'calls' : 'estimations'}/month
                                                    </div>
                                                    <div className="text-xs text-gray-500">
                                                        +${agent.extraCost} per extra {agent.id === 'conversational' ? 'call' : 'estimation'}
                                                    </div>

                                                    {!isRequired && (
                                                        <Button
                                                            variant={isSelected ? "default" : "outline"}
                                                            size="sm"
                                                            className="mt-2"
                                                            onClick={() => toggleAgent(agent.id)}
                                                        >
                                                            {isSelected ? 'Remove' : 'Add'}
                                                        </Button>
                                                    )}
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                )
                            })}
                        </div>
                    </div>
                )

            case 1:
                return (
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-lg font-semibold mb-2">Configure Your Agents</h3>
                            <p className="text-gray-600 mb-6">Adjust usage limits and customize settings</p>
                        </div>

                        <div className="space-y-4">
                            {agentTypes.map((agent) => {
                                const selection = selectedAgents[agent.id]
                                if (!selection?.enabled) return null

                                const IconComponent = agent.icon
                                const extraCalls = Math.max(0, selection.limit - agent.baseLimit)
                                const concurrentCost = agent.id === 'conversational' ? ((selection.concurrentClients || 1) - 1) * 25 : 0
                                const monthlyCost = agent.basePrice + (extraCalls * agent.extraCost) + concurrentCost

                                return (
                                    <Card key={agent.id}>
                                        <CardContent className="p-6">
                                            <div className="flex items-center space-x-4 mb-4">
                                                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                                    <IconComponent className="h-5 w-5 text-blue-600" />
                                                </div>
                                                <div>
                                                    <h4 className="font-semibold">{agent.name}</h4>
                                                    <p className="text-sm text-gray-600">${monthlyCost}/month</p>
                                                </div>
                                            </div>

                                            <div className="space-y-4">
                                                {agent.id === 'conversational' ? (
                                                    <>
                                                        <div>
                                                            <label className="text-sm font-medium">
                                                                Monthly Calls Limit
                                                            </label>
                                                            <div className="flex items-center space-x-4 mt-2">
                                                                <Button
                                                                    variant="outline"
                                                                    size="sm"
                                                                    onClick={() => updateAgentLimit(agent.id, selection.limit - 50)}
                                                                    disabled={selection.limit <= agent.baseLimit}
                                                                >
                                                                    <Minus className="h-4 w-4" />
                                                                </Button>

                                                                <div className="flex-1">
                                                                    <Input
                                                                        type="number"
                                                                        value={selection.limit}
                                                                        onChange={(e) => updateAgentLimit(agent.id, parseInt(e.target.value) || agent.baseLimit)}
                                                                        min={agent.baseLimit}
                                                                        className="text-center"
                                                                    />
                                                                </div>

                                                                <Button
                                                                    variant="outline"
                                                                    size="sm"
                                                                    onClick={() => updateAgentLimit(agent.id, selection.limit + 50)}
                                                                >
                                                                    <Plus className="h-4 w-4" />
                                                                </Button>
                                                            </div>

                                                            <div className="mt-2 text-xs text-gray-500">
                                                                Base: {agent.baseLimit} included,
                                                                Extra: {extraCalls} × ${agent.extraCost} = ${(extraCalls * agent.extraCost).toFixed(2)}
                                                            </div>
                                                        </div>

                                                        <div>
                                                            <label className="text-sm font-medium">
                                                                Concurrent Clients per Agent
                                                            </label>
                                                            <div className="flex items-center space-x-4 mt-2">
                                                                <Button
                                                                    variant="outline"
                                                                    size="sm"
                                                                    onClick={() => updateConcurrentClients(agent.id, (selection.concurrentClients || 1) - 1)}
                                                                    disabled={(selection.concurrentClients || 1) <= 1}
                                                                >
                                                                    <Minus className="h-4 w-4" />
                                                                </Button>

                                                                <div className="flex-1">
                                                                    <Input
                                                                        type="number"
                                                                        value={selection.concurrentClients || 1}
                                                                        onChange={(e) => updateConcurrentClients(agent.id, parseInt(e.target.value) || 1)}
                                                                        min={1}
                                                                        className="text-center"
                                                                    />
                                                                </div>

                                                                <Button
                                                                    variant="outline"
                                                                    size="sm"
                                                                    onClick={() => updateConcurrentClients(agent.id, (selection.concurrentClients || 1) + 1)}
                                                                >
                                                                    <Plus className="h-4 w-4" />
                                                                </Button>
                                                            </div>

                                                            <div className="mt-2 text-xs text-gray-500">
                                                                Scaling cost: {((selection.concurrentClients || 1) - 1) * 25} × $25 = ${((selection.concurrentClients || 1) - 1) * 25}/month
                                                            </div>
                                                        </div>
                                                    </>
                                                ) : (
                                                    <div>
                                                        <label className="text-sm font-medium">
                                                            Monthly Estimations Limit
                                                        </label>
                                                        <div className="mt-2">
                                                            <Input
                                                                type="number"
                                                                value={selection.limit}
                                                                className="text-center"
                                                                disabled={true}
                                                                readOnly={true}
                                                            />
                                                        </div>
                                                        <div className="mt-2 text-xs text-gray-500">
                                                            Automatically synced with Conversational Agent usage
                                                        </div>
                                                    </div>
                                                )}

                                                {agent.id === 'estimation' && selectedAgents.conversational?.enabled && (
                                                    <div className="bg-blue-50 p-3 rounded-lg">
                                                        <p className="text-xs text-blue-700">
                                                            <Zap className="h-3 w-3 inline mr-1" />
                                                            Estimation limits are automatically synced with your Conversational Agent usage
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                        </CardContent>
                                    </Card>
                                )
                            })}
                        </div>
                    </div>
                )
            default:
                return null
        }
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            {/* Header */}
            <div className="text-center">
                <h1 className="text-3xl font-bold text-gray-900">Company Onboarding</h1>
                <p className="text-gray-600 mt-2">Set up your NoForma AI agents in just a few steps</p>
            </div>

            {/* Progress */}
            <div className="space-y-4">
                <Progress value={(currentStep + 1) / steps.length * 100} className="h-2" />
                <div className="flex justify-between text-sm">
                    {steps.map((step, index) => (
                        <div
                            key={step}
                            className={`flex items-center space-x-2 ${index <= currentStep ? 'text-blue-600' : 'text-gray-400'
                                }`}
                        >
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${index < currentStep ? 'bg-blue-600 text-white' :
                                index === currentStep ? 'bg-blue-100 text-blue-600' :
                                    'bg-gray-200 text-gray-400'
                                }`}>
                                {index < currentStep ? <Check className="h-3 w-3" /> : index + 1}
                            </div>
                            <span className="hidden sm:block">{step}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Content */}
            <Card>
                <CardContent className="p-8">
                    {renderStep()}
                </CardContent>
            </Card>

            {/* Navigation */}
            <div className="flex justify-between">
                <Button
                    variant="outline"
                    onClick={handlePrevious}
                    disabled={currentStep === 0}
                >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Previous
                </Button>

                {currentStep < steps.length - 1 ? (
                    <Button onClick={handleNext}>
                        Next
                        <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                ) : (
                    <div></div>
                )}
            </div>
        </div>
    )
}