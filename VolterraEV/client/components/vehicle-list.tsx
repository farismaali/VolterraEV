"use client"
import {use, useState} from "react";
import {Vehicle} from "@/components/vehicle";

const VehicleList = ({promise}:Promise<any>)=> {
const data = use(promise);
const [vehicles, setVehicles]= useState(data);
console.log(vehicles);
    return (
        <>
            {vehicles.map((vehicle) => {
                return <Vehicle key={vehicle.vid} vehicle={vehicle}/>
            })}
        </>
    );
}

export default VehicleList;