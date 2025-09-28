import { useState } from 'react'
import { Outlet, Link, useLocation } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import {
    LayoutDashboard,
    Bot,
    Users,
    FolderOpen,
    BookOpen,
    Menu,
    Settings,
    LogOut,
    Bell
} from 'lucide-react'
import { ConnectButton } from '@rainbow-me/rainbowkit'

const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Customers', href: '/dashboard/customers', icon: Users },
    { name: 'Projects', href: '/dashboard/projects', icon: FolderOpen },
]

export default function DashboardLayout() {
    const location = useLocation()
    const [sidebarOpen, setSidebarOpen] = useState(false)

    const SidebarContent = () => (
        <div className="flex h-full flex-col">
            {/* Logo */}
            <div className="flex h-16 shrink-0 items-center px-6">
                <Bot className="h-8 w-8 text-blue-600" />
                <span className="ml-2 text-xl font-bold text-gray-900">NoForma</span>
            </div>

            <Separator />

            {/* Navigation */}
            <nav className="flex-1 space-y-1 px-4 py-4">
                {navigation.map((item) => {
                    const isActive = location.pathname === item.href
                    return (
                        <Link
                            key={item.name}
                            to={item.href}
                            className={cn(
                                'group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors',
                                isActive
                                    ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600'
                                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                            )}
                            onClick={() => setSidebarOpen(false)}
                        >
                            <item.icon
                                className={cn(
                                    'mr-3 h-5 w-5 flex-shrink-0',
                                    isActive ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-500'
                                )}
                            />
                            {item.name}
                        </Link>
                    )
                })}
            </nav>

            <Separator />

            {/* User Profile */}
        </div>
    )

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Desktop Sidebar */}
            <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
                <div className="flex flex-col flex-grow bg-white border-r border-gray-200 shadow-sm">
                    <SidebarContent />
                </div>
            </div>

            {/* Mobile Sidebar */}
            <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
                <SheetContent side="left" className="w-64 p-0">
                    <div className="bg-white h-full">
                        <SidebarContent />
                    </div>
                </SheetContent>
                <SheetTrigger className='flex items-center justify-center' asChild>
                    <Button variant="ghost" size="sm" className="lg:hidden">
                        <Menu className="h-6 w-6" />
                    </Button>
                </SheetTrigger>
            </Sheet>

            {/* Main Content */}
            <div className="flex-1 lg:pl-64">
                {/* Top Header */}
                <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">

                        <div className="flex items-center justify-end w-full space-x-4">
                            <ConnectButton />
                        </div>
                    </div>
                </div>

                {/* Page Content */}
                <main className="flex-1 overflow-auto">
                    <div className="p-6">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    )
}