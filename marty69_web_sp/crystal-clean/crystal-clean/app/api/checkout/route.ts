import Stripe from "stripe";
import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import prisma from "../auth/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  const email = session?.user.email as string;

  const { productInfo, currency } = await req.json();

  if (currency !== "CZK" && currency !== "EUR") {
    return new NextResponse("Invalid currency", { status: 400 });
  }

  const productIds = productInfo.productIds;
  const quantities = productInfo.quantities;

  if (
    !productInfo ||
    productInfo.length === 0 ||
    !productIds ||
    productIds.length === 0
  ) {
    return new NextResponse("No products in cart", { status: 400 });
  }

  const products = await prisma.product.findMany({
    where: {
      id: {
        in: productIds,
      },
    },
  });
  if (currency === "CZK") {
    let recalculatedTotalCZK = 0;
    products.forEach((product, index) => {
      recalculatedTotalCZK += Number(product.priceCZK) * quantities[index];
    });
    recalculatedTotalCZK += 150;
  } else {
    let recalculatedTotalEUR = 0;
    products.forEach((product, index) => {
      recalculatedTotalEUR += Number(product.priceEUR) * quantities[index];
    });
    recalculatedTotalEUR += 8;
  }

  const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [];
  products.forEach((product, index) => {
    lineItems.push({
      quantity: quantities[index],
      price_data: {
        currency: currency.toLowerCase(),
        product_data: {
          name: product.name,
        },
        unit_amount:
          currency === "CZK"
            ? Math.round(Number(product.priceCZK) * 100)
            : Math.round(Number(product.priceEUR) * 100),
      },
    });
  });

  const order = await prisma.order.create({
    data: {
      user: {
        connect: {
          email,
        },
      },
      isPaid: false,
      orderItems: {
        create: productIds.map((productId: string) => ({
          product: {
            connect: {
              id: productId,
            },
          },
        })),
      },
    },
  });

  const sessionStripe = await stripe.checkout.sessions.create({
    line_items: lineItems,
    customer_email: email,
    payment_method_types: ["card"],
    mode: "payment",
    billing_address_collection: "required",
    phone_number_collection: {
      enabled: true,
    },
    success_url: `${process.env.FRONTEND_URL}/cart?success=1`,
    cancel_url: `${process.env.FRONTEND_URL}/cart?canceled=1`,
    metadata: {
      orderId: order.id,
    },
  });
  return NextResponse.json(
    { url: sessionStripe.url },
    { headers: corsHeaders },
  );
}
