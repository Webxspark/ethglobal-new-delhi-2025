import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'

export default function DashboardPage() {
    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-gray-600 mt-2">Overview of your NoForma performance</p>
            </div>


            {/* Agent Status and Performance */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Active Agents</CardTitle>
                        <CardDescription>Current status of your AI agents</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between p-4 border rounded-lg">
                            <div className="flex items-center space-x-3">
                                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                <div>
                                    <p className="font-medium">Conversational Agent #1</p>
                                    <p className="text-sm text-gray-500">Currently handling 3 calls</p>
                                </div>
                            </div>
                            <Badge className="bg-green-100 text-green-800">Active</Badge>
                        </div>

                        <div className="flex items-center justify-between p-4 border rounded-lg">
                            <div className="flex items-center space-x-3">
                                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                <div>
                                    <p className="font-medium">Conversational Agent #2</p>
                                    <p className="text-sm text-gray-500">Available</p>
                                </div>
                            </div>
                            <Badge className="bg-green-100 text-green-800">Active</Badge>
                        </div>

                        <div className="flex items-center justify-between p-4 border rounded-lg">
                            <div className="flex items-center space-x-3">
                                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                                <div>
                                    <p className="font-medium">Estimation Agent</p>
                                    <p className="text-sm text-gray-500">Processing 2 estimates</p>
                                </div>
                            </div>
                            <Badge className="bg-blue-100 text-blue-800">Busy</Badge>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Monthly Usage</CardTitle>
                        <CardDescription>Track your agent usage limits</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium">Conversational Calls</span>
                                <span className="text-sm text-gray-500">67/100</span>
                            </div>
                            <Progress value={67} className="h-2" />
                            <p className="text-xs text-gray-500 mt-1">33 calls remaining this month</p>
                        </div>

                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium">Estimations</span>
                                <span className="text-sm text-gray-500">23/100</span>
                            </div>
                            <Progress value={23} className="h-2" />
                            <p className="text-xs text-gray-500 mt-1">77 estimations remaining this month</p>
                        </div>
                    </CardContent>
                </Card>
            </div>

        </div>
    )
}