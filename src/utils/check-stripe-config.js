// Utilitaire pour vérifier la configuration Stripe
export const checkStripeConfig = () => {
  const config = {
    hasPublishableKey: !!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    hasSecretKey: !!process.env.STRIPE_SECRET_KEY,
    publishableKeyLength: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY?.length || 0,
    secretKeyLength: process.env.STRIPE_SECRET_KEY?.length || 0,
    publishableKeyPrefix: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY?.substring(0, 3) || 'N/A',
    secretKeyPrefix: process.env.STRIPE_SECRET_KEY?.substring(0, 3) || 'N/A',
  };

  console.log("Configuration Stripe:", config);

  const issues = [];
  
  if (!config.hasPublishableKey) {
    issues.push("NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY manquante");
  } else if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY.startsWith('pk_')) {
    issues.push("NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY invalide (doit commencer par 'pk_')");
  }

  if (!config.hasSecretKey) {
    issues.push("STRIPE_SECRET_KEY manquante");
  } else if (!process.env.STRIPE_SECRET_KEY.startsWith('sk_')) {
    issues.push("STRIPE_SECRET_KEY invalide (doit commencer par 'sk_')");
  }

  if (issues.length > 0) {
    console.error("Problèmes de configuration Stripe:", issues);
    return { valid: false, issues };
  }

  console.log("Configuration Stripe valide");
  return { valid: true, issues: [] };
};

// Fonction pour vérifier la configuration côté client
export const checkStripeConfigClient = () => {
  const config = {
    hasPublishableKey: !!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    publishableKeyLength: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY?.length || 0,
    publishableKeyPrefix: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY?.substring(0, 3) || 'N/A',
  };

  console.log("Configuration Stripe côté client:", config);

  if (!config.hasPublishableKey) {
    console.error("NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY manquante côté client");
    return false;
  }

  if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY.startsWith('pk_')) {
    console.error("NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY invalide côté client");
    return false;
  }

  return true;
};
