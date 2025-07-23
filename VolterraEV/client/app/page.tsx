"use client"

export default function Home() {
    const accessToken = localStorage.getItem('accessToken');
    console.log("Access Token in getVehicles():", accessToken);
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
          <div className={"flex flex-col"}>
              <h1> Welcome to VolterraEV</h1>
              <a className={"border-2 border-yellow-600 rounded-3xl hover:cursor-pointer hover:bg-yellow-600 transition-all duration-500 text-center"} href={"/auth/login"} >
                  Go to login page
              </a>

          </div>
      </main>
    </div>
  );
}
