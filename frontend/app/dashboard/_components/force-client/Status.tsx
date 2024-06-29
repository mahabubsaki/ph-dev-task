import { Badge } from '@/components/ui/badge';
import React from 'react';
import useAuth from '../../_hooks/useAuth';

const Status = ({ id }: { id: string; }) => {
    const { status } = useAuth();
    return (

        <>
            <Badge variant={status === 'online' ? 'default' : status === 'offline' ? 'destructive' : 'outline'}>{status}</Badge>
            {id}
        </>

    );
};

export default Status;