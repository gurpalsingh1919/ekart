import { Breadcrumbs } from '@/components/breadcrumbs';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';
import { type BreadcrumbItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { CartSheet } from '@/components/cart-sheet';
import { route } from 'ziggy-js';
export function AppSidebarHeader({ breadcrumbs }: { breadcrumbs: BreadcrumbItem[] }) {
    const { auth } = usePage().props as any;

    return (
        <header className="flex h-16 shrink-0 items-center justify-between border-b px-4 bg-white">
            {/* Left Side: Sidebar Toggle & Breadcrumbs */}

            <div className="flex items-center gap-2">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />
                <Breadcrumbs breadcrumbs={breadcrumbs} />
                <div className="text-left font-bold">eKart</div>
            </div>

            {/* Right Side: Auth Links & Cart */}

            <div className="flex items-center gap-4">
                {auth.user ? (
                    <Link href="/dashboard" className="text-sm font-medium hover:text-indigo-600 transition-colors">
                        Dashboard
                    </Link>
                ) : (
                    <div className="flex items-center gap-3">
                        <Link href="/login" className="text-sm font-medium">Login</Link>
                        <Link href="/register" className="text-sm font-medium border px-4 py-1.5 rounded-lg hover:bg-gray-50 transition-colors">
                            Register
                        </Link>
                    </div>
                )}
                
                <Separator orientation="vertical" className="h-6 mx-1" />
                
                <CartSheet />
            </div>
        </header>
    );
}