"use client";

import { useState } from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react";

export const Footer = () => {
    const [email, setEmail] = useState('');
    const [isSubscribing, setIsSubscribing] = useState(false);

    const handleSubscribe = async (e) => {
        e.preventDefault();
        if (!email) return;
        
        setIsSubscribing(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setEmail('');
        setIsSubscribing(false);
    };

    return (
        <footer className="bg-[#06324a] text-white">
            <div className="max-w-7xl mx-auto px-4 py-12">
                {/* Top Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
                    {/* Brand */}
                    <div>
                        <img
                            src="/logo.png" // replace with your logo path
                            alt="Alpha Fulfill"
                            className="h-12 mb-4"
                        />
                        <p className="text-sm text-white/80 leading-relaxed max-w-xs">
                            Aveoxa is where innovation meets everyday style. Designed for the
                            modern man, Aveoxa brings a fresh wave of smart, stylish, and
                            performance-driven T-shirts that elevate confidence with every wear.
                        </p>
                    </div>

                    {/* Information */}
                    <div>
                        <h4 className="font-semibold mb-4">INFORMATION</h4>
                        <ul className="space-y-2 text-sm text-white/80">
                            <li>
                                <Link href="/" className="hover:text-white">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link href="/best-sellers" className="hover:text-white">
                                    Best Sellers
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Policies */}
                    <div>
                        <h4 className="font-semibold mb-4">POLICIES</h4>
                        <ul className="space-y-2 text-sm text-white/80">
                            <li>
                                <Link href="/search" className="hover:text-white">
                                    Search
                                </Link>
                            </li>
                            <li>
                                <Link href="/return-refund" className="hover:text-white">
                                    Return & Refund Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="/shipping-policy" className="hover:text-white">
                                    Shipping Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="/terms-conditions" className="hover:text-white">
                                    Terms & Conditions
                                </Link>
                            </li>
                            <li>
                                <Link href="/privacy-policy" className="hover:text-white">
                                    Privacy Policy
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h4 className="font-semibold mb-4">NEWSLETTER</h4>
                        <p className="text-sm text-white/80 mb-4">
                            Signup to get latest offers and discounts in your mailbox
                        </p>
                        <form onSubmit={handleSubscribe}>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                required
                                disabled={isSubscribing}
                                className="w-full px-3 py-2 text-sm text-black rounded mb-3 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                            />
                            <button 
                                type="submit"
                                disabled={isSubscribing || !email}
                                className="w-full bg-white text-black text-sm py-2 rounded hover:bg-gray-200 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {isSubscribing ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        Subscribing...
                                    </>
                                ) : (
                                    'Subscribe'
                                )}
                            </button>
                        </form>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-white/20 mt-10 pt-6">
                    <p className="text-center text-sm text-white/70">
                        © 2025 Copyright By AVEOXA . All Rights Reserved!
                    </p>
                </div>
            </div>
        </footer>
    );
};
