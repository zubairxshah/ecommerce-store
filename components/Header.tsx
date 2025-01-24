'use client'

import { ClerkLoaded, SignInButton, SignOutButton, UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import Form from "next/form"
import { PackageIcon, TrolleyIcon } from "@sanity/icons";
import { SignedIn } from "@clerk/clerk-react";
import useBasketStore from "@/app/(store)/store";

export default function Header() {
    const { user } = useUser();
    // console.log(user)
    const createClerkPasskey = async ()=>{
        await user?.createPasskey();
    }
    const itemCount = useBasketStore((state)=> 
        state.items.reduce((total, item)=>total + item.quantity, 0)
        )
    return (
        <header className="flex flex-wrap justify-between items-center px-4 py-2">
            <div className="w-full flex flex-wrap justify-between items-center">
            {/* Top row */}
            <Link href={"/"}
                className="text-3xl font-bold text-blue-500
        hover:opacity-50 
        cursor-pointer
        mx-auto
        sm:mx-8"
            >SportRentHub</Link>
            <Form action="/search"
                className="w-full sm:w-auto sm:flex-1 sm:mx-2 mt-2 sm:mt-0"    
            >
                <input type="text" 
                    name="query" 
                    placeholder="Search for products"
                    className="bg-gray-100 text-gray-800 px-4 py-2 rounded
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
                      border w-full max-w-4xl"
                    />
            </Form>

            <div className="flex items-center space-x-4 mt-4 sm:mt-0 flex-1 
            sm:flex-none">
                <Link href={"/cart"}
                    className="flex-1 relative flex justify-center sm:justify-start 
                    sm:flex-none items-center space-x-1 bg-blue-500 text-white 
                    font-bold py-2 px-4 rounded"
                >
                    <TrolleyIcon className="w-6 h-6" />
                    {/* Items count once global state is implemented */}
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full 
                    w-5 h-5 flex items-center justify-center text-xs">{itemCount}</span>
                </Link>
                {/* User Area */}
                <ClerkLoaded >
                    <SignedIn>
                        <Link href={"/orders"}
                            className="flex-1 sm:flex-none flex items-center space-x-1
                            bg-blue-500 hover:bg-blue-700 font-bold text-white py-2 px-4 rounded"
                        >
                            <PackageIcon className="w-6 h-6" />
                            <span>My Orders</span>
                            
                        </Link>
                </SignedIn>
                    {user ? (
                        <div className="flex items-center space-x-2">
                            <UserButton />
                            <div className="hidden sm:block space-x-2">
                                <p className="text-gray-400">Welcome Back</p>
                                <p className="font-bold">{user.fullName}</p>

                            </div>

                        </div>
                    ):
                    (
                        <SignInButton mode="modal" />
                    )}

                    {
                        user?.passkeys.length === 0 && (
                            <button onClick={createClerkPasskey}
                            className="bg-white hover:bg-blue-700 font-bold hover:text-white 
                            hover:animate-pulse text-blue-500 py-2 px-2 rounded text-sm"
                            >
                                Create Passkey!
                            </button>
                        )
                    }
                </ClerkLoaded>
            </div>
            </div>
        </header>
    );
}