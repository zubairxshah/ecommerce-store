'use client'

import { stat } from "fs"
import useBasketStore from "../store"
import { useAuth, useUser } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { useState } from "react"



export default function BasketPage(){
    const groupItems = useBasketStore((state) => state.getGroupedItems())
    const {isSignedIn} = useAuth();
    const {user} = useUser();
    const router = useRouter;

    const [isClient, setIsClient] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    if (groupItems.length === 0) {
        return(
            <div className="container mx-auto p-4 flex flex-col items-center justify-center min-h-[50vh]">
                <h1 className="text-2xl font-bold mv-6 text-gray-800">Your Basket</h1>
                <p className="text-gray-600 text-lg">Your basket is empty</p>
            </div>
        )
    } 
    console.log("Basket Content = ", groupItems)
    return(
        <div className="container mx-auto max-w-6xl p-4">
            <h1 className="text-2xl font-bold mb-4">Your Basket</h1>
        </div>
    )
    
}