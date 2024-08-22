import { NextResponse, NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;
    const method = req.method;

    console.log(`[Middleware] ${method} request to ${pathname}`);
    req.headers.set('X-Custom-Header', 'CustomHeaderValue');

    const customHeader = req.headers.get('X-Required-Header');
    if (!customHeader) {
        return NextResponse.json(
            { message: 'Bad Request: Missing required header' },
            { status: 400 }
        );
    }
    return NextResponse.next();
}

export const config = {
    matcher: ['/api/users/:id*', '/api/users'],
};
