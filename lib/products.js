export const products = [
  {
    handle: "Solar-Clip-Light",
    title: "☀️Solar Clip Light With Motion Sensor🏡 (BUY 1 GET 1 FREE)",
    vendor: "Alphaa Lifestylem",
    category: "Apparel & Accessories > Solar Clip Light",
    descriptionHtml: "<p>✨ Fastest Delivery! 2-5 Days </p><p>✨  No Delays </p><p>✨ Trusted by Google</p>",
    images: [
      {
        src: "/product1-1.webp",
        position: 1
      },
      {
        src: "/product1-2.webp",
        position: 2
      },
      {
        src: "/product1-3.webp",
        position: 3
      },
      {
        src: "/product1-4.gif",
        position: 4
      },
      {
        src: "/product1-5.gif",
        position: 5
      },
    ],
    variants: [
      {
        price: 699,
        compareAtPrice: 999,
        inventoryQty: 100
      },
    ],
    status: "active"
  },
  {
    handle: "New-Fashion-Leather-Beret",
    title: "New Fashion Leather Beret (BUY 1 GET 1 FREE)",
    vendor: "Alphaa Lifestylem",
    category: "Apparel & Accessories > Leather Beret",
    descriptionHtml: "<p>✨ PREMIUM MATERIAL</p><p>✨ CAPTURING FASHION FROM ALL ANGLES</p><p>✨ FASHION FROM EXQUISITE DETAILS</p><p>✨ PERFECT FOR EVERY MOMENT</p><p>✨ PERFECT GIFT FOR A FASHIONISTA</p>",
    images: [
      {
        src: "/product2-1.jpg",
        position: 1
      },
      {
        src: "/product2-2.jpg",
        position: 2
      },
      {
        src: "/product2-3.jpg",
        position: 3
      },
      {
        src: "/product2-4.jpg",
        position: 4
      },
      {
        src: "/product2-5.jpg",
        position: 5
      },
      {
        src: "/product2-6.jpg",
        position: 6
      },
      {
        src: "/product2-7.jpg",
        position: 7
      },
       {
        src: "/product2-8.jpg",
        position: 8
      }
    ],
    variants: [
      {
        option1: 'Black',
        option2: null,
        option3: null,
        price: 699,
        compareAtPrice: 999,
        sku: null,
        inventoryQty: 100
      },
      {
        option1: "Dark Brown",
        option2: null,
        option3: null,
        price: 699,
        compareAtPrice: 999,
        sku: null,
        inventoryQty: 80
      },
      {
        option1: "Light Brown",
        option2: null,
        option3: null,
        price: 699,
        compareAtPrice: 999,
        sku: null,
        inventoryQty: 75
      },
      {
        option1: "Black + Dark Brown",
        option2: null,
        option3: null,
        price: 699,
        compareAtPrice: 999,
        sku: null,
        inventoryQty: 60
      },
      {
        option1: "Black + Light Brown",
        option2: null,
        option3: null,
        price: 699,
        compareAtPrice: 999,
        sku: null,
        inventoryQty: 50
      },
      {
        option1: "Dark Brown + Light Brown",
        option2: null,
        option3: null,
        price: 699,
        compareAtPrice: 999,
        sku: null,
        inventoryQty: 40
      }
    ],
    status: "active"
  },
];

export const getProductByHandle = (handle) => {
  return products.find(product => product.handle === handle);
};

export const getMainImage = (product) => {
  if (!product || !product.images || product.images.length === 0) {
    return null;
  }
  const sortedImages = [...product.images].sort((a, b) => a.position - b.position);
  return sortedImages[0].src;
};

export const getPrice = (product) => {
  if (!product || !product.variants || product.variants.length === 0) {
    return 0;
  }
  return Math.min(...product.variants.map(v => v.price));
};

export const getCompareAtPrice = (product) => {
  if (!product || !product.variants || product.variants.length === 0) {
    return null;
  }
  const variantWithCompare = product.variants.find(v => v.compareAtPrice);
  return variantWithCompare ? variantWithCompare.compareAtPrice : null;
};

export const calculateDiscount = (price, compareAtPrice) => {
  if (!compareAtPrice || compareAtPrice <= price) {
    return null;
  }
  const discount = ((compareAtPrice - price) / compareAtPrice) * 100;
  return Math.round(discount);
};

export const getAvailableSizes = (product) => {
  if (!product || !product.variants) {
    return [];
  }
  const sizes = product.variants
    .map(v => v.option1)
    .filter((size, index, self) => self.indexOf(size) === index)
    .sort((a, b) => {
      if (typeof a === 'number' && typeof b === 'number') {
        return a - b;
      }
      return String(a).localeCompare(String(b));
    });
  return sizes;
};

export const getVariantBySize = (product, size) => {
  if (!product || !product.variants) {
    return null;
  }
  return product.variants.find(v => v.option1 === size);
};

export const isProductInStock = (product) => {
  if (!product || !product.variants) {
    return false;
  }
  return product.variants.some(v => v.inventoryQty > 0);
};

export const getTotalInventory = (product) => {
  if (!product || !product.variants) {
    return 0;
  }
  return product.variants.reduce((sum, v) => sum + (v.inventoryQty || 0), 0);
};

