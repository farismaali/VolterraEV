"use server"
 import userSchema from "@/app/schemas/user";

export default async function signUpAction(prev, formData: FormData) {
    let user = {
        username: formData.get("username") as string,
        password: formData.get("password") as string,
        confirmPassword: formData.get("confirmPassword") as string
    }
    console.log(user);
    const result = userSchema.safeParse(user);
    if (!result.success) {
        return {validationError: result.error?.flatten().fieldErrors}
    }

    try {
        const response = await fetch("http://localhost:8080/auth/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "username": user.username,
                "password": user.password
            }),
        })
        if (!response.ok) {
            throw new Error("Register failed please try again");
        }
        await response.json();
        return {success: true, message: "Success signup successfully."};


    }catch (e) {
        console.error(e);
        return {success: false, message: e.message};
    }
}