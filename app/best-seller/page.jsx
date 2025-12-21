import Link from "next/link";
import { products, getMainImage, getPrice, getCompareAtPrice, calculateDiscount, getTotalInventory } from "@/lib/products";

export default function BestSellersPage() {
    return (
        <section className="bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10">

                {/* Breadcrumb */}
                <nav className="text-sm text-gray-500 mb-6">
                    <span>Home</span>
                    <span className="mx-2">›</span>
                    <span className="text-gray-800">Best Sellers</span>
                </nav>

                <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
                    {/* Sidebar */}
                    <aside className="lg:w-64 lg:shrink-0 text-sm space-y-4 sm:space-y-6">
                        <div>
                            <h3 className="font-medium mb-2">Collection</h3>
                            <p className="text-gray-600">Best Sellers</p>
                        </div>

                        <div>
                            <h3 className="font-medium mb-2">Availability</h3>
                            <label className="flex gap-2 items-center">
                                <input type="checkbox" /> In stock ({products.filter(p => p.status === 'active').length})
                            </label>
                            <label className="flex gap-2 items-center text-gray-400">
                                <input type="checkbox" disabled /> Out of stock (0)
                            </label>
                        </div>

                        <div>
                            <h3 className="font-medium mb-2">Price</h3>
                            <input type="range" className="w-full" />
                            <div className="flex justify-between text-gray-500 mt-1">
                                <span>₹0</span>
                                <span>₹999</span>
                            </div>
                        </div>

                        <div>
                            <h3 className="font-medium mb-2">Recently Viewed</h3>
                            {products.length > 0 && (() => {
                                const firstProduct = products[0];
                                const mainImage = getMainImage(firstProduct);
                                const price = getPrice(firstProduct);
                                return (
                                    <div className="flex gap-3">
                                        {mainImage && (
                                            <img
                                                src={mainImage}
                                                alt={firstProduct.title}
                                                className="w-12 h-16 object-cover"
                                            />
                                        )}
                                        <div>
                                            <p className="text-xs line-clamp-2">
                                                {firstProduct.title}
                                            </p>
                                            <p className="text-teal-600 font-medium">
                                                Rs. {price.toLocaleString('en-IN')}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })()}
                        </div>
                    </aside>

                    {/* Products */}
                    <div className="flex-1">
                        {/* Header */}
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                            <h1 className="text-xl sm:text-2xl font-semibold">
                                Best Sellers <span className="text-xs sm:text-sm text-gray-500">({products.filter(p => p.status === 'active').length})</span>
                            </h1>

                            <select className="border px-3 py-1.5 text-sm rounded w-full sm:w-auto">
                                <option>Featured</option>
                                <option>Price: Low to High</option>
                                <option>Price: High to Low</option>
                            </select>
                        </div>

                        {/* Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                            {products.filter(p => p.status === 'active').map((product) => {
                                const mainImage = getMainImage(product);
                                const price = getPrice(product);
                                const compareAtPrice = getCompareAtPrice(product);
                                const discount = calculateDiscount(price, compareAtPrice);
                                
                                return (
                                    <Link
                                        href={`/best-seller/${product.handle}`}
                                        key={product.handle}
                                        className="group"
                                    >
                                        <div className="relative bg-gray-100 overflow-hidden">
                                            {discount && (
                                                <span className="absolute top-2 left-2 bg-orange-500 text-white text-xs px-2 py-0.5 z-10">
                                                    -{discount}%
                                                </span>
                                            )}

                                            {/* Hover Icons */}
                                            <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition">
                                                <button className="w-9 h-9 bg-white rounded-full shadow">
                                                    ♡
                                                </button>
                                                <button className="w-9 h-9 bg-white rounded-full shadow">
                                                    👁
                                                </button>
                                            </div>

                                            {mainImage && (
                                                <img
                                                    src={mainImage}
                                                    alt={product.title}
                                                    className="w-full h-[280px] object-cover group-hover:scale-105 transition"
                                                />
                                            )}
                                        </div>

                                        <div className="pt-3">
                                            <h3 className="text-sm line-clamp-2">
                                                {product.title}
                                            </h3>

                                            <div className="flex gap-2 mt-1">
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
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
