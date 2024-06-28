
import React from 'react';
import { verifySession } from '../_libs/session';
import { redirect } from 'next/navigation';
import AuthProvider from '../_providers/auth.provider';

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
            {children}
        </AuthProvider>
    );
};

export default DashboardLayout;