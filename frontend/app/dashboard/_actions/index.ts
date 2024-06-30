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

const sendMessage = userActionWrapper(async ({ message, room }: { message: string, room: string; }, id: string) => {
    const res = await fetch(envConfigs.apiUrl + '/messages/send', {
        body: JSON.stringify({ message, room, user: id }),
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


const createFeedback = userActionWrapper(async ({ feedback, changeId, project }: { feedback: string, changeId: string; project: string; }, id: string) => {
    const res = await fetch(envConfigs.apiUrl + '/projects/feedback', {
        body: JSON.stringify({ feedback, changeId, user: id, project }),
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


const editProject = userActionWrapper(async ({ title, projectId }: { title: string, projectId: string; }) => {
    console.log({
        title,
        projectId

    });
    const res = await fetch(envConfigs.apiUrl + `/projects/edit/${projectId}`, {
        body: JSON.stringify({ title }),
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'PUT',
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


const deleteProject = userActionWrapper(async ({ projectId }: { projectId: string; }) => {
    const res = await fetch(envConfigs.apiUrl + `/projects/delete/${projectId}`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'DELETE',
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
    createProject,
    sendMessage,
    createFeedback,
    editProject,
    deleteProject
};