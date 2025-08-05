"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { getCartItems, removeItemFromCart } from "@/lib/cartApi";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export default function CartPage() {
    const { data: session } = useSession();
    const [cartItems, setCartItems] = useState<any[]>([]);
    const [total, setTotal] = useState<number>(0);

    useEffect(() => {
        async function fetchCart() {
            const userId = session?.user?.id;
            if (!userId) return;

            const items = await getCartItems(userId);
            setCartItems(items);

            const calculatedTotal = items.reduce((acc: number, item: any) => {
                if (!item.vehicle || typeof item.vehicle.price !== "number") return acc;
                return acc + item.vehicle.price * item.quantity;
            }, 0);
            setTotal(calculatedTotal);
        }

        fetchCart();
    }, [session]);

    const handleRemove = async (userId: string, vehicleId: number) => {
        try {
            await removeItemFromCart(userId, vehicleId, 1);

            const updatedItems = cartItems.filter(item => item.vehicle.id !== vehicleId);
            setCartItems(updatedItems);

            const updatedTotal = updatedItems.reduce((acc: number, item: any) => {
                if (!item.vehicle || typeof item.vehicle.price !== "number") return acc;
                return acc + item.vehicle.price * item.quantity;
            }, 0);
            setTotal(updatedTotal);
        } catch (err) {
            console.error("Failed to remove item from cart", err);
        }
    };

    
    if (!session?.user?.id) {
        return <p className="p-6">Loading...</p>;
    }

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Your Shopping Cart</h1>

            {cartItems.length === 0 ? (
                <div className="space-y-4">
                    <p className="text-gray-600">Your cart is empty.</p>
                    <div className="mt-6">
                        <Link href="/dashboard">
                            <Button variant="outline">Back to Dashboard</Button>
                        </Link>
                    </div>
                </div>
            ) : (
                <div className="space-y-4">
                    {cartItems.map((item: any) => (
                        item?.vehicle && (
                            <div key={item.id} className="border p-4 rounded shadow flex justify-between items-center">
                                <div>
                                    <h2 className="text-xl font-semibold">
                                        {item.vehicle.year} {item.vehicle.brand} {item.vehicle.model}
                                    </h2>
                                    <p className="text-sm text-gray-500">Price: ${item.vehicle.price}</p>
                                    <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                                </div>
                                <Button
                                    onClick={() => handleRemove(session.user.id, item.vehicle.id)}
                                    variant="destructive"
                                    size="sm"
                                    className="transition duration-150 hover:brightness-110 hover:scale-[1.02]"
                                >
                                    Remove
                                </Button>
                            </div>
                        )
                    ))}
                    <div className="text-right mt-6">
                        <p className="text-xl font-bold">Total: ${total.toLocaleString()}</p>
                    </div>

                    <div className="flex justify-between mt-6">
                        <Link href="/dashboard">
                            <Button variant="outline">Back to Dashboard</Button>
                        </Link>
                        <Link href="/checkout">
                            <Button>Proceed to Checkout</Button>
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}
