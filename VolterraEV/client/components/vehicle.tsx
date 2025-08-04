"use client"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Calendar, AlertTriangle } from "lucide-react"
import Image from "next/image"
import { useState } from "react";
import AccidentModal from "@/components/accident-modal";
import { signOut } from "next-auth/react";
import { addToCart } from "@/lib/cartApi";
import { useSession } from "next-auth/react";


export function Vehicle({ vehicle, session }) {
    const handleAddToCart = async () => {
        console.log("Added to cart:", vehicle.vid)
        console.log(session)
        if (status === "loading") return;

        const userId = session?.user?.id;

        if (!userId) {
            console.error("Invalid userId in session: ", session?.user);
            alert("You must be logged in to add to cart.");
            return;
        }

        try {
            await addToCart(userId, vehicle.vid, 1);
            alert("Vehicle added to cart!");
        } catch (error) {
            console.error("Failed to add to cart", error);
            alert("Something went wrong.");
        }
    }

    return (
        <div className="flex justify-center w-4xl p-6">
            <Card className="w-full border-2 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                        <div>
                            <CardTitle className="text-xl font-bold">
                                {vehicle.year} {vehicle.brand} {vehicle.model}
                            </CardTitle>
                            <CardDescription className="text-sm mt-1">
                                {vehicle.description}
                            </CardDescription>
                        </div>
                        <Badge variant="outline" className="text-xs font-medium px-2 py-1">
                            {vehicle.shape}
                        </Badge>
                    </div>
                </CardHeader>

                <CardContent className="space-y-3">
                    <div className="flex items-center justify-center py-2 border-t border-b">
                        <span className="text-2xl font-bold text-green-600">
                            ${vehicle.price.toLocaleString()}
                        </span>
                    </div>


                    <div className={"flex w-full justify-center"}>
                        <Image
                            className={"border p-1"}
                            src={"/supra.jpg"}
                            alt={`${vehicle.year} ${vehicle.brand} ${vehicle.model}`}
                            width={350}
                            height={300}
                        />
                    </div>
                </CardContent>

                <CardFooter className="flex gap-3 pt-3 border-t">
                    <AccidentModal
                        trigger={
                            <Button variant="outline" className="flex-1 h-8 text-sm">
                                View Details
                            </Button>
                        }
                        accidents={vehicle.accidentHistories}
                    />
                    <Button
                        onClick={handleAddToCart}
                        className="flex-1 h-8 flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-sm"
                    >
                        <ShoppingCart className="w-3 h-3" />
                        Add to Cart
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}