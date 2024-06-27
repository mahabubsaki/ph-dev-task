'use client';

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { loginSchema, signUpSchema } from "./_schemas";
import { LOGIN_DEFAULTS, SIGN_UP_DEFAULTS } from "./_constants";

export default function Home() {

  const [type, setType] = useState<'login' | 'signup'>('signup');

  const schema = useMemo(() => type === 'signup' ? signUpSchema : loginSchema, [type]);

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: type === 'signup' ? SIGN_UP_DEFAULTS : LOGIN_DEFAULTS,
  });
  function onSubmit(values: z.infer<typeof schema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  return (
    <main className="min-h-[100dvh] bg-[linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5)),url('/bg.jpg')] bg-cover bg-fixed bg-no-repeat bg-top flex justify-center items-center px-5">
      <AnimatePresence mode="popLayout">
        {type === 'signup' && (
          <motion.section transition={{
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
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="capitalize text-white">{name}</FormLabel>
                      <FormControl>
                        <Input type={name === 'password' ? 'password' : 'text'} autoComplete="off" placeholder={`Enter your ${name}`} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                ))}
                <div className="flex justify-between">
                  <Button type="submit">Register</Button>
                  <button type="button" onClick={() => setType('login')} className="text-white underline">Login</button>
                </div>
              </form>
            </Form>
          </motion.section>
        )
        }

      </AnimatePresence>
      <AnimatePresence mode="popLayout">

        {
          type === 'login' && (

            <motion.section transition={{
              duration: 0.5,

            }} initial={{
              scale: 0
            }} animate={{
              scale: 1

            }} exit={{
              scale: 0
            }} className="w-[90%]  max-w-[700px] p-5 rounded-md mx-auto bg-black text-white">
              <h1 className="text-2xl text-center font-bold">Welcome Back to <span className="text-[#FF00FF] font-black">CollabWrite</span></h1>
              <p className="text-center opacity-80">Login to continue writing with others.</p>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 text-black">
                  {['Email', 'Password'].map((name) => (<FormField
                    key={name}
                    control={form.control}
                    name={'login' + name as 'email' | 'password'}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="capitalize text-white">{name}</FormLabel>
                        <FormControl>
                          <Input type={name === 'password' ? 'password' : 'text'} autoComplete="off" placeholder={`Enter your ${name}`} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  ))}
                  <div className="flex justify-between">
                    <Button type="submit">Login</Button>
                    <button type="button" onClick={() => setType('signup')} className="text-white underline">Register</button>
                  </div>
                </form>
              </Form>
            </motion.section>

          )
        }
      </AnimatePresence>
    </main>
  );
}
