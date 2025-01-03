import { ActionFunction, redirect } from "react-router";
import customFetch from "./customFetch";

export const loginAction: ActionFunction = async ({ request }) => {
  try {
    const formData = await request.formData();
    const { email, password } = Object.fromEntries(formData.entries());
    await customFetch.post("/auth/login", { email, password });
    return redirect("/");
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const registerAction: ActionFunction = async ({ request }) => {
  try {
    const formData = await request.formData();
    const { username, email, password } = Object.fromEntries(
      formData.entries()
    );
    await customFetch.post("/auth/register", { username, email, password });
    return redirect("/login");
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const verifyEmailAction: ActionFunction = async ({ request }) => {
  try {
    const query = new URL(request.url);
    const verificationToken = query.searchParams.get("token");
    const email = query.searchParams.get("email");
    await customFetch.post("/auth/verify-email", { verificationToken, email });
    return redirect("/login");
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const forgotPasswordAction: ActionFunction = async ({ request }) => {
  try {
    const formData = await request.formData();
    const { email } = Object.fromEntries(formData.entries());
    await customFetch.post("/auth/forgot", { email });
    return redirect("/login");
  } catch (error) {
    console.log(error);
    return null;
  }
};
export const resetPasswordAction: ActionFunction = async ({ request }) => {
  try {
    const formData = await request.formData();
    const { password } = Object.fromEntries(formData.entries());
    const query = new URL(request.url);
    await customFetch.post("/auth/reset", {
      password,
      passwordToken: query.searchParams.get("token"),
      email: query.searchParams.get("email"),
    });
    return redirect("/login");
  } catch (error) {
    console.log(error);
    return null;
  }
};
