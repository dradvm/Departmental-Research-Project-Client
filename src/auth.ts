import axios from "axios";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
// import axiosInstance from "services/http";
import { IUser } from "types/next-auth";
import { sendRequest } from "utils/api";
import { InactiveAccoounError, InvalidEmailPasswordError } from "utils/errors";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        try {
          const res = await axios.post(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/login`,
            {
              email: credentials.email,
              password: credentials.password,
            }
          );

          console.log(">>> check res: ", res);
          if (res.status === 201) {
            // return user object with their profile data
            return {
              userId: res.data?.user?.userId,
              name: res.data?.user?.name,
              email: res.data?.user?.email,
              image: res.data?.user?.image,
              access_token: res.data?.access_token,
            };
          } else if (+res.status === 401) {
            throw new InvalidEmailPasswordError();
          } else if (+res.status === 400) {
            throw new InactiveAccoounError();
          } else {
            throw new Error("Internal server error");
          }
        } catch (err) {
          throw new Error(err instanceof Error ? err.message : String(err));
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        // User is available during sign-in
        token.user = user as IUser;
      }
      return token;
    },
    session({ session, token }) {
      (session.user as IUser) = token.user;
      return session;
    },
    authorized: async ({ auth }) => {
      // Logged in users are authenticated, otherwise redirect to login page
      return !!auth;
    },
  },
});
