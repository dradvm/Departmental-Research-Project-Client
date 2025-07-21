import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authService } from "services/auth.service";
import { IUser } from "types/next-auth";
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
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        const res = await authService.login({
          email,
          password,
        });

        if (res.statusCode === 201) {
          // return user object with their profile data
          return {
            userId: res.data?.user?.userId,
            name: res.data?.user?.name,
            email: res.data?.user?.email,
            image: res.data?.user?.image,
            biography: res.data?.user?.biography,
            role: res.data?.user?.role,
            access_token: res.data?.access_token,
          };
        }
        //Sai pass: 401
        //Chưa active: 400
        else if (+res.statusCode === 401) {
          throw new InvalidEmailPasswordError();
        } else if (+res.statusCode === 404) {
          throw new InvalidEmailPasswordError();
        } else if (+res.statusCode === 400) {
          throw new InactiveAccoounError();
        } else {
          throw new Error("Internal server error");
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    jwt({ token, user, trigger, session }) {
      if (user) {
        // User is available during sign-in
        token.user = user as IUser;
      }

      // Khi gọi update() từ client
      if (trigger === "update" && session) {
        token.user = {
          ...token.user,
          ...session, // các field bạn truyền từ `update()`
        };
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
  trustHost: true,
});
