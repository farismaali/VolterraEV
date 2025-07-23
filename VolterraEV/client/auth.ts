import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                try {
                    const response = await fetch("http://localhost:8080/auth/login", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            username: credentials?.username,
                            password: credentials?.password,
                        }),
                    });

                    const data = await response.json();
                    console.log("Login Response:", data);

                    if (response.ok && data.token) {
                        return {
                            id: data.id,
                            username: data.username,
                            accessToken: data.token, // ✅ storing as accessToken
                        };
                    }

                    return null;
                } catch (error) {
                    console.error("Authorize error:", error);
                    throw error;
                }
            },
        }),
    ],

    callbacks: {
        async jwt({ token, user, trigger, session }) {
            if (user) {
                token.accessToken = user.accessToken;
                token.username = user.username;
                token.userId = user.id;
            }

            if (trigger === "update") {
                return { ...token, ...session.user };
            }

            return token;
        },

        async session({ session, token }) {
            session.user = {
                id: token.userId,
                username: token.username,
                accessToken: token.accessToken,
            };
            return session;
        },
    },

    session: {
        strategy: "jwt",
    },

    secret: process.env.NEXTAUTH_SECRET,
});
