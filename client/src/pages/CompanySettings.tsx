import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'
import {
    Building2,
    Bell,
    Shield,
    Users,
    CreditCard,
    Save
} from 'lucide-react'

export default function CompanySettingsPage() {
    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Company Settings</h1>
                    <p className="text-gray-600 mt-2">Manage your company profile and preferences</p>
                </div>
            </div>

            <Tabs defaultValue="general" className="w-full">
                <TabsList className="grid w-full grid-cols-5">
                    <TabsTrigger value="general">General</TabsTrigger>
                    <TabsTrigger value="notifications">Notifications</TabsTrigger>
                    <TabsTrigger value="security">Security</TabsTrigger>
                    <TabsTrigger value="billing">Billing</TabsTrigger>
                    <TabsTrigger value="team">Team</TabsTrigger>
                </TabsList>

                <TabsContent value="general" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <div className="flex items-center space-x-2">
                                <Building2 className="h-5 w-5" />
                                <CardTitle>Company Information</CardTitle>
                            </div>
                            <CardDescription>Update your company details and branding</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="company-name">Company Name</Label>
                                    <Input id="company-name" defaultValue="NoForma AI" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="website">Website</Label>
                                    <Input id="website" defaultValue="https://noforma.ai" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="phone">Phone</Label>
                                    <Input id="phone" defaultValue="+1 (555) 123-4567" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="industry">Industry</Label>
                                    <Input id="industry" defaultValue="AI/Technology" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="address">Address</Label>
                                <Textarea id="address" defaultValue="123 Innovation Drive, Tech Valley, CA 94000" />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description">Company Description</Label>
                                <Textarea
                                    id="description"
                                    defaultValue="NoForma AI helps small and medium businesses convert more leads with intelligent AI agents that respond to inquiries instantly."
                                    rows={4}
                                />
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="notifications" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <div className="flex items-center space-x-2">
                                <Bell className="h-5 w-5" />
                                <CardTitle>Notification Preferences</CardTitle>
                            </div>
                            <CardDescription>Choose how you want to be notified</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label>Email Notifications</Label>
                                        <p className="text-sm text-muted-foreground">Receive updates via email</p>
                                    </div>
                                    <Switch defaultChecked />
                                </div>

                                <Separator />

                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label>Agent Activity Alerts</Label>
                                        <p className="text-sm text-muted-foreground">Notify when agents engage with leads</p>
                                    </div>
                                    <Switch defaultChecked />
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label>Weekly Reports</Label>
                                        <p className="text-sm text-muted-foreground">Receive performance summaries</p>
                                    </div>
                                    <Switch defaultChecked />
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label>Billing Alerts</Label>
                                        <p className="text-sm text-muted-foreground">Payment and usage notifications</p>
                                    </div>
                                    <Switch defaultChecked />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="security" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <div className="flex items-center space-x-2">
                                <Shield className="h-5 w-5" />
                                <CardTitle>Security Settings</CardTitle>
                            </div>
                            <CardDescription>Manage your account security and access</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="current-password">Current Password</Label>
                                    <Input id="current-password" type="password" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="new-password">New Password</Label>
                                    <Input id="new-password" type="password" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                                    <Input id="confirm-password" type="password" />
                                </div>
                            </div>

                            <Separator />

                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label>Two-Factor Authentication</Label>
                                        <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                                    </div>
                                    <Switch />
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label>API Access</Label>
                                        <p className="text-sm text-muted-foreground">Allow third-party integrations</p>
                                    </div>
                                    <Switch defaultChecked />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="billing" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <div className="flex items-center space-x-2">
                                <CreditCard className="h-5 w-5" />
                                <CardTitle>Billing Information</CardTitle>
                            </div>
                            <CardDescription>Manage your subscription and payment methods</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <Card>
                                    <CardContent className="pt-6">
                                        <div className="text-center">
                                            <h3 className="text-lg font-semibold">Current Plan</h3>
                                            <p className="text-2xl font-bold text-blue-600 mt-2">Professional</p>
                                            <p className="text-sm text-muted-foreground mt-2">$299/month</p>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardContent className="pt-6">
                                        <div className="text-center">
                                            <h3 className="text-lg font-semibold">Next Billing</h3>
                                            <p className="text-2xl font-bold text-green-600 mt-2">Feb 15</p>
                                            <p className="text-sm text-muted-foreground mt-2">Auto-renewal</p>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardContent className="pt-6">
                                        <div className="text-center">
                                            <h3 className="text-lg font-semibold">Usage</h3>
                                            <p className="text-2xl font-bold text-orange-600 mt-2">75%</p>
                                            <p className="text-sm text-muted-foreground mt-2">Of monthly limit</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            <Separator />

                            <div className="space-y-4">
                                <Label>Payment Method</Label>
                                <div className="border rounded-lg p-4 flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                        <CreditCard className="h-8 w-8 text-gray-400" />
                                        <div>
                                            <p className="font-medium">•••• •••• •••• 4242</p>
                                            <p className="text-sm text-muted-foreground">Expires 12/2025</p>
                                        </div>
                                    </div>
                                    <Button variant="outline">Update</Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="team" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <div className="flex items-center space-x-2">
                                <Users className="h-5 w-5" />
                                <CardTitle>Team Management</CardTitle>
                            </div>
                            <CardDescription>Manage team members and their permissions</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="font-medium">Team Members</h3>
                                    <p className="text-sm text-muted-foreground">3 of 10 seats used</p>
                                </div>
                                <Button>Invite Member</Button>
                            </div>

                            <div className="space-y-3">
                                <div className="flex items-center justify-between p-3 border rounded-lg">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-medium">
                                            JD
                                        </div>
                                        <div>
                                            <p className="font-medium">John Doe</p>
                                            <p className="text-sm text-muted-foreground">john@noforma.ai</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">Admin</span>
                                        <Button variant="ghost" size="sm">Remove</Button>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between p-3 border rounded-lg">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center text-white text-sm font-medium">
                                            SM
                                        </div>
                                        <div>
                                            <p className="font-medium">Sarah Miller</p>
                                            <p className="text-sm text-muted-foreground">sarah@noforma.ai</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <span className="text-sm bg-gray-100 text-gray-800 px-2 py-1 rounded">Member</span>
                                        <Button variant="ghost" size="sm">Remove</Button>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>

            <div className="flex justify-end">
                <Button className="px-6">
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                </Button>
            </div>
        </div>
    )
}