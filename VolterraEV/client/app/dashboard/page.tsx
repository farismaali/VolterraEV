import getVehicles from "@/lib/getVehicles";
import { auth } from "@/auth"
import VehicleList from "@/components/vehicle-list";
export default async function DashBoard() {
    const session = await auth()
    const data = getVehicles(session.user.accessToken);
    return (
        <div className="text-4xl">
            <header className={"flex items-center justify-center"}>
                <h1>
                    You want it we got it!
                </h1>
            </header>
            <div className={"flex justify-center"}>
                <main className={"container h-screen border overflow-scroll"}>
                    <div className="grid grid-cols-1 justify-items-center gap-4 p-2">
                        <VehicleList
                            promise={data}
                        />
                    </div>

                </main>
            </div>

        </div>

    )
}