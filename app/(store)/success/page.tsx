'use client';

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import useBasketStore from "../store";
import { CheckmarkIcon } from "@sanity/icons";

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("orderNumber");
  // const cancelled = searchParams.get("cancelled");

  const clearBasket = useBasketStore((state) => state.clearBasket);
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    if (orderNumber) {
      clearBasket();
    }
  }, [orderNumber, clearBasket]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <div className="bg-white p-12 rounded-xl shadow-lg max-w-2xl w-full mx-4">
          <div className="flex justify-center mb-8">
            <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center">
              <CheckmarkIcon fontSize={35} />
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-6 text-center">
            Thank you for your order!
          </h1>
          <p className="text-lg text-gray-600 mb-8 text-center">
            Your order has been successfully placed and will be processed for shipping soon.</p>
            <div className="space-y-2">
              {orderNumber && (
                <p className="text-gray-600 flex items-center space-x-5">
                  <span>Order No:</span>
                  <span className="font-mono text-sm text-green-600">
                    {orderNumber}
                  </span>
                </p>
              )}
              {sessionId && (
                <p className="text-gray-600 flex items-center space-x-5">
                  <span>Transaction ID:</span>
                  <span className="font-mono text-sm text-gray-600">
                    {sessionId}
                  </span>
                </p>
              )}
            </div>
            {orderNumber && (
              <div className="mt-8 flex justify-center">
                <a 
                  href={`/orders/`}
                  className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
                >
                  View Order Details
                </a>
              </div>
            )}
        </div>
    </div>
  );
}
