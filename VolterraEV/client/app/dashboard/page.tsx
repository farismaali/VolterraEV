import getVehicles from "@/lib/getVehicles";
import { auth } from "@/auth";
import VehicleList from "@/components/vehicle-list";
import { Suspense } from "react";
import VehicleLoadingPage from "@/components/loading-page";
import SignOutButton from "@/components/sign-out";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import EcommerceChatbot from "@/components/chatbot";

export default async function DashBoard() {
    const session = await auth();
    const data = getVehicles(session.user.accessToken);

    return (
        <div className="text-4xl">
            <header className="flex items-center justify-between mb-10 w-full px-4">
                <div className="flex-1"></div>

                <h1 className="text-center flex-1">
                    You want it we got it!
                </h1>

                <div className="flex-1 flex justify-end items-center gap-4">
                    <Link href="/cart">
                        <ShoppingCart className="w-6 h-6 cursor-pointer hover:text-blue-600 transition" />
                    </Link>
                    <SignOutButton />
                </div>
            </header>

            <div className={"flex justify-center"}>
                <main className={"container h-screen border overflow-scroll"}>
                    <div className="grid grid-cols-1 justify-items-center gap-4 p-2">
                        <Suspense fallback={<VehicleLoadingPage />}>
                            <VehicleList promise={data} session={session} />
                        </Suspense>
                    </div>
                </main>
                <EcommerceChatbot/>

            </div>
        </div>
    );
}
