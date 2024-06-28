import React from 'react';

import { Card } from '@/components/ui/card';
import { Pencil } from 'lucide-react';
import Link from 'next/link';
const Projects = ({ projects }: { projects: Array<Record<string, any>>; }) => {
    console.log(projects);

    return (
        <div className='grid grid-cols-3'>
            {
                projects.map((project) => <Link key={project._id} href={`/dashboard/${project._id}`}>
                    <div className="max-w-[300px] " >
                        <Card className="w-full  my-4 cursor-pointer duration-300 group aspect-square flex bg-inherit hover:bg-black justify-center items-center">
                            <Pencil size={50} className="group-hover:text-white" />

                        </Card>
                        <div className='text-center'>
                            <p className="  font-semibold">{project.title}</p>
                            <p className="text-sm opacity-80">Author : {project.user.username}</p>
                            <p className="text-sm opacity-80">Created On : {new Date(project.createdAt).toLocaleDateString()}</p>
                        </div>


                    </div></Link>)
            }
        </div>
    );
};

export default Projects;