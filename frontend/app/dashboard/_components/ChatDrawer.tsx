'use client';
import { Button } from '@/components/ui/button';
import { Drawer, DrawerContent, DrawerDescription, DrawerTitle } from '@/components/ui/drawer';
import { Input } from '@/components/ui/input';
import { MessageCircle } from 'lucide-react';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import useAuth from '../_hooks/useAuth';
import { useParams } from 'next/navigation';
import { DialogHeader } from '@/components/ui/dialog';
import { toast, Toaster } from 'sonner';
import { sendMessage } from '../_actions';
import { useMutation, useQuery } from '@tanstack/react-query';
import axiosSecure from '@/app/_configs/axiosSecureConfig';
import envConfigs from '@/app/_configs/envConfigs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

const ChatDrawer = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const { socket, user } = useAuth();
    const { projectID } = useParams();
    const [newMessage, setNewMessage] = useState(false);


    const { data, refetch } = useQuery({
        queryKey: ['messages', projectID],
        queryFn: async () => {
            const res = await axiosSecure.get(envConfigs.publicApiUrl + `/messages/${projectID}?id=${user.id}`);

            return res.data?.data;
        },
        initialData: [],
    });


    const { mutate, isPending } = useMutation({
        mutationKey: ['send-message'],
        mutationFn: sendMessage,
        onSettled: (data) => {
            if (!data.success) {
                return toast.error(data.message);
            }
            refetch();
            socket.emit('new_message_client', 'new message created');
        }

    });

    useEffect(() => {
        socket.on('new_message', ({ socketId }) => {
            refetch();
            if (!drawerOpen) setNewMessage(true);
        });
        return () => {
            socket.off('new_message');
        };
    }, []);





    return (
        <>

            <Drawer direction="left" onOpenChange={(open) => setDrawerOpen(open)} open={drawerOpen}>

                <DrawerContent className="h-[100dvh] w-[700px] flex flex-col p-3">
                    <DialogHeader className="text-center text-2xl mb-2">
                        <DrawerTitle>Chat Area</DrawerTitle>
                    </DialogHeader>

                    <div className="flex-[14_14_0%]  overflow-hidden">
                        <div className="h-full overflow-auto flex flex-col gap-3 px-2">
                            {data?.map((message) => <div key={message._id} className="flex gap-2 items-center">

                                <div className={`max-w-[50%] gap-1 flex items-center  text-sm  ${message.user.username === user.username ? 'ms-auto flex-row-reverse' : 'me-auto flex-row'} `}>
                                    <p className='text-xs'>{message.user.username}</p>
                                    <Avatar className='size-[50px]'>
                                        <AvatarImage src="" alt="user-avatar" />
                                        <AvatarFallback className='!text-white !bg-slate-500'>{message.user.username[0]?.toUpperCase()}</AvatarFallback>
                                    </Avatar>  <div>
                                        <span className='bg-blue-500 py-1 px-2 text-white rounded-sm'>
                                            {message.message}
                                        </span>

                                    </div>
                                    <p className='text-xs'>{new Date(message.createdAt).toLocaleTimeString()}</p>
                                </div>

                            </div>)}

                        </div>
                    </div>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        if (e.target.message.value.trim() === '') return toast.error('Message cannot be empty');
                        mutate({ message: e.target.message.value, room: projectID });
                        e.target.message.value = '';
                    }} className="flex-1 p-2 flex items-center gap-5 ">
                        <Input name='message' required className="h-full flex-[4_4_0%]" placeholder="Type a message" />
                        <Button className="flex-1 h-full" type='submit'>Send</Button>
                    </form>
                    <DrawerDescription>
                    </DrawerDescription>
                </DrawerContent>
            </Drawer>
            <Button disabled={isPending} className="fixed top-5 right-5" onClick={() => {
                setDrawerOpen(true);
                setNewMessage(false);

            }}>
                <MessageCircle size={30} /> <Badge >{data.length} {newMessage ? 'new' : ''}</Badge>
            </Button>
        </>
    );
};

export default ChatDrawer;