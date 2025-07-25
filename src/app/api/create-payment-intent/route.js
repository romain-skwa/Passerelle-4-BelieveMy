import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  try {
    const { draftId, gameName, amount } = await request.json();

    // Créer l'intention de paiement
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount, // en centimes
      currency: "eur",
      metadata: {
        draftId: draftId,
        gameName: gameName,
      },
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error(
      "Erreur lors de la création de l'intention de paiement:",
      error
    );
    return NextResponse.json(
      { error: "Erreur lors de la création du paiement" },
      { status: 500 }
    );
  }
}
