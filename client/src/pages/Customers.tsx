import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
    Search,
    Plus,
    Mail,
    Phone,
    MapPin,
    Calendar,
} from 'lucide-react'

const customers = [
    {
        id: 1,
        name: 'Sarah Chen',
        company: 'TechCorp Solutions',
        email: 'sarah@techcorp.com',
        phone: '+1 (555) 123-4567',
        status: 'active',
        totalProjects: 3,
        totalRevenue: 125000,
        lastContact: '2024-01-15',
        location: 'San Francisco, CA'
    },
    {
        id: 2,
        name: 'Michael Rodriguez',
        company: 'StartupXYZ',
        email: 'mike@startupxyz.com',
        phone: '+1 (555) 234-5678',
        status: 'prospect',
        totalProjects: 0,
        totalRevenue: 0,
        lastContact: '2024-01-14',
        location: 'Austin, TX'
    },
    {
        id: 3,
        name: 'Emily Watson',
        company: 'Digital Innovations',
        email: 'emily@diginnovations.com',
        phone: '+1 (555) 345-6789',
        status: 'active',
        totalProjects: 7,
        totalRevenue: 320000,
        lastContact: '2024-01-13',
        location: 'New York, NY'
    }
]

export default function CustomersPage() {
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'active':
                return 'bg-green-100 text-green-800'
            case 'prospect':
                return 'bg-blue-100 text-blue-800'
            case 'inactive':
                return 'bg-gray-100 text-gray-800'
            default:
                return 'bg-gray-100 text-gray-800'
        }
    }

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Customers</h1>
                    <p className="text-gray-600 mt-2">Manage your client relationships and interactions</p>
                </div>
                <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Customer
                </Button>
            </div>


            {/* Search and Filters */}
            <Card>
                <CardHeader>
                    <CardTitle>Customer Directory</CardTitle>
                    <CardDescription>Search and manage your customer base</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center space-x-4 mb-6">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input placeholder="Search customers..." className="pl-10" />
                        </div>
                        <Button variant="outline">Filter</Button>
                        <Button variant="outline">Export</Button>
                    </div>

                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Customer</TableHead>
                                <TableHead>Contact</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Projects</TableHead>
                                <TableHead>Revenue</TableHead>
                                <TableHead>Last Contact</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {customers.map((customer) => (
                                <TableRow key={customer.id}>
                                    <TableCell>
                                        <div className="flex items-center space-x-3">
                                            <Avatar className="h-10 w-10">
                                                <AvatarImage src={`/avatar-${customer.id}.jpg`} alt={customer.name} />
                                                <AvatarFallback>{customer.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <p className="font-medium">{customer.name}</p>
                                                <p className="text-sm text-gray-500">{customer.company}</p>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="space-y-1 text-sm">
                                            <div className="flex items-center">
                                                <Mail className="h-3 w-3 mr-2 text-gray-400" />
                                                {customer.email}
                                            </div>
                                            <div className="flex items-center">
                                                <Phone className="h-3 w-3 mr-2 text-gray-400" />
                                                {customer.phone}
                                            </div>
                                            <div className="flex items-center">
                                                <MapPin className="h-3 w-3 mr-2 text-gray-400" />
                                                {customer.location}
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge className={getStatusColor(customer.status)}>
                                            {customer.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>{customer.totalProjects}</TableCell>
                                    <TableCell>${customer.totalRevenue.toLocaleString()}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center text-sm">
                                            <Calendar className="h-3 w-3 mr-2 text-gray-400" />
                                            {new Date(customer.lastContact).toLocaleDateString()}
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}