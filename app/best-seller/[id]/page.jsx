'use client';

import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { Heart, Share2, Eye, Loader2 } from "lucide-react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import OrderModal from "@/components/OrderModal";
import { trackFacebookEvent } from "@/components/FacebookPixel";
import { products, getProductByHandle, getPrice, getCompareAtPrice, getAvailableSizes, getVariantBySize } from "@/lib/products";

import "swiper/css";
import "swiper/css/navigation";

const ProductDetails = () => {
    const ctaRef = useRef(null);
    const [showStickyCTA, setShowStickyCTA] = useState(false);
    const params = useParams();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const [selectedSize, setSelectedSize] = useState(null);
    const [isWishlistLoading, setIsWishlistLoading] = useState(false);
    const [isShareLoading, setIsShareLoading] = useState(false);

    // Get product by handle
    const product = getProductByHandle(params?.id);

    // Early return after hooks - but we'll handle it in render instead
    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
                    <p className="text-gray-600">The product you're looking for doesn't exist.</p>
                </div>
            </div>
        );
    }

    const productName = product.title;
    const productPrice = selectedSize ? (getVariantBySize(product, selectedSize)?.price || getPrice(product)) : getPrice(product);
    const productId = product.handle;
    const compareAtPrice = getCompareAtPrice(product);
    const availableSizes = getAvailableSizes(product);
    const sortedImages = product.images ? [...product.images].sort((a, b) => a.position - b.position) : [];

    const handleDecreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const handleIncreaseQuantity = () => {
        setQuantity(quantity + 1);
    };

    // Set default selected size (28 if available, otherwise first size)
    useEffect(() => {
        if (!selectedSize && availableSizes.length > 0) {
            const defaultSize = availableSizes.includes(28) ? 28 : availableSizes[0];
            setSelectedSize(defaultSize);
        }
    }, [availableSizes, selectedSize]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setShowStickyCTA(!entry.isIntersecting);
            },
            {
                threshold: 0.1,
            }
        );

        if (ctaRef.current) {
            observer.observe(ctaRef.current);
        }

        return () => {
            if (ctaRef.current) observer.unobserve(ctaRef.current);
        };
    }, []);

    const deliveryDate = () => {
        const d = new Date();
        const e = new Date(d);
        e.setDate(d.getDate() + 6);

        return `${d.toLocaleString("en-US", { month: "short", day: "numeric" })} – ${e.toLocaleString("en-US", { month: "short", day: "numeric" })}`;
    };
    return (
        <div className="h-full bg-white">
            <OrderModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                productName={productName}
                productPrice={productPrice}
                productId={productId}
                quantity={quantity}
                selectedSize={selectedSize}
                productImage={sortedImages[0]?.src}
            />

            <div className="pt-2 sm:pt-4 pb-8 sm:pb-16">
                <div className="container mx-auto px-4 sm:px-6">
                    <p className="text-xs sm:text-sm text-muted-foreground mb-4 sm:mb-6">
                        Home / Best Sellers / {productName}
                    </p>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-10">
                        <div className="space-y-4">
                            {sortedImages.length > 0 && (
                                <Swiper
                                    modules={[Navigation]}
                                    navigation
                                    spaceBetween={12}
                                    className="rounded-lg overflow-hidden"
                                >
                                    {sortedImages.map((img, index) => (
                                        <SwiperSlide key={index}>
                                            <img
                                                src={img.src}
                                                alt={`${product.title} - Image ${index + 1}`}
                                                className="w-full max-h-[520px] object-contain bg-white"
                                            />
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            )}

                            {sortedImages.length > 1 && (
                                <div className="hidden lg:grid grid-cols-4 gap-3">
                                    {sortedImages.slice(0, 8).map((img, index) => (
                                        <div
                                            key={index}
                                            className="border rounded-md overflow-hidden bg-gray-50"
                                        >
                                            <img
                                                src={img.src}
                                                alt={`${product.title} thumbnail ${index + 1}`}
                                                className="w-full h-20 object-cover"
                                            />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div>
                            <h1 className="text-xl sm:text-2xl font-semibold mb-2">
                                {productName}
                            </h1>
                            <div className="flex items-center gap-3 mb-3">
                                {compareAtPrice && (
                                    <span className="line-through text-gray-400 text-sm sm:text-base">
                                        Rs. {compareAtPrice.toLocaleString('en-IN')}
                                    </span>
                                )}
                                <span className="text-xl sm:text-2xl font-bold text-green-600">
                                    Rs. {productPrice.toLocaleString('en-IN')}
                                </span>
                            </div>

                            <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                                <Eye className="w-4 h-4" />
                                12 people are viewing this right now
                            </div>

                            {availableSizes.length > 0 && (
                                <div className="mb-6">
                                    <p className="font-medium mb-2">SIZE</p>
                                    <div className="flex flex-wrap gap-2">
                                        {availableSizes.map((size) => {
                                            const variant = getVariantBySize(product, size);
                                            const isInStock = variant && variant.inventoryQty > 0;

                                            return (
                                                <button
                                                    key={size}
                                                    onClick={() => isInStock && setSelectedSize(size)}
                                                    disabled={!isInStock}
                                                    className={`border px-3 py-1 text-sm hover:border-black transition disabled:opacity-50 disabled:cursor-not-allowed ${selectedSize === size
                                                        ? "border-black bg-black text-white"
                                                        : isInStock
                                                            ? ""
                                                            : "opacity-50 cursor-not-allowed"
                                                        }`}
                                                    title={!isInStock ? "Out of stock" : ""}
                                                >
                                                    {size}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}

                            <div className="flex items-center gap-4 mb-6">
                                <div className="flex items-center border">
                                    <button
                                        onClick={handleDecreaseQuantity}
                                        disabled={quantity <= 1}
                                        className="px-3 py-1 hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        -
                                    </button>
                                    <span className="px-4">{quantity}</span>
                                    <button
                                        onClick={handleIncreaseQuantity}
                                        className="px-3 py-1 hover:bg-gray-100 transition"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>

                            {/* CTA */}
                            <button
                                ref={ctaRef}
                                onClick={() => {
                                    setIsModalOpen(true);
                                    trackFacebookEvent('InitiateCheckout', {
                                        content_name: productName,
                                        content_ids: [productId],
                                        content_type: 'product',
                                        value: productPrice,
                                        currency: 'INR',
                                        num_items: quantity,
                                    });
                                }}
                                disabled={!selectedSize}
                                className="w-full bg-black text-white py-3 font-medium mb-4 hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                            >
                                🔒 Order Now – Cash on Delivery
                            </button>

                            {/* Delivery */}
                            <p className="mt-4 text-sm text-gray-600">
                                Estimated Delivery: <strong>{deliveryDate()}</strong>
                            </p>
                        </div>
                    </div>

                    {/* Description */}
                    {product.descriptionHtml && (
                        <div className="mt-8 sm:mt-16 max-w-5xl mx-auto">
                            <h2 className="text-lg sm:text-xl font-semibold text-center mb-4 sm:mb-6">
                                Product Description
                            </h2>
                            <div
                                className="text-center text-sm text-gray-600 leading-relaxed"
                                dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
                            />
                        </div>
                    )}

                    {/* Product Photos Gallery */}
                    {product.images && product.images.length > 0 && (
                        <div className="mt-8 sm:mt-16 max-w-6xl mx-auto">
                            <h2 className="text-lg sm:text-xl font-semibold text-center mb-6 sm:mb-8">
                                Product Photos
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                                {product.images
                                    .sort((a, b) => a.position - b.position)
                                    .map((img, index) => (
                                        <div
                                            key={index}
                                            className="relative bg-gray-100 overflow-hidden rounded-lg group cursor-pointer"
                                        >
                                            <img
                                                src={img.src}
                                                alt={`${product.title} - Photo ${index + 1}`}
                                                className="w-full h-[300px] sm:h-[350px] object-cover group-hover:scale-105 transition duration-300"
                                            />
                                        </div>
                                    ))}
                            </div>
                        </div>
                    )}
                    {showStickyCTA && (
                        <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t
                  px-4 py-3 sm:hidden">
                            <button
                                onClick={() => setIsModalOpen(true)}
                                disabled={!selectedSize}
                                className="w-full bg-black text-white py-3 font-medium
                 hover:bg-gray-800 transition disabled:opacity-50
                 disabled:cursor-not-allowed text-sm"
                            >
                                🔒 Order Now – Cash on Delivery
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
