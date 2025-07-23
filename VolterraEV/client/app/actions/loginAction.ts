'use server'

import { signIn } from "@/auth"
import { AuthError } from "next-auth"
import {redirect} from "next/navigation";
import {ActionResponse, User} from "@/types/account-types"

export default async function LoginAction(prevState: ActionResponse, formData: FormData): Promise<ActionResponse> {
    let user: User = {
        username : formData.get("username") as string,
        password: formData.get("password") as string
    }
    try {
        await signIn("credentials", {
            redirect: false,
            username: user.username,
            password: user.password
        })

    } catch (error) {
        console.log(error)
        if (error instanceof AuthError && error.type === "CredentialsSignin") {
            return { success: false, message: "Invalid credentials" }
        } else {
            return { success: false, message: "unexpected failure"}
        }

    }

    redirect("/dashboard")
}