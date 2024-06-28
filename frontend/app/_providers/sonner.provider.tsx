'use client';
import React from 'react';
import { Toaster } from 'sonner';

const SonnerProvider = ({ children }: { children: React.ReactNode; }) => {

    return (
        <>
            <Toaster invert richColors position='top-center' expand />
            {children}
        </>
    );
};

export default SonnerProvider;