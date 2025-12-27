import { AppSidebar } from '@/components/app-sidebar';
import { AppSidebarHeader } from '@/components/app-sidebar-header';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { type BreadcrumbItem } from '@/types';
import { usePage } from '@inertiajs/react';
import { type ReactNode } from 'react';
import { Toaster } from 'sonner';

export default function AppLayout({ children, breadcrumbs = [] }: { children: ReactNode; breadcrumbs?: BreadcrumbItem[] }) {
    const { auth } = usePage().props as any;
    const { url } = usePage();

    // Check if the user is logged in AND on a path that starts with /dashboard
    const showSidebar = auth.user && url.startsWith('/dashboard');

    return (
        <SidebarProvider defaultOpen={true}>
            {/* Only render Sidebar if conditions are met */}
            {showSidebar && <AppSidebar />}

            <SidebarInset>
                {/* Header stays for everyone (Shop and Dashboard) */}
                <AppSidebarHeader breadcrumbs={breadcrumbs} />
                
                <main className="flex-1">
                    {/* If no sidebar, we can add a container for the shop */}
                    <div className={!showSidebar ? "max-w-7xl mx-auto w-full" : ""}>
                        {children}
                    </div>
                </main>

                <Toaster position="top-right" richColors closeButton />
            </SidebarInset>
        </SidebarProvider>
    );
}