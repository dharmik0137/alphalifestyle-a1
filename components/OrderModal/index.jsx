'use client';

import { useEffect, useState } from 'react';
import { X, Loader2 } from 'lucide-react';
import { ImProfile } from 'react-icons/im';
import { CgProfile } from 'react-icons/cg';
import { FaHashtag, FaLocationDot } from 'react-icons/fa6';
import { BsTelephoneFill } from 'react-icons/bs';
import { FaRegUserCircle } from 'react-icons/fa';
import { trackFacebookEvent } from '@/components/FacebookPixel';
import { useRouter } from 'next/navigation';

export default function OrderModal({
  isOpen,
  onClose,
  productName,
  productPrice,
  productId,
  quantity = 1,
  selectedSize,
  productImage,
}) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null); // global / API error
  const [success, setSuccess] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});

  const [formData, setFormData] = useState({
    name: '',
    number: '',
    address: '',
    landmark: '',
    state: '',
    pincode: '',
    city: '',
  });

  const shippingCost = 0;
  const states = [
    "Andhra Pradesh",
    "Chhattisgarh",
    "Delhi",
    "Goa",
    "Gujarat",
    "Himachal Pradesh",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Odisha",
    "Punjab",
    "Tamil Nadu",
    "Telangana",
    "Uttarakhand",
    "West Bengal"
  ];

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow || '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Enforce max 13 characters for mobile number
    let processedValue = value;
    if (name === 'number') {
      // Only allow digits and limit to 13 characters
      processedValue = value.replace(/\D/g, '').slice(0, 13);
    } else if (name === 'pincode') {
      // Only allow digits and limit to 6 characters
      processedValue = value.replace(/\D/g, '').slice(0, 6);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: processedValue,
    }));
    setError(null);
    setFieldErrors((prev) => ({
      ...prev,
      [name]: null,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('handleSubmit called'); // Debug log at the start
    
    setError(null);
    setFieldErrors({});
    setIsSubmitting(true);

    try {
      console.log('Starting validation'); // Debug log
      
      // Basic field values
      const { name, number, address } = formData;
      const trimmedName = name.trim();
      const trimmedAddress = address.trim();
      const trimmedNumber = number.trim();

      const englishOnlyRegex = /^[\x20-\x7E]+$/;

      const newErrors = {};

      if (!trimmedName || !englishOnlyRegex.test(trimmedName)) {
        newErrors.name = 'Please enter your name in English only.';
      }

      if (!trimmedAddress || !englishOnlyRegex.test(trimmedAddress)) {
        newErrors.address = 'Please enter your address in English only.';
      }

      // Address must contain at least 4 words
      const addressWordCount = trimmedAddress.split(/\s+/).filter(Boolean).length;
      if (addressWordCount < 4) {
        newErrors.address = 'Please enter a complete address with at least 4 words.';
      }

      // Mobile number: 10 to 13 digits (digits only)
      const mobileRegex = /^[0-9]{10,13}$/;
      if (!mobileRegex.test(trimmedNumber)) {
        newErrors.number = 'Mobile number must be between 10 and 13 digits.';
      }

      // PIN code: exactly 6 digits (digits only)
      const trimmedPincode = formData.pincode.trim();
      const pincodeRegex = /^[0-9]{6}$/;
      if (!pincodeRegex.test(trimmedPincode)) {
        newErrors.pincode = 'PIN code must be exactly 6 digits.';
      }

      // Check required fields
      if (!formData.state || !formData.state.trim()) {
        newErrors.state = 'Please select a state.';
      }

      if (!formData.city || !formData.city.trim()) {
        newErrors.city = 'Please enter a city.';
      }

      if (Object.keys(newErrors).length > 0) {
        console.log('Validation errors:', newErrors); // Debug log
        setFieldErrors(newErrors);
        setIsSubmitting(false);
        return;
      }

      if (!selectedSize) {
        console.log('No size selected'); // Debug log
        setError('Please select a size before placing your order.');
        setIsSubmitting(false);
        return;
      }

      console.log('Validation passed, preparing order data'); // Debug log

      // Calculate total price
      const totalPrice = productPrice * quantity;
      const totalAmount = totalPrice + shippingCost;

      // Prepare product details
      const productDetails = [
        {
          name: productName,
          quantity: quantity,
          price: productPrice,
          productId: productId,
          size: selectedSize,
        },
      ];

      // Prepare order data
      const orderData = {
        ...formData,
        size: selectedSize,
        productDetails,
        price: totalPrice,
        shipping: shippingCost,
      };

      // Debug: Log the order data being sent
      console.log('Order data being sent:', orderData);

      // Submit to API
      const response = await fetch('/api/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      // Check if response is JSON
      const contentType = response.headers.get('content-type');
      let data;

      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        // If not JSON, get text and try to parse error
        const text = await response.text();
        throw new Error(`Server returned non-JSON response: ${text.substring(0, 100)}`);
      }

      if (!response.ok) {
        const errorMessage = data.error || data.details || data.message || 'Failed to create order';
        console.error('Order creation error:', {
          status: response.status,
          statusText: response.statusText,
          data: data
        });
        throw new Error(errorMessage);
      }

      console.log('Order created successfully:', data); // Debug log

      setSuccess(true);
      
      // totalAmount already calculated above, use it for Facebook Pixel
      trackFacebookEvent('Purchase', {
        content_name: productName,
        content_ids: [productId],
        content_type: 'product',
        value: totalAmount,
        currency: 'INR',
        num_items: quantity,
      });

      // Redirect to thank you page with order details
      if (data?._id) {
        router.push(`/thank-you?id=${data._id}&order=${data.orderId || data.orderNumber || ''}`);
        return;
      }
    } catch (err) {
      console.error('Error in handleSubmit:', err); // Enhanced error logging
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const totalAmount = productPrice * quantity + shippingCost;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30 px-2 sm:px-4 py-6">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[92vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 z-20 bg-white border-b px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
          <h2 className="text-sm font-semibold tracking-[0.18em] text-red-500">
            CASH ON DELIVERY
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition"
            disabled={isSubmitting}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-0 space-y-0 text-[11px] sm:text-xs">
          {/* Product + price summary */}
          <div className="px-4 sm:px-6 pt-4 pb-3">
            <div className="flex items-start gap-3 mb-4">
              <div className="relative z-0 w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 rounded overflow-hidden flex items-center justify-center text-xs text-gray-500">
                {productImage ? (
                  <img
                    src={productImage}
                    alt={productName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-[10px] text-gray-500 text-center px-1">
                    {quantity}x
                  </span>
                )}
                <span className="absolute -bottom-1 -right-1 px-1.5 py-0.5 rounded bg-black text-white text-[9px] sm:text-[10px]">
                  {quantity}x
                </span>
              </div>
              <div className="flex-1">
                <p className="text-[16px] font-bold leading-snug line-clamp-2">
                  {productName}
                </p>
                {selectedSize && (
                  <p className="text-[11px] text-gray-500 mt-1">
                    Size: {selectedSize}
                  </p>
                )}
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold">
                  Rs. {productPrice.toFixed(2)}
                </p>
              </div>
            </div>

            <div className="border rounded-md text-[15px] overflow-hidden">
              <div className="flex justify-between px-3 py-2 border-b bg-white">
                <span>Subtotal</span>
                <span>Rs. {(productPrice * quantity).toFixed(2)}</span>
              </div>
              <div className="flex justify-between px-3 py-2 border-b bg-white">
                <span>Shipping</span>
                <span className="text-green-600 font-semibold">Free</span>
              </div>
              <div className="flex justify-between px-3 py-2 bg-gray-50 font-semibold text-sm">
                <span>Total</span>
                <span>Rs. {totalAmount.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Shipping options */}
          <div className="px-4 sm:px-6 pt-3 pb-1 text-[15px]">
            <p className="font-bold mb-2">Shipping Options</p>
            <div className="flex items-center justify-between border rounded-md px-3 py-2 bg-white">
              <div className="flex items-center gap-2">
                <span className="inline-flex h-4 w-4 rounded-full border border-black bg-black" />
                <span>Free Shipping</span>
              </div>
              <span className="text-green-600 font-semibold">Free</span>
            </div>
          </div>

          {/* Form Fields */}
          <div className="px-4 sm:px-6 pt-4 pb-3 space-y-3 sm:space-y-4 text-[15px]">
            <FormField
              label="Enter your Full Name in English"
              required={true}
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="In English Language Only"
              pattern="^[\x20-\x7E]+$"
              error={fieldErrors.name}
              icon={<FaRegUserCircle className='w-4 h-4 text-black' />}
            />

            <FormField
              label="Active Mobile Number"
              required={true}
              type="tel"
              name="number"
              value={formData.number}
              onChange={handleChange}
              minLength={10}
              maxLength={13}
              pattern="^[0-9]{10,13}$"
              placeholder="Enter 10 Digit Active Mobile Number"
              error={fieldErrors.number}
              icon={<BsTelephoneFill className='w-4 h-4 text-black' />}
            />


            <FormField
              label="Complete Full Address"
              required={true}
              inputType="textarea"
              textarea={true}
              name="address"
              value={formData.address}
              onChange={handleChange}
              pattern="^[\x20-\x7E]+$"
              placeholder="House No/Flat No, Area"
              error={fieldErrors.address}
              icon={<FaLocationDot className='w-4 h-4 text-black' />}
            />

            {/* Landmark */}
            <FormField
              label="Landmark"
              required={false}
              type="text"
              name="landmark"
              value={formData.landmark}
              onChange={handleChange}
              placeholder="Nearby school, hospital, shop"
              icon={<FaLocationDot className='w-4 h-4 text-black' />}
            />

            {/* State */}
            <FormField
              label="State"
              required={true}
              inputType="dropdown"
              dropdown={true}
              name="state"
              value={formData.state}
              onChange={handleChange}
              placeholder="State"
              options={states.map((s) => ({ value: s, label: s }))}
            />

            {/* PIN */}
            <FormField
              label="PIN code"
              required={true}
              type="text"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              placeholder="Enter 6 digit PIN code"
              minLength={6}
              maxLength={6}
              pattern="^[0-9]{6}$"
              error={fieldErrors.pincode}
              icon={<FaHashtag className='w-4 h-4 text-black' />}
            />

            {/* City */}
            <FormField
              label="City"
              required={true}
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="City"
              icon={<FaLocationDot className='w-4 h-4 text-black' />}
            />

          </div>


          {/* Error / success messages under fields (mobile friendly) */}
          <div className="px-4 sm:px-6 pb-1">
            {error && (
              <div className="mt-2 bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded text-[11px]">
                {error}
              </div>
            )}

            {success && (
              <div className="mt-2 bg-green-50 border border-green-200 text-green-700 px-3 py-2 rounded text-[11px]">
                Order placed successfully! Redirecting...
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="px-4 sm:px-6 pt-2 pb-4 sm:pb-5 flex">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-4 py-3 sm:py-3.5 bg-black text-white rounded-md hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-[11px] sm:text-xs font-semibold tracking-wide"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  BUYING...
                </>
              ) : (
                'BUY IT NOW - Rs. ' + totalAmount.toFixed(2)
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}


const FormField = ({
  label,
  required = false,
  icon,
  type = "text",
  inputType = "input",
  placeholder = "",
  options = [],
  name,
  value,
  onChange,
  minLength,
  maxLength,
  pattern,
  error,
}) => {

  const renderField = () => {
    switch (inputType) {
      case "dropdown":
        return (
          <>
            <select
              name={name}
              value={value}
              required={required}
              onChange={onChange}
              className="w-full px-2 py-1.5 text-[15px] bg-transparent outline-none
                         appearance-none cursor-pointer"
            >
              <option value="" className='text-[15px] text-gray-400'>{placeholder || "Select option"}</option>
              {options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <div className="px-2 text-gray-500 pointer-events-none text-[10px]">
              ▼
            </div>
          </>
        );

      case "textarea":
        return (
          <textarea
            rows={2}
            required={required}
            name={name}
            value={value}
            onChange={onChange}
            minLength={minLength}
            maxLength={maxLength}
            pattern={pattern}
            placeholder={placeholder}
            className="w-full px-2 py-1.5 text-[15px] outline-none bg-transparent resize-none placeholder:text-[15px]"
          />
        );

      default:
        return (
          <input
            type={type}
            required={required}
            name={name}
            value={value}
            onChange={onChange}
            minLength={minLength}
            maxLength={maxLength}
            pattern={pattern}
            placeholder={placeholder}
            className="w-full px-2 py-1.5 text-[15px] outline-none bg-transparent placeholder:text-[15px]"
          />
        );
    }
  };

  return (
    <div className="w-full">
      <p className="mb-1 font-bold text-[15px] text-gray-900">
        {label} {required && <span className="text-red-500">*</span>}
      </p>

      <div
        className={`flex items-center border rounded overflow-hidden
      focus-within:ring-1 focus-within:ring-black
      ${error ? "border-red-400" : "border-gray-300"}`}
      >
        {icon && (
          <div className="w-10 h-15 bg-gray-200 flex items-center justify-center text-gray-600 shrink-0">
            {icon}
          </div>
        )}

        {renderField()}
      </div>

      {error && (
        <p className="text-[10px] text-red-500 mt-1">
          {error}
        </p>
      )}
    </div>
  );
};
