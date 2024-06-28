'use client';
import { useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { deleteSession, verifySession } from '../_libs/session';
import axiosSecure from '../_configs/axiosSecureConfig';
import envConfigs from '../_configs/envConfigs';


export const AuthContext = React.createContext({});

const AuthProvider = ({ children }: { children: React.ReactNode; }) => {
    const [user, setUser] = useState(null);
    const queryClient = useQueryClient();


    useEffect(() => {
        (async function () {
            const { authorized, id } = await verifySession();
            if (authorized) {

                try {
                    const data = await queryClient.fetchQuery({
                        queryKey: ['user', id],
                        queryFn: async () => {
                            const res = await axiosSecure.get(envConfigs.publicApiUrl + `/auth/me?id=${id}`);
                            return res.data;
                        }

                    });
                    setUser(data);
                } catch (err) {
                    console.log(err);
                }

            }

        })();
    }, []);

    return (
        <AuthContext.Provider value={{ user }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;