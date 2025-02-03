'use server'

import { imageUrl } from "@/sanity/lib/imageUrl";
import { BasketItem } from "../(store)/store";
import { stripe } from "@/lib/stripe";

export type Metadata = {
    orderNumber: string;
    customerName: string;
    customerEmail: string;
    clerkUserId: string;
  };

  export type GroupedBasketItem = {
    product: BasketItem["product"];
    quantity: number;
  }

  export async function createCheckOutSession(
    item: GroupedBasketItem[],
    metadata: Metadata
  ){
    try {
        // Check if any group item does have a price
        const itemWithoutPrice = item.filter((item)=> !item.product.price);
        if (itemWithoutPrice.length > 0) {
            throw new Error("One or more items do not have a price");
        }

        // Search for existing customer by email
        const customers = await stripe.customers.list({
            email: metadata.customerEmail,
            limit: 1
        });

        let customerId : string | undefined;
        if (customers.data.length > 0) {
        
            customerId = customers.data[0].id;
        };

        const baseUrl = process.env.NODE_ENV === "production" ? 
        `https://${process.env.VERCEL_URL}` 
        : process.env.NEXT_PUBLIC_BASE_URL

        const successUrl = `${baseUrl}/success?session_id = 
            {CHECKOUT_SESSION_ID}&orderNumber=${metadata.orderNumber}`
            
            console.log("Success URL:", successUrl);
        
        const cancelUrl = `${baseUrl}/cart`
            console.log("Cancel URL:", cancelUrl);

        const session = stripe.checkout.sessions.create({
            customer: customerId,
            customer_creation: customerId ? undefined : "always",
            customer_email: !customerId ? metadata.customerEmail : undefined,
            metadata,
            mode: "payment",
            allow_promotion_codes: true,
            success_url: successUrl,
            cancel_url: cancelUrl,
            line_items: item.map((item) => ({
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: item.product.name || "Unnamed Product",
                        description: `Product ID: ${item.product._id}`,
                        metadata: {
                            id: item.product._id,
                        },
                        images: item.product.image ? [imageUrl(item.product.image).url()] : undefined,
                    },
                    unit_amount: item.product.price ? Math.round(item.product.price * 100) : 0,
                },
                quantity: item.quantity,
            }))
        })
        return (await session).url;

    } catch (error) {
        console.log("Error creating checkout session: ", error)
        throw error;
    }
  }