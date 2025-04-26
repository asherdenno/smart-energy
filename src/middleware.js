import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
    function middleware(req) {
        console.log(req.nextauth);
        const url = req.nextUrl.clone()
        if (url.pathname === "/dashboard/admin" && req.nextauth.token?.account_type_id !== 1){
            url.pathname = '/dashboard/invalid-access'
            return NextResponse.redirect(url)
        }
    },
    {
        callbacks: {
            authorized: (params) => {
                let { token } = params;
                return !!token;
            },
        },
    }
);

export const config = { matcher : ["/dashboard/:path*"]}