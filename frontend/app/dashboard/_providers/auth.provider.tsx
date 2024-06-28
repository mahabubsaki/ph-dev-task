'use client';
import { useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { deleteSession, verifySession } from '../../_libs/session';
import axiosSecure from '../../_configs/axiosSecureConfig';
import envConfigs from '../../_configs/envConfigs';
import { io } from "socket.io-client";

export const AuthContext = React.createContext({});


const socket = io(envConfigs.socketUrl!, {
    transports: ['websocket'],
});


const AuthProvider = ({ children }: { children: React.ReactNode; }) => {
    const [user, setUser] = useState(null);
    const [status, setStatus] = useState('online' as 'online' | 'offline' | 'connecting');
    console.log(socket);
    const queryClient = useQueryClient();
    const handleConnect = () => setStatus('online');
    const handleDisconnect = () => setStatus('offline');
    const handleReconnect = () => setStatus('connecting');

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


                } catch (err) {
                    console.log(err);
                }

            }

        })();
        return () => {
            socket.off('connect', handleConnect);
            socket.off('disconnect', handleDisconnect);
            socket.off('reconnect', handleReconnect);
            socket.off('reconnection_attempt', handleReconnect);
        };

    }, []);

    useEffect(() => {
        if (socket.connected) {
            setStatus('online');
        } else {
            setStatus('offline');
        }
    }, [socket.connected]);



    return (
        <AuthContext.Provider value={{ user, socket, status }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;