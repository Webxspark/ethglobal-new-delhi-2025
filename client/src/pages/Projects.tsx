import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Progress } from '@/components/ui/progress'
import {
    Plus,
    FolderOpen,
    Calendar,
    DollarSign,
    Users,
    Clock
} from 'lucide-react'

const projects = [
    {
        id: 1,
        name: 'E-commerce Website',
        client: 'TechCorp Solutions',
        status: 'in-progress',
        progress: 65,
        budget: 50000,
        spent: 32500,
        deadline: '2024-02-15',
        team: 4
    },
    {
        id: 2,
        name: 'Mobile App Development',
        client: 'StartupXYZ',
        status: 'planning',
        progress: 10,
        budget: 35000,
        spent: 3500,
        deadline: '2024-03-01',
        team: 3
    }
]

export default function ProjectsPage() {
    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Projects</h1>
                    <p className="text-gray-600 mt-2">Track and manage your ongoing projects</p>
                </div>
                <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    New Project
                </Button>
            </div>


            <Card>
                <CardHeader>
                    <CardTitle>Project Overview</CardTitle>
                    <CardDescription>Current project status and progress</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Project</TableHead>
                                <TableHead>Client</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Progress</TableHead>
                                <TableHead>Budget</TableHead>
                                <TableHead>Deadline</TableHead>
                                <TableHead>Team</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {projects.map((project) => (
                                <TableRow key={project.id}>
                                    <TableCell className="font-medium">{project.name}</TableCell>
                                    <TableCell>{project.client}</TableCell>
                                    <TableCell>
                                        <Badge className={project.status === 'in-progress' ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'}>
                                            {project.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <div className="space-y-1">
                                            <Progress value={project.progress} className="h-2 w-20" />
                                            <span className="text-xs text-gray-500">{project.progress}%</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="text-sm">
                                            <div>${project.spent.toLocaleString()} / ${project.budget.toLocaleString()}</div>
                                            <div className="text-xs text-gray-500">
                                                {Math.round((project.spent / project.budget) * 100)}% used
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center text-sm">
                                            <Calendar className="h-3 w-3 mr-2 text-gray-400" />
                                            {new Date(project.deadline).toLocaleDateString()}
                                        </div>
                                    </TableCell>
                                    <TableCell>{project.team} members</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}