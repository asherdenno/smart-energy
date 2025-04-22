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
    async jwt({ token, user, session }) {
      console.log("jwt callback", { token, user, session });
      if (user) {
        // console.log("1** Token: " + token.id)
        // console.log("2** User: " + user.f_name)
        // token.id = user.account_id;
        // token.user = user;
        // token.username = user.f_name;
        return {
          ...token,
          id: user.account_id,
          lastname: user.l_name,
          account_type: user.account_type_id,
          username: user.username,
          network: user.network_filter_id,
          city: user.city_filter_id,
        };
      }

      return token;
    },
    async session ({ session, token, user }) {
      console.log("session callback", { session, token, user })
      // if (token) {
      //   console.log("3** Session: " + session)
      //   console.log("4** Token: " + token)
      //   session.user = token.user
      //   session.user.account_id = token.id
      //   session.user.name = token.username;
      // }
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          lastname: token.lastname,
          account_type: token.account_type,
          username: token.username,
          network: token.network,
          city: token.city,
        }
      };

      //return session;
    },
  },
  pages: {
    signIn: '/auth/signIn'
  }
};

export default NextAuth(authOptions)