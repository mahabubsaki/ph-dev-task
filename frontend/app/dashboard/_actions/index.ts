'use server';

import envConfigs from "@/app/_configs/envConfigs";
import { verifySession } from "@/app/_libs/session";


const userActionWrapper = (fn: Function) => {
    return async (...args: any[]) => {

        const { authorized, id } = await verifySession();
        if (!authorized) {
            return {
                success: false,
                message: 'Unauthorized access'
            };
        }
        return await fn(...args, id);

    };

};


const createProject = userActionWrapper(async (name: string, id: string) => {
    const res = await fetch(envConfigs.apiUrl + '/projects/create', {
        body: JSON.stringify({ title: name, user: id, document: '' }),
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
    });
    const data = await res.json();
    if (!data.success) return {
        success: false,
        message: data.message + " : " + data.error
    };
    return {
        success: data.success,
        message: data.message,
    };

});

export {
    createProject
};