'use client';

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";

import { useMutation } from "@tanstack/react-query";

import { toast } from "sonner";
import { login, signUp } from "../_actions";

import { deleteSession } from "../_libs/session";
import { useRouter } from "next/navigation";
import Register from "./Register";
import Login from "./Login";

export default function AuthPage({ authorized }: { authorized: boolean; }) {

    const [type, setType] = useState<'login' | 'signup'>('signup');

    const router = useRouter();



    const { mutate, isPending } = useMutation({
        mutationKey: [type, 'auth'],
        mutationFn: type === 'signup' ? signUp : login,

        onSettled: (data) => {
            console.log(data);
            if (!(data!).success) {

                return toast.error((data!).message);
            }
            router.push('/dashboard');
            toast.success((data!).message);

        }
    });

    const onSubmit = (data: FieldValues) => mutate(data);

    useEffect(() => {
        if (authorized) {
            deleteSession();
        }
    }, [authorized]);
    return (
        <main className="min-h-[100dvh] bg-[linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5)),url('/bg.jpg')] bg-cover bg-fixed bg-no-repeat bg-top flex justify-center items-center px-5">

            <Register isPending={isPending} onSubmit={onSubmit} setType={setType} type={type} />




            <Login isPending={isPending} onSubmit={onSubmit} setType={setType} type={type} />
        </main>
    );
}
