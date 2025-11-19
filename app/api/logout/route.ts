import { SessionDoesNotExistError } from '@/lib/auth/erorrs';
import { NextResponse } from 'next/server';

export async function POST(request: Request){

        const res = NextResponse.json({ success: true });

        res.cookies.set("session", "", {
            httpOnly: true,
            path: "/",
            maxAge: 0,
        });

        return res;

        
}