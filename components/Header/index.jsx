"use client";

import { useEffect, useState } from "react";
import { Search, Heart, ShoppingBag, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Navbar = () => {
    const [open, setOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        setOpen(false);
    }, [pathname]);

    return (
        <>
            <header className="fixed  top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
                <div className="w-full bg-[#0a2f45] text-white">
                    <div className="container mx-auto px-3 sm:px-4">
                        <div className="flex items-center justify-between h-8 sm:h-10">
                            <p className="text-xs sm:text-sm font-medium tracking-wide">
                                Free shipping on orders over Rs.500
                            </p>
                        </div>
                    </div>
                </div>

                <div className="container mx-auto px-3 sm:px-4">
                    <div className="flex items-center justify-between h-14 sm:h-16 md:h-20">
                        <Link href="/" className="flex items-center gap-3">
                            <img
                                src="/logo.png"
                                alt="Alpha Fulfill logo"
                                className="h-50 w-auto object-contain"
                            />
                        </Link>
                        <nav className="hidden md:flex items-center gap-6 lg:gap-8">
                            <Link href={"/"} className="text-sm font-medium text-black">Home</Link>
                            <Link href="/best-seller" className="text-sm font-medium text-gray-500">
                                Best Sellers
                            </Link>
                        </nav>

                        {/* Desktop Actions */}
                        <div className="hidden md:flex items-center gap-3 lg:gap-4">
                            <div className="p-2 rounded-full hover:bg-gray-100 cursor-pointer">
                                <Search size={18} />
                            </div>

                            <div className="relative p-2 rounded-full hover:bg-gray-100 cursor-pointer">
                                <Heart size={18} />
                            </div>

                            <div className="relative p-2 rounded-full hover:bg-gray-100 cursor-pointer">
                                <ShoppingBag size={18} />
                            </div>
                        </div>

                        {/* Mobile Actions */}
                        <div className="flex md:hidden items-center gap-2">

                            <button
                                onClick={() => setOpen(true)}
                                className="p-2 rounded-full hover:bg-gray-100"
                                aria-label="Open menu"
                            >
                                <Menu size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            </header >

            {/* OVERLAY */}
            {
                open && (
                    <div
                        className="fixed inset-0 backdrop-blur-sm bg-black/40 z-40 md:hidden"
                        onClick={() => setOpen(false)}
                    />
                )
            }

            {/* MOBILE DRAWER */}
            <div
                className={`fixed top-0 left-0 h-full w-[85%] max-w-sm bg-white z-50 transform transition-transform duration-300 md:hidden
        ${open ? "translate-x-0" : "-translate-x-full"}`}
            >
                {/* Drawer Header */}
                <div className="flex items-center justify-between px-4 h-16 border-b">
                    <span className="font-bold text-lg">Menu</span>
                    <button onClick={() => setOpen(false)}>
                        <X size={22} />
                    </button>
                </div>

                {/* Drawer Content */}
                <div className="p-4 space-y-6">

                    {/* Nav Links */}
                    <div className="flex flex-col space-y-3">
                        <Link href={"/"} className="text-base font-medium">Home</Link>
                        <Link href={"/best-seller"} className="text-base font-medium">Best Sellers</Link>
                    </div>
                </div>
            </div>
        </>
    );
};
