'use client';

import { signOut } from "next-auth/react";

export default function SignOutButton() {
    return (
        <button
            onClick={() => signOut()}
            className="ml-4 px-4 py-2 bg-secondary text-white rounded hover:bg-red-700 transition text-lg hover:cursor-pointer"
        >
            Sign Out
        </button>
    );
}
