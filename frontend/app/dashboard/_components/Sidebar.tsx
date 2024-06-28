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
    const { user, clients } = useAuth();

    return (
        <div className='p-5 h-full flex flex-col justify-between'>
            <div>
                <h1 className='text-center text-xl font-bold'>Welcome to CollabWrite</h1>
                <div className='flex flex-col gap-2'>
                    <h2 className='text-lg font-semibold text-center mb-2'>Online Users</h2>
                    {clients.map((client) => <div key={client.username} className='flex items-center gap-2'>
                        <Avatar className='size-[50px]'>
                            <AvatarImage src="" alt="user-avatar" />
                            <AvatarFallback>{client?.username?.[0]?.toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div>
                            <div className='flex items-center gap-2'><span>{client?.username} {
                                client?.username === user?.username ? '(You)' : ''
                            } </span>
                            </div>

                        </div>
                    </div>)}
                </div>

            </div>

            <div className='flex justify-between'>
                <div className='flex gap-5 items-center'>
                    <Avatar className='size-[50px]'>
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