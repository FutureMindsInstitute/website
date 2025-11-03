'use client';

import { useState } from "react";
import publicApi from "../lib/publicApi";
import { useUserAuth } from "./useUserAuth";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useUserModal } from "./useUserModal";

export default function usePaymentGateway({ courseId, courseName, onPaymentSuccess, onPaymentError }) {
  const [loading, setLoading] = useState(false);
  const { user } = useUserAuth();
  const router = useRouter();
  const { openLogin } = useUserModal();

  const initiatePayment = async () => {
    if (!user) return openLogin();
    if (!courseId) return toast.error("Course ID is required");
    setLoading(true);
    try {
      const resp = await publicApi.post(`/payment/subscribe/${user._id}`, { courseId }, { withCredentials: true });
      const { order, prefill } = resp.data.data;
      const options = {
        key: process.env.NEXT_PUBLIC_RAZ_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "Future Minds Institute",
        description: courseName || "Course Subscription",
        order_id: order.id,
        handler: async (rz) => {
          try {
            await publicApi.post(`/payment/verify-payment/${user._id}`, {
              razorpay_order_id: rz.razorpay_order_id,
              razorpay_payment_id: rz.razorpay_payment_id,
              razorpay_signature: rz.razorpay_signature,
              courseId,
            }, { withCredentials: true });
            toast.success("Payment successful!");
            onPaymentSuccess ? onPaymentSuccess(rz) : router.push("/dashboard", { replace: true });
          } catch (e) {
            toast.error("Payment verification failed");
            onPaymentError && onPaymentError(e);
          }
        },
        prefill: { name: prefill.name, email: prefill.email, contact: prefill.contact },
        theme: { color: "#10b981" },
        modal: { ondismiss: () => setLoading(false) }
      };
      if (!window.Razorpay) {
        const s = document.createElement("script");
        s.src = "https://checkout.razorpay.com/v1/checkout.js";
        s.onload = () => new window.Razorpay(options).open();
        document.body.appendChild(s);
      } else {
        new window.Razorpay(options).open();
      }
    } catch (e) {
      toast.error("Failed to create payment order");
      onPaymentError && onPaymentError(e);
    } finally {
      setLoading(false);
    }
  };

  return { initiatePayment, loading, isDisabled: loading || !courseId };
}

