export async function addToCart(userId: number, vehicleId: number, quantity = 1) {
    const response = await fetch("http://localhost:8080/api/cart/add", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, vehicleId }),
    });

    if (!response.ok) {
        throw new Error("Failed to add vehicle to cart");
    }

    return await response.json();
}
