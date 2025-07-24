import React from 'react';
import { Zap, Loader2 } from 'lucide-react';

export default function VehicleLoadingPage() {
    return (
        <div className="w-full min-h-screen  flex mt-20 justify-center">
            <div className="text-center space-y-8">
                <div className="space-y-4">
                    <div className="flex items-center justify-center space-x-3">
                        <Zap className="w-20 h-20 " />
                        <h1 className="text-2xl font-semibold ">VolterraEV</h1>
                    </div>
                </div>

                <div className="flex flex-col items-center space-y-4">
                    <Loader2 className="w-8 h-8 animate-spin" />
                    <p className=" text-sm">Loading vehicles...</p>
                </div>
            </div>
        </div>
    );
}