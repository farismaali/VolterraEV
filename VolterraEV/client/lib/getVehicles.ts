const getVehicles = async (token:string) => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    const response = await fetch("http://localhost:8080/api/vehicles", {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    });

    if (!response.ok) {
        throw new Error("Could not get vehicles");
    }

    return await response.json();
};

export default getVehicles;
