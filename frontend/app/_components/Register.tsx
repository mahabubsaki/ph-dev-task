import React, { Dispatch, SetStateAction } from 'react';
import { SIGN_UP_DEFAULTS } from "../_constants";
import { signUpSchema } from "../_schemas";

import { AnimatePresence, motion } from "framer-motion";
import { FieldValues, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const Register = ({ onSubmit, isPending, setType, type }: { onSubmit: (data: FieldValues) => void; isPending: boolean, setType: Dispatch<SetStateAction<"login" | "signup">>; type: "login" | "signup"; }) => {



    const form = useForm<z.infer<typeof signUpSchema>>({
        resolver: zodResolver(signUpSchema),
        defaultValues: SIGN_UP_DEFAULTS,
    });

    return (
        <AnimatePresence mode="popLayout">
            {type === 'signup' && <motion.section transition={{
                duration: 0.5,


            }} initial={{
                scale: 0
            }} animate={{
                scale: 1

            }} exit={{
                scale: 0
            }} className="w-[90%]  max-w-[700px] p-5 rounded-md mx-auto bg-black text-white">
                <h1 className="text-2xl text-center font-bold">Join Now to <span className="text-[#FF00FF] font-black">CollabWrite</span></h1>
                <p className="text-center opacity-80">Create an account to start writing with others.</p>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 text-black">
                        {['username', 'email', 'password'].map((name) => (<FormField
                            key={name}
                            control={form.control}
                            name={name as 'email' | 'password'}
                            render={({ field }) => {

                                return <FormItem>
                                    <FormLabel className="capitalize text-white">{name}</FormLabel>
                                    <FormControl>
                                        <Input type={name === 'password' ? 'password' : 'text'} autoComplete="off" placeholder={`Enter your ${name}`} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>;
                            }}
                        />
                        ))}
                        <div className="flex justify-between">
                            <Button disabled={isPending} type="submit">Register</Button>
                            <button type="button" onClick={() => setType('login')} className="text-white underline">Login</button>
                        </div>
                    </form>
                </Form>
            </motion.section>}
        </AnimatePresence>
    );
};

export default Register;