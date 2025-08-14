export default () => {
  if (process.env.NODE_ENV === "development") {
    return {
      env: {
        MONGODB_CLIENT:
          "mongodb+srv://nostromo:ItTZaPAYQ7NGCuF8@believemy-passerelle-qu.cqc1i.mongodb.net/?retryWrites=true&w=majority&appName=BelieveMy-Passerelle-Quatre-Cluster",
        MONGODB_DATABASE: "PasserelleQuatre",
        NEXTAUTH_SECRET: "djherzùjknczzeùkcsdoizjnvuyrnoxmfhzyawqx",
        NEXTAUTH_URL: "http://localhost:3000", // pour être sûr que le jwt est bien appelé sur le bon site internet
        // CLOUDINARY
        MY_ADRESS_MAIL: "nostromo_site@yahoo.fr",
        NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: "dg82qpznj",
        NEXT_PUBLIC_UPLOAD_PRESET: "ml_default",
        NEXT_UPLOAD_PRESET_UNSIGNED: "un_preset_non_signe",
        NEXT_PUBLIC_CLOUDINARY_API_KEY: "865282161267678",
        NEXT_PUBLIC_CLOUDINARY_API_SECRET: "_eVZpxeOYr_uTs-MZQufmaok8Y4",
        // RESEND
        RESEND_API_KEY: "re_KtKBeLdf_6AJwBAm5d7NdFqGnjdv99Hay",
        // TINY MCE
        TINY_MCE_KEY: "jwpduyj2wsgco2wubq610ogqntre0it79yiz6hx2cgpvq4j5",
        // STRIPE
        NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY:
          "pk_test_51QysjDR7y14UuYVIUj7PWSxVhjshz3mYhH3eZR53qisiSoLfIer4oEmIldbJu3qv4Hak7pha7PhIQFprXUHbxQq50046JZetCF",
        STRIPE_SECRET_KEY:
          "sk_test_51QysjDR7y14UuYVI9SowA1mzRnqfFTJ7BWSo5Ii7XN3RQi5ZX3XibXwL6BaBAQ4RFVPg8GEWvh3bRf2B5dWmHo9c00H8tJ2cNq",
      },
      images: {
        remotePatterns: [
          {
            protocol: "https",
            hostname: "res.cloudinary.com",
          },
        ],
      },
    };
  } else {
    return {
      env: {
        MONGODB_CLIENT:
          "mongodb+srv://nostromo:ItTZaPAYQ7NGCuF8@believemy-passerelle-qu.cqc1i.mongodb.net/?retryWrites=true&w=majority&appName=BelieveMy-Passerelle-Quatre-Cluster",
        MONGODB_DATABASE: "PasserelleQuatre",
        NEXTAUTH_SECRET: "djherzùjknczzeùkcsdoizjnvuyrnoxmfhzyawqx",
        NEXTAUTH_URL: "http://localhost:3000", // pour être sûr que le jwt est bien appelé sur le bon site internet
        // CLOUDINARY
        MY_ADRESS_MAIL: "nostromo_site@yahoo.fr",
        NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: "dg82qpznj",
        NEXT_PUBLIC_UPLOAD_PRESET: "ml_default",
        NEXT_UPLOAD_PRESET_UNSIGNED: "un_preset_non_signe",
        NEXT_PUBLIC_CLOUDINARY_API_KEY: "865282161267678",
        NEXT_PUBLIC_CLOUDINARY_API_SECRET: "_eVZpxeOYr_uTs-MZQufmaok8Y4",
        //MAIL_USERNAME: "believeromain@demomailtrap.com",
        //MAIL_PASSWORD: "25gjwE34G4rZmB",
        // RESEND
        RESEND_API_KEY: "re_KtKBeLdf_6AJwBAm5d7NdFqGnjdv99Hay",
        // TINY MCE
        TINY_MCE_KEY: "jwpduyj2wsgco2wubq610ogqntre0it79yiz6hx2cgpvq4j5",
        // STRIPE
        NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY:
          "pk_test_51QysjDR7y14UuYVIUj7PWSxVhjshz3mYhH3eZR53qisiSoLfIer4oEmIldbJu3qv4Hak7pha7PhIQFprXUHbxQq50046JZetCF",
        STRIPE_SECRET_KEY:
          "sk_test_51QysjDR7y14UuYVI9SowA1mzRnqfFTJ7BWSo5Ii7XN3RQi5ZX3XibXwL6BaBAQ4RFVPg8GEWvh3bRf2B5dWmHo9c00H8tJ2cNq",
      },
      images: {
        remotePatterns: [
          {
            protocol: "https",
            hostname: "res.cloudinary.com",
          },
        ],
      },
    };
  }
};