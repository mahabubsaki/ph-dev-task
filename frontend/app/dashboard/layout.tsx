
import React from 'react';
import { verifySession } from '../_libs/session';
import { redirect } from 'next/navigation';
import AuthProvider from './_providers/auth.provider';
import Sidebar from './_components/Sidebar';


const DashboardLayout = async ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    const { authorized } = await verifySession();
    if (!authorized) {
        redirect('/');
    }
    return (
        <AuthProvider>
            <section className='flex'>
                <nav className='flex-1 min-h-[100dvh] bg-[#000435] text-white'>
                    <div className='sticky h-[100dvh] top-0'>
                        <Sidebar />
                    </div>
                </nav>
                <section className='flex-[3_3_0%]'>
                    {children}
                </section>

            </section>

        </AuthProvider>
    );
};

export default DashboardLayout;