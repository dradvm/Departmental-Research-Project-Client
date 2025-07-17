"use server";
import { signIn } from "auth";

export async function authenticate(email: string, password: string) {
  try {
    const r = await signIn("credentials", {
      email: email,
      password: password,
      // callbackUrl: "/",
      redirect: false,
    });
    console.log(">>> check r: ", r);
    return r;
  } catch (error) {

    if ((error as any).name === "InvalidEmailPasswordError") {
      return {
        error: (error as any).type,
        code: 1,
      };
    } else if ((error as any).name === "InactiveAccoounError") {
      return {
        error: (error as any).type,
        code: 2,
      };
    } else {
      return {
        error: "Internal server error",
        code: 0,
      };
    }
  }
}
