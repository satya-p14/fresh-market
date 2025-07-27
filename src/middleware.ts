import { NextRequest, NextResponse } from 'next/server';
export function middleware(request: NextRequest) {
    const timestamp = new Date().toISOString();
    const method = request.method;
    const path = request.nextUrl.pathname;
    const logEntry = `[${timestamp}] ${method} ${path}`;
    console.log(logEntry);
    return NextResponse.next();
}


export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico).*)',
    ],
};