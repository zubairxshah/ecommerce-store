import { COUPON_CODES } from "@/sanity/sales/couponCodes";
import { getActiveSaleByCouponCode } from "@/sanity/sales/getActiveSaleByCouponCode";

export default async function BlessedFridayBanner() {
    const sale = await getActiveSaleByCouponCode(COUPON_CODES.BLESSED);
    if (!sale) return null;
    return (
        <div className="bg-gradient-to-r from-red-600 to-black text-white px-4 py-10 mt-2 rounded-lg shadow-lg">
            <div className="container mx-auto flex items-center justify-between">
                <div className="flex-1">
                    <h2 className="text-left text-3xl sm:text-5xl font-semibold mb-4">
                        {sale.title}
                    </h2>
                    <p className="text-left text-xl sm:text-3xl font-semibold mb-6">
                      {sale.description}</p>
                    <div className="flex">
                      <div className="bg-white text-black py-4 px-6 rounded-full shadow-md transform 
                        hover:scale-105 transition duration-300">
                          <span className="font-bold text-sm sm:text:xl">Use Code {" "}
                            <span className="text-red-600">{sale.couponCode}
                            </span>
                          </span>
                          <span className="ml-2 font-bold text-base sm:text-xl">
                            for {sale.discountAmount}% off
                          </span>
                      </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
