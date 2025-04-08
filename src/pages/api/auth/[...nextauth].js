import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60
  },
  providers: [
    CredentialsProvider({

      name: "credentials",

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
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        console.log("1** Token: " + token.id)
        console.log("2** User: " + user.f_name)
        token.id = user.account_id
        token.username = user.f_name;
        token.accessToken = token;
      }

      return token, user
    },
    session: async ({ session, token }) => {
      if (token) {
        console.log("3** Session: " + session)
        console.log("4** Token: " + token)
        session.user = token.user
        session.user.account_id = token.id
        session.user.name = token.username;
        session.accessToken = token.accessToken;
      }
      return session;
    },
  },
  pages: {
    signIn: '/auth/signIn'
  }
};

export default NextAuth(authOptions)