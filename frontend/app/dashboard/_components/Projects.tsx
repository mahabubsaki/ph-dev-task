import React, { useState } from 'react';

import { Card } from '@/components/ui/card';
import { Pencil } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import useAuth from '../_hooks/useAuth';
import { useMutation, useQuery } from '@tanstack/react-query';
import axiosSecure from '@/app/_configs/axiosSecureConfig';
import envConfigs from '@/app/_configs/envConfigs';
import { toast } from 'sonner';
import { deleteProject, editProject } from '../_actions';
const Projects = ({ projects, listRefetch }: { projects: Array<Record<string, any>>; listRefetch: () => void; }) => {
    const { user } = useAuth();
    const [editId, setEditId] = useState<string | null>(null);
    const [title, setTitle] = useState('');


    const { isLoading, refetch } = useQuery({
        queryKey: ['projects', editId, user?.id],
        queryFn: async () => {
            const res = await axiosSecure.get(envConfigs.publicApiUrl + `/projects/list/${editId}?id=${user.id}`);
            setTitle(res.data?.data?.title);
            return res.data?.data?.title;
        },
        initialData: '',
        enabled: !!editId
    });

    const { mutate, isPending } = useMutation({
        mutationKey: ['edit-project'],
        mutationFn: editProject,
        onSettled: async (data) => {
            setEditId(null);
            if (!data.success) {
                return toast.error(data.message);
            }
            toast.success(data.message);
            listRefetch();

        }

    });

    const { mutate: deleteMutate, isPending: isDeletePending } = useMutation({
        mutationKey: ['delete-project'],
        mutationFn: deleteProject,
        onSettled: (data) => {
            if (!data.success) {
                return toast.error(data.message);
            }
            toast.success(data.message);
            listRefetch();
        }
    });

    return (
        <div className='grid grid-cols-3'>
            {
                projects.map((project) =>
                    <div className="max-w-[300px] " key={project._id}>
                        <Link href={`/dashboard/${project._id}`}>
                            <Card className="w-full  my-4 cursor-pointer duration-300 group aspect-square flex bg-inherit hover:bg-black justify-center items-center">
                                <Pencil size={50} className="group-hover:text-white" />

                            </Card>
                        </Link>
                        <div className='text-center flex flex-col gap-2'>
                            <p className="  font-semibold">{project.title}</p>
                            <p className="text-sm opacity-80">Author : {project.user.username}</p>
                            <p className="text-sm opacity-80">Created On : {new Date(project.createdAt).toLocaleDateString()}</p>
                            <Button onClick={() => deleteMutate({ projectId: project._id })} disabled={isDeletePending} variant={'destructive'}>
                                Delete
                            </Button>
                            <Button onClick={() => setEditId(project._id)} value={'secondary'}>
                                Edit
                            </Button>
                        </div>


                    </div>
                )
            }
            <Dialog open={!!editId} onOpenChange={(open) => {


                if (!open) {
                    setEditId(null);
                };
            }}>

                <DialogContent onInteractOutside={() => setEditId(null)} className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Edit Title</DialogTitle>

                    </DialogHeader>

                    <Label htmlFor="project-name">Title</Label>
                    <Input value={title} onChange={(e) => setTitle(e.target.value)} id="project-name" placeholder="Enter project name" />

                    <DialogFooter>
                        <Button onClick={() => {
                            if (title.trim() === '') return toast.error('Title is required');
                            mutate({ projectId: editId, title });
                        }} type="button" disabled={isPending}>Submit</Button>
                    </DialogFooter>
                    {isLoading ? 'Loading...' : ''}
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default Projects;