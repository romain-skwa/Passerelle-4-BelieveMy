"use client";

import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { toast } from "react-toastify";
import { useLanguage } from "@/components/ForLayout/LanguageContext/LanguageContext";
import { activateDraft } from "@/actions/create-introduction";
import { useRouter } from "next/navigation";

// Charger Stripe
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

// Composant de formulaire de paiement
const CheckoutForm = ({ draftId, gameName, onPaymentSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { language } = useLanguage();
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    try {
      // Créer l'intention de paiement côté serveur
      const response = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          draftId,
          gameName,
          amount: 999, // 9.99€ en centimes
        }),
      });

      const { clientSecret } = await response.json();

      // Confirmer le paiement
      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardElement),
          },
        }
      );

      if (error) {
        toast.error(error.message);
      } else if (paymentIntent.status === "succeeded") {
        // Activer le brouillon
        await activateDraft(draftId);
        toast.success(
          language === "fr" ? "Paiement réussi !" : "Payment successful!"
        );
        onPaymentSuccess();
        router.push("/");
      }
    } catch (error) {
      toast.error(
        language === "fr" ? "Erreur lors du paiement" : "Payment error"
      );
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg"
    >
      <h3 className="text-xl font-bold mb-4 text-center">
        {language === "fr" ? "Paiement pour" : "Payment for"}: {gameName}
      </h3>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {language === "fr" ? "Informations de carte" : "Card Information"}
        </label>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
      </div>

      <button
        type="submit"
        disabled={!stripe || isProcessing}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        {isProcessing
          ? language === "fr"
            ? "Traitement..."
            : "Processing..."
          : language === "fr"
          ? "Payer 9.99€"
          : "Pay €9.99"}
      </button>
    </form>
  );
};

// Composant principal Stripe
const AllCompStripe = ({ draftId, gameName, onPaymentSuccess }) => {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen  py-8">
      <div className="max-w-4xl mx-auto">

        <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-8">
          {language === "fr"
            ? "Finaliser votre présentation"
            : "Complete your presentation"}
        </h1>
          <div className="mb-6 text-center">
            <p className="text-lg text-gray-600 mb-2">
              {language === "fr"
                ? "Votre présentation est prête ! Finalisez votre paiement pour l'activer."
                : "Your presentation is ready! Complete your payment to activate it."}
            </p>
            <p className="text-sm text-gray-500">
              {language === "fr"
                ? "Prix : 9.99€ (paiement unique)"
                : "Price: €9.99 (one-time payment)"}
            </p>
          </div>

          <Elements stripe={stripePromise}>
            <CheckoutForm
              draftId={draftId}
              gameName={gameName}
              onPaymentSuccess={onPaymentSuccess}
            />
          </Elements>
        </div>
      </div>
    </div>
  );
};

export default AllCompStripe;
