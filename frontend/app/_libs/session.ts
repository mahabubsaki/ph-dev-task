'use server';
const secretKey = envConfigs.jwtSecret!;
const key = new TextEncoder().encode(secretKey);
import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import envConfigs from '../_configs/envConfigs';
import { redirect } from 'next/navigation';




export async function encrypt(payload: { [key: string]: any; }) {
    return new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('12hr')
        .sign(key);
}

export async function decrypt(session: string | undefined = '') {
    try {
        const { payload } = await jwtVerify(session, key, {
            algorithms: ['HS256'],
        });
        return payload;
    } catch (error) {
        console.log('Failed to verify session', error);
        return null;
    }
}


const createSession = async ({ email, id, username }: { id: string, email: string, username: string; }) => {

    const expiresAt = new Date(Date.now() + envConfigs.jwtExpiry);
    const session = await encrypt({ id, expiresAt, email, username });

    cookies().set('session', session, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        maxAge: envConfigs.jwtExpiry,



    });

};

const verifySession = async () => {
    const cookie = cookies().get('session')?.value;
    if (!cookie) return {
        authorized: false,
    };
    const session = await decrypt(cookie);

    if (!session) return {
        authorized: false,
    };
    return {
        authorized: true,
        id: session.id,
        email: session.email,
        username: session.username,
    };
};
const deleteSession = async () => {
    const cookie = cookies().get('session')?.value;

    if (!cookie) {
        redirect('/');
    }

    const session = await decrypt(cookie);
    if (!session?.id) {
        redirect('/');
    }


    cookies().delete('session');
    redirect('/');
};


export {
    createSession,
    deleteSession,
    verifySession
};