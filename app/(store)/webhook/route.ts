import { stripe } from "@/lib/stripe";
import {client} from "@/sanity/lib/backendClient";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

import { Metadata } from "@/app/actions/createCheckOutSession";


export async function POST(req: NextRequest) {
    const body = await req.text();
    const headersList = await headers();
    const sig = headersList.get("stripe-signature");

    if (!sig) {
        return NextResponse.json({error: "Missing stripe-signature header"}, { status: 400 });
    }
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    if (!webhookSecret) {
        console.log("Stripe webhook secret is not set");
        return NextResponse.json({error: "Missing Stripe webhook secret"}, { status: 400 });
    }

    let event: Stripe.Event;
    try {
        event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
    } catch (err) {
        console.error(`Webhook Error: ${err}`);
        return NextResponse.json({error: `Webhook error!" ${err}`}, 
            { status: 400 }
        );
    }

    if (event.type === "checkout.session.completed") {
        const session = event.data.object as Stripe.Checkout.Session;
        
        try{
            const order = await createOrderInSanity(session);
            console.log("Order created in Sanity:", order);
        } catch (err) {
            console.error("Error creating order in Sanity:", err);
            return NextResponse.json({error: "Error creating order in Sanity"}, { status: 500 });
        }
    }
    return NextResponse.json({received: true});
}

async function createOrderInSanity(session:Stripe.Checkout.Session){
    const {
        id,
        amount_total,
        currency,
        payment_intent,
        customer,
        total_details,
    } = session;
    const metadata = session.metadata as Metadata;
    // const {orderNumber, customerName, customerEmail, clerkUserId} = metadata;

    const lineItemsWithProduct = await stripe.checkout.sessions.listLineItems(
        id,
        {expand: ["data.price.product"]},
    );

    const sanityProducts = lineItemsWithProduct.data.map((item) =>({
    _key: crypto.randomUUID(),
    product:{
        _type: "reference",
        _ref: (item.price?.product as Stripe.Product)?.metadata?.id,
    },
    quantity: item.quantity || 0,
    }));

const order = await client.create({
    _type: "order",
    orderNumber: metadata.orderNumber,
    stripeCheckoutSessionId: session.id,
    stripeCustomerId: customer as string,
    clerkUserId: metadata.clerkUserId,
    customerName: metadata.customerName,
    email: metadata.customerEmail,
    stripePaymentIntentId: payment_intent as string,
    products: sanityProducts,
    totalPrice: amount_total ? amount_total / 100 : 0,
    currency: currency?.toLocaleUpperCase(),
    amountDiscount: total_details?.amount_discount ? 
        total_details.amount_discount / 100 : 0,
    status: "paid", // Set initial status
    orderDate: new Date().toISOString()
});
return order;
}