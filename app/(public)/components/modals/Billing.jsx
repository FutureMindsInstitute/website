'use client';

import React, { useState, useEffect } from "react";
import { useUserModal } from '../../../../hooks/useUserModal';
import usePaymentGateway from '../../../../hooks/usePaymentGateway';
import publicApi from '../../../../lib/publicApi';

const BillingModal = () => {
  const { showBilling, selectedCourse, closeBilling } = useUserModal();
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState("");
  const [couponSuccess, setCouponSuccess] = useState("");
  const [coupons, setCoupons] = useState([]);
  const [loadingCoupons, setLoadingCoupons] = useState(false);

  const paymentGateway = usePaymentGateway({
    courseId: selectedCourse?._id,
    courseName: selectedCourse?.name,
  });
  const [submitting, setSubmitting] = useState(false);

  // Fetch coupons on mount
  useEffect(() => {
    if (showBilling && selectedCourse) {
      fetchCoupons();
    }
  }, [showBilling, selectedCourse]);

  const fetchCoupons = async () => {
    try {
      setLoadingCoupons(true);
      const res = await publicApi.get("/api/coupon");
      if (res.data.success) {
        setCoupons(res.data.coupons || []);
      }
    } catch (error) {
      console.error("Error fetching coupons:", error);
    } finally {
      setLoadingCoupons(false);
    }
  };

  const handleCouponInputChange = (e) => {
    const value = e.target.value;
    // Only allow alphanumeric characters and convert to uppercase
    const filtered = value.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
    setCouponCode(filtered);
    // Clear errors/success when user types
    if (couponError) setCouponError("");
    if (couponSuccess) setCouponSuccess("");
    if (appliedCoupon) setAppliedCoupon(null);
  };

  const handleApplyCoupon = () => {
    if (!couponCode.trim()) {
      setCouponError("Please enter a coupon code");
      return;
    }

    setCouponError("");
    setCouponSuccess("");

    // Find coupon by name (case-insensitive)
    const coupon = coupons.find(
      (c) => c.name.toUpperCase() === couponCode.toUpperCase()
    );

    if (!coupon) {
      setCouponError("Invalid coupon code");
      return;
    }

    if (!coupon.isActive) {
      setCouponError("This coupon is not active");
      return;
    }

    // Check if coupon applies to this course
    const courseId = String(selectedCourse._id);
    const appliesToCourse = coupon.courses.some(
      (course) => String(course._id || course) === courseId
    );

    if (!appliesToCourse) {
      setCouponError("This coupon does not apply to this course");
      return;
    }

    // Check if coupon is exhausted
    if (coupon.currentRedeemNumbers >= coupon.totalRedeemNumbers) {
      setCouponError("This coupon has been fully redeemed");
      return;
    }

    // Valid coupon
    setAppliedCoupon(coupon);
    setCouponSuccess("Coupon applied successfully!");
    setCouponError("");
  };

  const handleNext = async () => {
    const CouponName = appliedCoupon?.name || null;
    setSubmitting(true);
    const opened = await paymentGateway.initiatePayment(CouponName);
    if (opened) {
      // Razorpay opened successfully; close billing modal now
      closeBilling();
    } else {
      // Keep modal open and show error to retry
      setCouponError("Failed to initiate payment. Please try again.");
    }
    setSubmitting(false);
  };

  const handleClose = () => {
    setCouponCode("");
    setAppliedCoupon(null);
    setCouponError("");
    setCouponSuccess("");
    closeBilling();
  };

  if (!showBilling || !selectedCourse) return null;

  const discountedPrice = selectedCourse.discountPrice || 0;
  const couponDiscount = appliedCoupon ? appliedCoupon.amount : 0;
  const priceAfterCoupon = Math.max(0, discountedPrice - couponDiscount);
  const gst = priceAfterCoupon * 0.18;
  const finalAmount = priceAfterCoupon + gst;

  const inputHasValue = couponCode.trim().length > 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div 
        className="absolute inset-0 bg-slate-900/70 backdrop-blur-sm" 
        onClick={handleClose} 
      />
      <div className="relative w-full max-w-md bg-slate-900 text-slate-100 border border-slate-700 rounded-xl shadow-2xl p-6 md:p-7">
        <button
          type="button"
          aria-label="Close"
          onClick={handleClose}
          className="absolute top-3 right-3 text-slate-400 hover:text-white hover:bg-slate-800/60 rounded-md p-1 cursor-pointer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
            <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 11-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
          </svg>
        </button>

        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-emerald-400 mb-2">Billing Details</h2>
          <p className="text-sm text-slate-400">{selectedCourse.name}</p>
        </div>

        <div className="space-y-4">
          {/* Discounted Price */}
          <div className="flex justify-between items-center py-2 border-b border-slate-700">
            <span className="text-slate-300">Discounted Price</span>
            <span className="text-slate-100 font-semibold">₹{discountedPrice.toFixed(2)}</span>
          </div>

          {/* Coupon Discount (if applied) */}
          {appliedCoupon && (
            <div className="flex justify-between items-center py-2 border-b border-slate-700">
              <span className="text-slate-300">Coupon Discount</span>
              <span className="text-green-400 font-semibold">-₹{couponDiscount.toFixed(2)}</span>
            </div>
          )}

          {/* Price After Coupon */}
          {appliedCoupon && (
            <div className="flex justify-between items-center py-2 border-b border-slate-700">
              <span className="text-slate-300">Price After Coupon</span>
              <span className="text-slate-100 font-semibold">₹{priceAfterCoupon.toFixed(2)}</span>
            </div>
          )}

          {/* GST */}
          <div className="flex justify-between items-center py-2 border-b border-slate-700">
            <span className="text-slate-300">GST (18%)</span>
            <span className="text-slate-100 font-semibold">₹{gst.toFixed(2)}</span>
          </div>

          {/* Coupon Code Input */}
          <div className="py-2">
            <label className="block text-sm text-slate-300 mb-2">Coupon Code</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={couponCode}
                onChange={handleCouponInputChange}
                placeholder="Enter coupon code"
                className={`flex-1 bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all ${
                  inputHasValue 
                    ? 'opacity-100' 
                    : 'opacity-50'
                }`}
              />
              <button
                type="button"
                onClick={handleApplyCoupon}
                disabled={!couponCode.trim() || loadingCoupons}
                className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg px-4 py-2 font-medium transition-colors disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
              >
                Apply
              </button>
            </div>
            {couponError && (
              <div className="text-red-400 text-sm mt-2">{couponError}</div>
            )}
            {couponSuccess && (
              <div className="text-green-400 text-sm mt-2">
                {couponSuccess} (₹{couponDiscount} off)
              </div>
            )}
          </div>

          {/* Final Amount */}
          <div className="flex justify-between items-center py-3 border-t border-slate-700 mt-2">
            <span className="text-lg font-bold text-slate-100">Final Amount</span>
            <span className="text-xl font-bold text-emerald-400">₹{finalAmount.toFixed(2)}</span>
          </div>

          {/* Next Button */}
          <button
            onClick={handleNext}
            disabled={submitting || paymentGateway.loading}
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg py-3 px-4 font-semibold transition-colors disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
          >
            {submitting || paymentGateway.loading ? "Processing..." : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BillingModal;

