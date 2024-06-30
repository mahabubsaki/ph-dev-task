'use client';

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMutation, useQuery } from "@tanstack/react-query";

import { BadgePlus } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { createProject } from "./_actions";
import Projects from "./_components/Projects";
import axiosSecure from "../_configs/axiosSecureConfig";
import envConfigs from "../_configs/envConfigs";
import useAuth from "./_hooks/useAuth";



const Dashbaord = () => {
    const [open, setOpen] = useState(false);
    const { user, socket } = useAuth();








    const [name, setName] = useState('');
    const { data: projects, refetch } = useQuery({
        queryKey: ['projects'],
        queryFn: async () => {
            const res = await axiosSecure.get(envConfigs.publicApiUrl + `/projects/list?id=${user.id}`);
            return res.data?.data;
        },
        initialData: [],

    });

    const { isPending, mutate } = useMutation({
        mutationKey: ['create-project'],
        mutationFn: createProject,
        onSettled: async (data) => {
            if (!data.success) {


                return toast.error(data.message);
            }
            toast.success(data.message);
            await refetch();
            socket.emit('new_product', 'new product created');
            setOpen(false);
        }
    });


    const handleCreate = () => {
        if (name.trim() === '') return toast.error('Project name is required');
        mutate(name);
    };

    useEffect(() => {
        if (user) {
            socket.emit('join_public', 'public');
        }


    }, [user]);
    useEffect(() => {
        socket.on('update', (product: string) => {
            console.log('message from server', product);
            refetch();
        });
    }, []);


    return (
        <div className="p-5 flex flex-col gap-10">
            <div>

                <Dialog open={open} onOpenChange={(open) => {
                    if (!open) setName('');
                    setOpen(open);
                }}>

                    <DialogContent onInteractOutside={() => setOpen(false)} className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>New Project</DialogTitle>
                            <DialogDescription>
                                Create a new project to get started with your work
                            </DialogDescription>
                        </DialogHeader>

                        <Label htmlFor="project-name">Project Name</Label>
                        <Input value={name} onChange={(e) => setName(e.target.value)} id="project-name" placeholder="Enter project name" />

                        <DialogFooter>
                            <Button onClick={handleCreate} type="button" disabled={isPending}>Create</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

                <h1 className="text-2xl font-bold">Create Project</h1>
                <div className="max-w-[300px] ">
                    <Card onClick={() => setOpen(true)} className="w-full  my-4 cursor-pointer duration-300 group aspect-square flex bg-inherit hover:bg-black justify-center items-center">
                        <BadgePlus size={50} className="group-hover:text-white" />
                    </Card>
                    <p className="text-sm opacity-80 text-center">Create a project to get started</p>

                </div>

            </div>

            <div>
                <h1 className="text-2xl font-bold">Available Projects</h1>
                <Projects projects={projects} listRefetch={refetch} />
            </div>

        </div>
    );
};

export default Dashbaord;