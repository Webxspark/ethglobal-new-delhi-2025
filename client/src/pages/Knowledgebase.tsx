import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import {
    BookOpen,
    Search,
    FileText,
    Video,
    Link,
    Brain,
    Upload,
    Trash2
} from 'lucide-react'

const knowledgeItems = [
    {
        id: 1,
        title: 'Product Documentation',
        type: 'document',
        category: 'Products',
        lastUpdated: '2024-01-20',
        size: '2.4 MB',
        agents: ['Sales Agent', 'Support Agent']
    },
    {
        id: 2,
        title: 'Company Overview Video',
        type: 'video',
        category: 'Company',
        lastUpdated: '2024-01-18',
        size: '45.2 MB',
        agents: ['Sales Agent']
    }
]

const categories = [
    { name: 'Products', count: 12, icon: BookOpen },
    { name: 'Company', count: 8, icon: Brain },
    { name: 'Pricing', count: 5, icon: FileText },
    { name: 'Support', count: 15, icon: Video }
]

export default function KnowledgebasePage() {
    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Knowledge Base</h1>
                    <p className="text-gray-600 mt-2">Manage AI agent training data and resources</p>
                </div>
                <Button>
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Content
                </Button>
            </div>


            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle>Content Library</CardTitle>
                            <CardDescription>Training materials and resources for AI agents</CardDescription>
                        </div>
                        <div className="flex items-center space-x-2">
                            <div className="relative">
                                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input placeholder="Search content..." className="pl-8 w-64" />
                            </div>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <Tabs defaultValue="all" className="w-full">
                        <TabsList>
                            <TabsTrigger value="all">All Content</TabsTrigger>
                            <TabsTrigger value="documents">Documents</TabsTrigger>
                            <TabsTrigger value="videos">Videos</TabsTrigger>
                            <TabsTrigger value="links">Links</TabsTrigger>
                        </TabsList>

                        <TabsContent value="all" className="space-y-4">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Title</TableHead>
                                        <TableHead>Type</TableHead>
                                        <TableHead>Category</TableHead>
                                        <TableHead>Size</TableHead>
                                        <TableHead>Used by Agents</TableHead>
                                        <TableHead>Last Updated</TableHead>
                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {knowledgeItems.map((item) => (
                                        <TableRow key={item.id}>
                                            <TableCell className="font-medium">
                                                <div className="flex items-center">
                                                    {item.type === 'document' && <FileText className="h-4 w-4 mr-2 text-blue-500" />}
                                                    {item.type === 'video' && <Video className="h-4 w-4 mr-2 text-purple-500" />}
                                                    {item.type === 'link' && <Link className="h-4 w-4 mr-2 text-green-500" />}
                                                    {item.title}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant="outline" className="capitalize">
                                                    {item.type}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>{item.category}</TableCell>
                                            <TableCell>{item.size}</TableCell>
                                            <TableCell>
                                                <div className="flex flex-wrap gap-1">
                                                    {item.agents.map((agent) => (
                                                        <Badge key={agent} variant="secondary" className="text-xs">
                                                            {agent}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                {new Date(item.lastUpdated).toLocaleDateString()}
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center space-x-2">
                                                    <Button variant="ghost" size="sm">
                                                        Edit
                                                    </Button>
                                                    <Button variant="ghost" size="sm" className="text-red-600">
                                                        <Trash2 className="h-3 w-3" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TabsContent>

                        <TabsContent value="documents" className="space-y-4">
                            <div className="text-center py-12 text-gray-500">
                                <FileText className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                                <p>Document content will be shown here</p>
                            </div>
                        </TabsContent>

                        <TabsContent value="videos" className="space-y-4">
                            <div className="text-center py-12 text-gray-500">
                                <Video className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                                <p>Video content will be shown here</p>
                            </div>
                        </TabsContent>

                        <TabsContent value="links" className="space-y-4">
                            <div className="text-center py-12 text-gray-500">
                                <Link className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                                <p>Link content will be shown here</p>
                            </div>
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    )
}