'use client';
import { useContext } from "react";
import { AuthContext } from "../_providers/auth.provider";

const useAuth = () => {
    const auth = useContext<Record<string, any>>(AuthContext);
    if (!auth) throw new Error('useAuth must be used within an AuthProvider');
    return auth;
};
export default useAuth;