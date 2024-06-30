'use client';
import { useQueryClient } from '@tanstack/react-query';
import React, { use, useCallback, useEffect, useRef, useState } from 'react';
import { deleteSession, verifySession } from '../../_libs/session';
import axiosSecure from '../../_configs/axiosSecureConfig';
import envConfigs from '../../_configs/envConfigs';
import { io } from "socket.io-client";
import { toast } from 'sonner';

export const AuthContext = React.createContext({});


const socket = io(envConfigs.socketUrl!, {
    transports: ['websocket'],
});



const AuthProvider = ({ children }: { children: React.ReactNode; }) => {
    const [user, setUser] = useState<null | Record<string, any>>(null);
    const [status, setStatus] = useState('online' as 'online' | 'offline' | 'connecting');
    const [clients, setClients] = useState([]);
    const [code, setCode] = useState('');
    const backupCodeRef = useRef('');
    const queryClient = useQueryClient();
    const editorRef = useRef(null);
    const handleConnect = () => setStatus('online');
    const handleDisconnect = () => setStatus('offline');
    const handleReconnect = () => setStatus('connecting');
    const handleError = (err: any) => {
        console.log(err, 'error while connecting socket');
        toast.error('Error while connecting to socket');

    };
    useEffect(() => {

        backupCodeRef.current = code;
    }, [code]);
    const handleCodeChange = ({ code }: { code: string; }) => {
        setCode(code);
    };

    const handleNewUser = ({ clients, message, username, socketId, color }: Record<string, any>) => {

        // console.log({ clients, message, socket, username, color });

        if (user?.username !== username) {
            toast.success(message);


        }
        setClients(clients);



        if (socketId !== socket.id) {
            console.log('emitting code');
            socket.emit('sync-code', { code: code || backupCodeRef.current, socketId: socketId });
        }




    };


    const handleUserLeft = ({ clients, message, socket, username }: Record<string, any>) => {
        console.log({ clients, message, socket, username });


        user?.username !== username && toast.error(message);
        setClients(clients);

    };

    useEffect(() => {
        (async function () {
            const { authorized, id } = await verifySession();
            if (authorized) {

                try {
                    const data = await queryClient.fetchQuery({
                        queryKey: ['user', id],
                        queryFn: async () => {
                            const res = await axiosSecure.get(envConfigs.publicApiUrl + `/auth/me?id=${id}`);
                            return res.data?.data;
                        },
                        staleTime: Infinity

                    });

                    setUser(data);
                    socket.on('connect', handleConnect);
                    socket.on('disconnect', handleDisconnect);
                    socket.on('reconnect', handleReconnect);
                    socket.on('reconnection_attempt', handleReconnect);
                    socket.on('connect_error', handleError);
                    socket.on('connect_failed', handleError);



                } catch (err) {
                    console.log(err);
                }

            }

        })();
        return () => {
            // socket.disconnect();
            socket.off('connect', handleConnect);
            socket.off('disconnect', handleDisconnect);
            socket.off('reconnect', handleReconnect);
            socket.off('reconnection_attempt', handleReconnect);
            socket.off('connect_error', handleError);
            socket.off('connect_failed', handleError);

        };

    }, []);

    useEffect(() => {
        if (user) {
            socket.on('new_user', handleNewUser);
            socket.on('user_left', handleUserLeft);
        }
        return () => {
            socket.off('new_user', handleNewUser);
            socket.off('user_left', handleUserLeft);
        };
    }, [user]);

    useEffect(() => {
        if (socket.connected) {
            setStatus('online');
        } else {
            setStatus('offline');
        }
    }, [socket.connected]);





    return (
        <AuthContext.Provider value={{ user, socket, status, clients, handleCodeChange, code, setCode, editorRef }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;