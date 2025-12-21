"use client";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { products, getMainImage, getPrice, getCompareAtPrice, calculateDiscount } from "@/lib/products";

import "swiper/css";
import "swiper/css/navigation";

export const AllProducts = () => {
    return (
        <section className="py-14 md:py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4">
                <h2 className="text-2xl md:text-3xl font-semibold text-center mb-2">
                    All Products List
                </h2>

                <p className="text-center text-sm text-gray-600 mb-10">
                    Your Best Deal Awaits - Take the Leap Now
                </p>

                <Swiper
                    modules={[Navigation]}
                    navigation
                    spaceBetween={20}
                    slidesPerView={1}
                    breakpoints={{
                        424: { slidesPerView: 1 },
                        640: { slidesPerView: 2 },
                        768: { slidesPerView: 3 },
                        1024: { slidesPerView: 4 },
                    }}
                >
                    {products.filter(p => p.status === 'active').slice(0, 4).map((product) => {
                        const mainImage = getMainImage(product);
                        const price = getPrice(product);
                        const compareAtPrice = getCompareAtPrice(product);
                        const discount = calculateDiscount(price, compareAtPrice);
                        
                        return (
                            <SwiperSlide key={product.handle}>
                                <Link href={`/best-seller/${product.handle}`} className="group block">
                                    <div className="relative bg-gray-100 overflow-hidden">
                                        {discount && (
                                            <span className="absolute top-2 left-2 bg-orange-500 text-white text-xs px-2 py-0.5">
                                                -{discount}%
                                            </span>
                                        )}

                                        {mainImage && (
                                            <img
                                                src={mainImage}
                                                alt={product.title}
                                                className="w-full h-[260px] sm:h-[300px] object-cover group-hover:scale-105 transition"
                                            />
                                        )}
                                    </div>

                                    <div className="pt-3">
                                        <h3 className="text-sm font-medium line-clamp-2">
                                            {product.title}
                                        </h3>

                                        <div className="flex items-center gap-2 mt-1">
                                            {compareAtPrice && (
                                                <span className="text-sm text-gray-400 line-through">
                                                    Rs. {compareAtPrice.toLocaleString('en-IN')}
                                                </span>
                                            )}
                                            <span className="text-sm font-semibold text-teal-600">
                                                Rs. {price.toLocaleString('en-IN')}
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
            </div>
        </section>
    );
};
