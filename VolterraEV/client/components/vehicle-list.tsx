"use client"
import { use, useState } from "react";
import { Vehicle } from "@/components/vehicle";
import { Button } from "@/components/ui/button";

type paramOptions = {
    brand: string,
    model: string,
    year: number,
    shape: string,
    isHotDeal: boolean | null,
    sortBy?: string;
    sortOrder?: string;
}
const VehicleList = ({ promise }: Promise<any>) => {
    const initialParams = { brand: "", isHotDeal: null, model: "", shape: "", year: 0, sortBy: "", sortOrder: "asc" }
    const data = use(promise);
    const [vehicles, setVehicles] = useState(data);
    const [params, setParams] = useState<paramOptions>(initialParams);

    const handleFilter = async () => {
        const query = new URLSearchParams();

        if (params.brand.trim()) query.append("brand", params.brand);
        if (params.model.trim()) query.append("model", params.model);
        if (params.shape.trim()) query.append("shape", params.shape);
        if (params.year !== 0) query.append("year", params.year.toString());
        if (params.isHotDeal !== null) query.append("isHotDeal", params.isHotDeal.toString());
        if (params.sortBy) query.append("sortBy", params.sortBy);
        if (params.sortOrder) query.append("sortOrder", params.sortOrder);
        console.log("query", query.toString());
        const response = await fetch(`http://localhost:8080/api/vehicles/filter?${query.toString()}`);

        if (!response.ok) {
            throw new Error(response.statusText);
        }

        const data = await response.json();
        setVehicles(data);
    };

    const handleReset = async () => {
        setParams(initialParams);
        const response = await fetch(`http://localhost:8080/api/vehicles`)
        if (!response.ok) {
            throw new Error(response.statusText);
        }

        const data = await response.json();
        setVehicles(data);
    }

    return (
        <>
            <div className="w-full p-3  rounded-md shadow mb-4">
                <div className="flex flex-wrap justify-center gap-3">
                    <div className="flex flex-col items-start">
                        <label className="text-xs text-gray-600 mb-1">Brand</label>
                        <input
                            value={params.brand}
                            placeholder="Toyota"
                            className="px-2 py-1 border rounded text-sm w-28"
                            onChange={(e) => setParams(prev => ({ ...prev, brand: e.target.value }))}
                        />
                    </div>

                    <div className="flex flex-col items-start">
                        <label className="text-xs text-gray-600 mb-1">Model</label>
                        <input
                            value={params.model}
                            placeholder="Camry"
                            className="px-2 py-1 border rounded text-sm w-28"
                            onChange={(e) => setParams(prev => ({ ...prev, model: e.target.value }))}
                        />
                    </div>

                    <div className="flex flex-col items-start">
                        <label className="text-xs text-gray-600 mb-1">Year</label>
                        <input
                            type="number"
                            placeholder="2025"
                            min={1900}
                            max={2026}
                            defaultValue={2025}
                            className="px-2 py-1 border rounded text-sm w-24"
                            onChange={(e) => setParams(prev => ({ ...prev, year: Number(e.target.value) }))}
                        />
                    </div>

                    <div className="flex flex-col items-start">
                        <label className="text-xs text-gray-600 mb-1">Shape</label>
                        <input
                            value={params.shape}
                            placeholder="SEDAN"
                            className="px-2 py-1 border rounded text-sm w-28"
                            onChange={(e) => setParams(prev => ({ ...prev, shape: (e.target.value) }))}
                        />
                    </div>

                    <div className="flex items-center gap-1 mt-5">
                        <input
                            checked={params.isHotDeal == null ? false : params.isHotDeal}
                            type="checkbox"
                            onChange={(e) => setParams(prev => ({ ...prev, isHotDeal: e.target.checked }))}
                            className="w-3 h-3"
                        />
                        <label className="text-xs text-gray-600">Hot Deal?</label>
                    </div>

                    <div className="flex flex-col items-start">
                        <label className="text-xs text-gray-600 mb-1">Sort By</label>
                        <select
                            className="px-2 py-1 border rounded text-sm w-28"
                            onChange={(e) => setParams(prev => ({ ...prev, sortBy: e.target.value }))}
                        >
                            <option value="">None</option>
                            <option value="price">Price</option>
                            <option value="mileage">Mileage</option>
                        </select>
                    </div>

                    <div className="flex flex-col items-start">
                        <label className="text-xs text-gray-600 mb-1">Sort Order</label>
                        <select
                            className="px-2 py-1 border rounded text-sm w-28"
                            onChange={(e) => setParams(prev => ({ ...prev, sortOrder: e.target.value }))}
                        >
                            <option value="asc">Low-High</option>
                            <option value="desc">High-Low</option>
                        </select>
                    </div>
                </div>
            </div>



            <div className={"flex gap-x-2 items-center justify-center"}>
                <Button onClick={handleFilter}>Filter</Button>
                <a className={"text-sm hover:cursor-pointer hover:opacity-80"} onClick={handleReset}>reset</a>
            </div>

            {vehicles.map((vehicle) => {
                return <Vehicle key={vehicle.vid} vehicle={vehicle} />
            })}
        </>
    );
}

export default VehicleList;