import { Truck, CreditCard, ShieldCheck } from "lucide-react";

const features = [
    {
        icon: Truck,
        title: "FREE SHIPPING",
    },
    {
        icon: CreditCard,
        title: "COD AVAILABLE",
    },
    {
        icon: ShieldCheck,
        title: "100% SECURED PAYMENT",
    },
];

export const Features = () => {
    return (
        <section className="bg-white">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3">
                    {features.map((item, index) => (
                        <div
                            key={item.title}
                            className={`flex flex-col items-center justify-center py-10 gap-3
                ${index !== features.length - 1 ? "md:border-r" : ""}
              `}
                        >
                            <item.icon className="w-8 h-8 text-black" />

                            <p className="text-sm font-semibold tracking-wide text-black">
                                {item.title}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};


