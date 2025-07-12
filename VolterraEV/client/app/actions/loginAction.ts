"use server"

import {cookies} from "next/headers";

export default async function loginAction(prev, formData: FormData) {
    const username = formData.get("username");
    const password = formData.get("password");

    try {
        const response = await fetch("http://localhost:8080/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "username" : username,
                "password" : password
            }),
        })
        if(!response.ok) {
            throw new Error("Login failed please tr again");
        }
        const data = await response.json();
        const accessToken = data.token;

        const cookieStore = await cookies();
        cookieStore.set({
            name: "accessToken",
            value: accessToken,
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            path: "/",
            maxAge: 60 * 60 * 24,
        });

        return { success: true };
    }catch (error) {
        console.error(error);
        return { success: false, message: error.message};

    }
}
