import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import {
    Plus,
    FileText,
    DollarSign,
    Calendar,
    CheckCircle,
    AlertCircle,
    Download
} from 'lucide-react'

const invoices = [
    {
        id: 'INV-001',
        client: 'TechCorp Solutions',
        amount: 25000,
        status: 'paid',
        issueDate: '2024-01-15',
        dueDate: '2024-02-14',
        project: 'E-commerce Website'
    },
    {
        id: 'INV-002',
        client: 'StartupXYZ',
        amount: 8500,
        status: 'pending',
        issueDate: '2024-01-20',
        dueDate: '2024-02-19',
        project: 'Mobile App Development'
    }
]

export default function InvoicesPage() {
    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Invoices</h1>
                    <p className="text-gray-600 mt-2">Manage billing and payments</p>
                </div>
                <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Invoice
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Recent Invoices</CardTitle>
                    <CardDescription>Track payment status and manage billing</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Invoice ID</TableHead>
                                <TableHead>Client</TableHead>
                                <TableHead>Project</TableHead>
                                <TableHead>Amount</TableHead>
                                <TableHead>Issue Date</TableHead>
                                <TableHead>Due Date</TableHead>
                                <TableHead>Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {invoices.map((invoice) => (
                                <TableRow key={invoice.id}>
                                    <TableCell className="font-medium">{invoice.id}</TableCell>
                                    <TableCell>{invoice.client}</TableCell>
                                    <TableCell>{invoice.project}</TableCell>
                                    <TableCell className="font-semibold">
                                        ${invoice.amount.toLocaleString()}
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center text-sm">
                                            <Calendar className="h-3 w-3 mr-2 text-gray-400" />
                                            {new Date(invoice.issueDate).toLocaleDateString()}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center text-sm">
                                            <Calendar className="h-3 w-3 mr-2 text-gray-400" />
                                            {new Date(invoice.dueDate).toLocaleDateString()}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge className={invoice.status === 'paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                                            {invoice.status === 'paid' && <CheckCircle className="h-3 w-3 mr-1" />}
                                            {invoice.status === 'pending' && <AlertCircle className="h-3 w-3 mr-1" />}
                                            {invoice.status}
                                        </Badge>
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