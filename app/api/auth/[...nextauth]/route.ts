// import type { NextApiRequest, NextApiResponse } from "next"
// import NextAuth from "next-auth"
// import CredentialsProvider from "next-auth/providers/credentials"

// export default async function auth(req: NextApiRequest, res: NextApiResponse) {
//   // Do whatever you want here, before the request is passed down to `NextAuth`
//   return await NextAuth(req, res, {
//     providers: [
//         CredentialsProvider({
//           // The name to display on the sign in form (e.g. 'Sign in with...')
//           name: 'Credentials',
//           // The credentials is used to generate a suitable form on the sign in page.
//           // You can specify whatever fields you are expecting to be submitted.
//           // e.g. domain, username, password, 2FA token, etc.
//           // You can pass any HTML attribute to the <input> tag through the object.
//           credentials: {
//             username: { label: "Username", type: "text", placeholder: "jsmith" },
//             password: { label: "Password", type: "password" }
//           },
//           async authorize(credentials, req) {
//             // You need to provide your own logic here that takes the credentials
//             // submitted and returns either a object representing a user or value
//             // that is false/null if the credentials are invalid.
//             // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
//             // You can also use the `req` object to obtain additional parameters
//             // (i.e., the request IP address)
//             if(credentials?.username === "amministrazione@centropicasso.it" && credentials.password === "StudioPicasso123") {
//                 return {id: "1", name: "Centro", email: "amministarzione@centropicasso.it"}
//             }
//             // Return null if user data could not be retrieved
//             return null
//           }
//         })
//       ]
//   })
// }

import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"


export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied

        if(credentials?.username === "amministrazione@centropicasso.it" && credentials.password === "StudioPicasso123") {
          const user = { id: "1", name: "J Smith", email: "jsmith@example.com" };
          return user

        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null
  
          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      }
    })
  ],
  secret: process.env.NEXTAUTH_SECRET as string,
  pages: {
    signIn: '/login',
    // signOut: '/auth/signout',
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60

}
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };