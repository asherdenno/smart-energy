import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
//import { fetchUserData } from "../../../app/page"

export default NextAuth({
    providers: [
        CredentialsProvider({

          name: "Credentials",

          credentials: {
            username: { label: "Username", type: "text", placeholder: "jsmith" },
            password: { label: "Password", type: "password" }
          },
          async authorize(credentials, req) {
            
            const res = await fetch('http://localhost:3000/api/fetch-user', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ userName: credentials?.username, password: credentials?.password })
            });
        
            const user = await res.json();

            return res.ok && user.length > 0 ? user[0] : null
          }
        })
      ],
      pages: {
        signIn: '/auth/signIn',
        // signOut: '/auth/signout',
        // error: '/auth/error', // Error code passed in query string as ?error=
        // verifyRequest: '/auth/verify-request', // (used for check email message)
        // newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
      }
})