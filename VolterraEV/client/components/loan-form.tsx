"use client"
import { useState } from "react"
import { toast } from "sonner"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import {CardFooter} from "@/components/ui/card";

const formSchema = z.object({
    amount: z.coerce.number().min(1, "Loan amount must be greater than 0"),
    downPayment: z.coerce.number().min(0, "Down payment cannot be negative"),
    term: z.number().min(1, "Term must be at least 1 month").max(360, "Term cannot exceed 360 months"),
    interestRate: z.coerce.number().min(0, "Interest rate cannot be negative").max(50, "Interest rate cannot exceed 50%").optional()
});

type FormData = z.infer<typeof formSchema>;


export default function LoanForm({session, vehicle}) {
    const accessToken = session.user.accessToken
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<number | null>(null);

    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            amount: 0,
            downPayment: 0,
            term: 12,
            interestRate: 13.0
        }
    });

    async function onSubmit(values: FormData) {
        setIsLoading(true);
        try {
            const response = await fetch("http://localhost:8080/api/vehicles/loan", {
                method: "POST",
                headers : {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${accessToken}`
                },
                body: JSON.stringify(values)
            })
            if (!response.ok) {
                throw new Error("Failed to fetch loan")
            }
            const data = await response.json();
            setResult(data)
        } catch (error) {
            console.error("Form submission error", error);
            toast.error("Failed to calculate loan. Please try again.");
        } finally {
            setIsLoading(false);
        }
    }

    const watchedValues = form.watch();
    const remainingAmount = (watchedValues.amount || 0) - (watchedValues.downPayment || 0);

    return (
        <div className="max-w-3xl mx-auto py-10 space-y-8">
            <div className="text-center">
                <h1 className="text-3xl font-bold">Loan Calculator</h1>
                <p className="text-gray-600 mt-2">Calculate your monthly loan payments</p>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                        control={form.control}
                        name="amount"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Loan Amount ($)</FormLabel>
                                <FormControl>
                                    <Input
                                        defaultValue={vehicle.price}
                                        type="number"
                                        step="100"
                                        {...field}
                                        onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                                    />
                                </FormControl>
                                <FormDescription>
                                    The total amount you want to borrow.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="downPayment"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Down Payment ($)</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="20000"
                                        type="number"
                                        step="0.01"
                                        {...field}
                                        onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                                    />
                                </FormControl>
                                <FormDescription>
                                    Amount paid upfront. Remaining to finance: ${remainingAmount.toLocaleString()}
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="interestRate"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Annual Interest Rate (%)</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="13.0"
                                        type="number"
                                        step="1"
                                        {...field}
                                        onChange={(e) => field.onChange(parseFloat(e.target.value) || 13.0)}
                                    />
                                </FormControl>
                                <FormDescription>
                                    Annual interest rate (leave empty for default 13%).
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="term"
                        render={({ field: { value, onChange } }) => (
                            <FormItem>
                                <FormLabel>Loan Term - {value} months ({Math.round(value / 12 * 10) / 10} years)</FormLabel>
                                <FormControl>
                                    <Slider
                                        min={6}
                                        max={72}
                                        step={6}
                                        value={[value]}
                                        onValueChange={(vals) => {
                                            onChange(vals[0]);
                                        }}
                                        className="w-full"
                                    />
                                </FormControl>
                                <FormDescription>
                                    Loan term in months (6 months to 30 years).
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? "Calculating..." : "Calculate Loan"}
                    </Button>
                </form>
            </Form>
            { result &&
                <CardFooter>
                    <h1 className={"text-lg font-bold"}>Your monthly payments are: <span className={"text-blue-500"}> {result.toFixed(2)} </span> </h1>
                </CardFooter>
            }

        </div>
    );
}