import { Badge } from '@/components/ui/badge';
import React from 'react';
import useAuth from '../../_hooks/useAuth';

const Status = () => {
    const { status } = useAuth();
    return (

        <>
            <Badge variant={status === 'online' ? 'default' : status === 'offline' ? 'destructive' : 'outline'}>{status}</Badge>

        </>

    );
};

export default Status;