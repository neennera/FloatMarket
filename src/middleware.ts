import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

import { jwtVerify, importJWK } from "jose";
import { headers } from "next/headers";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  try{
    const userToken = request.cookies.get('userToken')
    
    if(userToken === undefined){
      throw new Error("user not login")
    }
    const secretJWK ={
        kty:'oct',
        k:process.env.JOSE_SECRET
    }
    const secretKey = await importJWK(secretJWK, 'HS256')
    const {payload} = await jwtVerify(userToken.value, secretKey)
    
    const requestHeader = new Headers(request.headers)
    requestHeader.set('username', JSON.stringify({username : payload.username}))
    const response = NextResponse.next({
      request : {
        headers : requestHeader,
      }
    })
    return response
  }catch(error){
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/user/:path*", "/cart/:path*"],
};