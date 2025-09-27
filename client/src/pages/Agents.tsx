import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Separator } from '@/components/ui/separator'
import {
    Plus,
    Settings,
    Play,
    Pause,
    Phone,
    Calculator,
    AlertCircle
} from 'lucide-react'

type Agent = {
    id: number
    name: string
    type: string
    status: string
    currentCalls?: number
    totalCalls?: number
    callLimit?: number
    currentTasks?: number
    totalEstimations?: number
    estimationLimit?: number
    cost: string
    description: string
    lastActive: string
}

const agents = [
    {
        id: 1,
        name: 'Conversational Agent #1',
        type: 'Conversational',
        status: 'active',
        currentCalls: 3,
        totalCalls: 67,
        callLimit: 100,
        cost: '$150/month',
        description: 'Handles new client meetings and lead onboarding',
        lastActive: '2 minutes ago'
    },
    {
        id: 2,
        name: 'Estimation Agent #1',
        type: 'Estimation',
        status: 'active',
        currentTasks: 1,
        totalEstimations: 24,
        estimationLimit: 200,
        cost: '$50/month',
        description: 'Provides quick project estimates and quotes',
        lastActive: '5 minutes ago'
    },
]

export default function AgentsPage() {
    const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null)
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'active':
                return 'bg-green-100 text-green-800'
            case 'paused':
                return 'bg-yellow-100 text-yellow-800'
            case 'offline':
                return 'bg-gray-100 text-gray-800'
            default:
                return 'bg-gray-100 text-gray-800'
        }
    }

    const getStatusDot = (status: string) => {
        switch (status) {
            case 'active':
                return 'bg-green-500'
            case 'paused':
                return 'bg-yellow-500'
            case 'offline':
                return 'bg-gray-400'
            default:
                return 'bg-gray-400'
        }
    }

    const handleConfigureAgent = (agent: Agent) => {
        setSelectedAgent(agent)
        setIsDialogOpen(true)
    }

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">AI Agents</h1>
                    <p className="text-gray-600 mt-2">Manage and configure your AI agents</p>
                </div>
                <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Agent
                </Button>
            </div>

           
            <Card>
                <CardHeader>
                    <CardTitle>Agent Status</CardTitle>
                    <CardDescription>Monitor and manage your AI agents</CardDescription>
                </CardHeader>
                <CardContent>
                    {agents.map((agent) => (
                        <div key={agent.id} className="flex items-center justify-between p-4 border rounded-lg mb-4 last:mb-0">
                            <div className="flex items-center space-x-4">
                                <div className="relative">
                                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                                        {agent.type === 'Conversational' ? (
                                            <Phone className="h-6 w-6 text-white" />
                                        ) : (
                                            <Calculator className="h-6 w-6 text-white" />
                                        )}
                                    </div>
                                    <div className={`absolute -bottom-0.5 -right-0.5 w-4 h-4 ${getStatusDot(agent.status)} rounded-full border-2 border-white`}></div>
                                </div>

                                <div>
                                    <h3 className="font-medium text-gray-900">{agent.name}</h3>
                                    <p className="text-sm text-gray-500">{agent.description}</p>
                                    <div className="flex items-center mt-1 space-x-4">
                                        <Badge className={`${getStatusColor(agent.status)} text-xs`}>
                                            {agent.status}
                                        </Badge>
                                        <span className="text-xs text-gray-400">Last active: {agent.lastActive}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center space-x-6">
                                {agent.type === 'Conversational' ? (
                                    <div className="text-right">
                                        <div className="text-sm font-medium">{agent.currentCalls} active calls</div>
                                        <div className="text-xs text-gray-500">{agent.totalCalls}/{agent.callLimit} this month</div>
                                        <div className="text-xs font-medium text-green-600">{agent.cost}</div>
                                    </div>
                                ) : (
                                    <div className="text-right">
                                        <div className="text-sm font-medium">{agent.currentTasks} active tasks</div>
                                        <div className="text-xs text-gray-500">{agent.totalEstimations}/{agent.estimationLimit} this month</div>
                                        <div className="text-xs font-medium text-green-600">{agent.cost}</div>
                                    </div>
                                )}

                                <div className="flex items-center space-x-2">
                                    <Button variant="outline" size="sm">
                                        {agent.status === 'active' ? (
                                            <>
                                                <Pause className="h-4 w-4 mr-2" />
                                                Pause
                                            </>
                                        ) : (
                                            <>
                                                <Play className="h-4 w-4 mr-2" />
                                                Start
                                            </>
                                        )}
                                    </Button>

                                    <Button variant="outline" size="sm" onClick={() => handleConfigureAgent(agent)}>
                                        <Settings className="h-4 w-4 mr-2" />
                                        Configure
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>

            {/* Single Dialog Component */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>Configure {selectedAgent?.name}</DialogTitle>
                        <DialogDescription>
                            Adjust settings and instructions for your AI agent
                        </DialogDescription>
                    </DialogHeader>

                    {selectedAgent && (
                        <div className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm font-medium">Agent Name</label>
                                    <Input defaultValue={selectedAgent.name} className="mt-1" />
                                </div>
                                <div>
                                    <label className="text-sm font-medium">Status</label>
                                    <div className="flex items-center space-x-2 mt-1">
                                        <Switch defaultChecked={selectedAgent.status === 'active'} />
                                        <span className="text-sm">Active</span>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="text-sm font-medium">Description</label>
                                <Input defaultValue={selectedAgent.description} className="mt-1" />
                            </div>

                            <div>
                                <label className="text-sm font-medium">System Instructions</label>
                                <Textarea
                                    className="mt-1"
                                    rows={4}
                                    defaultValue="You are a professional AI assistant helping with client onboarding. Be friendly, knowledgeable, and efficient in gathering requirements."
                                />
                            </div>

                            <div>
                                <label className="text-sm font-medium">Knowledge Base Access</label>
                                <div className="grid grid-cols-2 gap-3 mt-2">
                                    <div className="flex items-center space-x-2">
                                        <Switch defaultChecked />
                                        <span className="text-sm">Company Info</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Switch defaultChecked />
                                        <span className="text-sm">Service Catalog</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Switch />
                                        <span className="text-sm">Pricing Guide</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Switch defaultChecked />
                                        <span className="text-sm">FAQ Database</span>
                                    </div>
                                </div>
                            </div>

                            <Separator />

                            {selectedAgent.type === 'Conversational' && (
                                <div className="bg-blue-50 rounded-lg p-4">
                                    <div className="flex items-start space-x-2">
                                        <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                                        <div>
                                            <p className="text-sm font-medium text-blue-900">Usage Limits</p>
                                            <p className="text-xs text-blue-700 mt-1">
                                                Current: {selectedAgent.totalCalls}/{selectedAgent.callLimit} calls this month.
                                                Additional calls will be charged at $1.5 each.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                        <Button onClick={() => setIsDialogOpen(false)}>Save Changes</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}