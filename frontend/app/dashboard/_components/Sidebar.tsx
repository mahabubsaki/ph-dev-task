'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import React from 'react';
import useAuth from '../_hooks/useAuth';
import { Button } from '@/components/ui/button';
import { deleteSession } from '@/app/_libs/session';
import dynamic from 'next/dynamic';
const Status = dynamic(() => import('../_components/force-client/Status'), {
    ssr: false,

});

const Sidebar = () => {
    const { user } = useAuth();

    return (
        <div className='p-5 h-full flex flex-col justify-between'>
            <div>
                <h1 className='text-center text-xl font-bold'>Welcome to CollabWrite</h1>
            </div>

            <div className='flex justify-between'>
                <div className='flex gap-5 items-center'>
                    <Avatar>
                        <AvatarImage src="" alt="user-avatar" />
                        <AvatarFallback>{user?.username[0]?.toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div>
                        <div className='flex items-center gap-2'><span>{user?.username} </span>  <Status />
                        </div>

                    </div>
                </div>
                <Button onClick={() => deleteSession()}>Logout</Button>
            </div>

        </div>
    );
};

export default Sidebar;