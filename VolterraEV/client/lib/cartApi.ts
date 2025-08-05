export async function addToCart(userId: String, vehicleId: number, quantity: number = 1) {
    const response = await fetch("http://localhost:8080/api/cart/add", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, vehicleId, quantity }),
    });

    if (!response.ok) {
        throw new Error("Failed to add vehicle to cart");
    }

    return await response.json();
}

export async function getCartItems(userId: String) {
    const response = await fetch(`http://localhost:8080/api/cart/${userId}`);
    if (!response.ok) {
        throw new Error("Failed to fetch cart items");
    }
    return await response.json();
}

export async function removeItemFromCart(userId: string, vehicleId: number, quantity: number) {
    const body = { userId, vehicleId, quantity };

    const res = await fetch("http://localhost:8080/api/cart/remove", {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    });

    if (!res.ok) {
        const error = await res.text();
        console.error("Failed to remove item:", error);
        throw new Error("Failed to remove item from cart");
    }
}
