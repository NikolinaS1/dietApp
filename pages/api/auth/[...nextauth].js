import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import { client } from "../../../lib/sanity";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      try {
        const userDoc = {
          _type: "user",
          _id: user.id,
          firstName: profile.given_name,
          lastName: profile.family_name,
          email: user.email,
          image: user.image,
          locale: profile.locale,
          provider: account.provider,
        };

        await client.createIfNotExists(userDoc);
        return true;
      } catch (error) {
        console.error("error", error);
        return false;
      }
      // return true;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
    async jwt({ token, account, user }) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token;
        token.user = user;
      }
      return token;
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token from a provider.
      session.accessToken = token.accessToken;
      session.user = token.user;
      return session;
    },
  },

  // secret: process.env.NEXTAUTH_SECRET,
});
