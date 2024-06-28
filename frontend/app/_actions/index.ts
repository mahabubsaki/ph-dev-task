'use server';

import { FieldValues } from "react-hook-form";
import envConfigs from "../_configs/envConfigs";
import { createSession } from "../_libs/session";




const signUp = async (data: FieldValues) => {
    const { email, password, username } = data;


    const res = await fetch(envConfigs.apiUrl + '/auth/register', {
        body: JSON.stringify({ email, password, username }),
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST'
    });
    const json = await res.json();

    if (!json.success) return {
        success: false,
        message: json.message + " : " + json.error
    };
    const { data: user } = json;
    await createSession({
        email: user.email,
        id: user._id,
        username: user.username
    });

    return {
        success: true,
        message: json.message
    };
};
const login = async (data: FieldValues) => {
    const { loginEmail, loginPassword } = data;
    const res = await fetch(envConfigs.apiUrl + '/auth/login', {
        body: JSON.stringify({ loginEmail, loginPassword }),
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST'
    });
    const json = await res.json();

    if (!json.success) return {
        success: false,
        message: json.message + " : " + json.error
    };
    const { data: user } = json;
    await createSession({
        email: user.email,
        id: user._id,
        username: user.username
    });
    return {
        success: true,
        message: json.message
    };
};



export { signUp, login };