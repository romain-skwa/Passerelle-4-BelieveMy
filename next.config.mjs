export default () => {
  if (process.env.NODE_ENV === "development") {
    return {
      env: {
        MONGODB_CLIENT:
          "mongodb+srv://nostromo:ItTZaPAYQ7NGCuF8@believemy-passerelle-qu.cqc1i.mongodb.net/?retryWrites=true&w=majority&appName=BelieveMy-Passerelle-Quatre-Cluster",
        MONGODB_DATABASE: "PasserelleQuatre",
        NEXTAUTH_SECRET: "djherzùjknczzeùkcsdoizjnvuyrnoxmfhzyawqx",
        NEXTAUTH_URL: "http://localhost:3000", // pour être sûr que le jwt est bien appelé sur le bon site internet
        NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: "dg82qpznj",
        NEXT_PUBLIC_UPLOAD_PRESET: "ml_default",
        NEXT_PUBLIC_CLOUDINARY_API_KEY: "865282161267678",
        NEXT_PUBLIC_CLOUDINARY_API_SECRET: "_eVZpxeOYr_uTs-MZQufmaok8Y4",
        //MAIL_USERNAME: "believeromain@demomailtrap.com",
        //MAIL_PASSWORD: "25gjwE34G4rZmB",
        RESEND_API_KEY: "re_KtKBeLdf_6AJwBAm5d7NdFqGnjdv99Hay",
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
        NEXTAUTH_URL: "http://localhost:3000",
        NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: "dg82qpznj",
        NEXT_PUBLIC_UPLOAD_PRESET: "ml_default",
        NEXT_PUBLIC_CLOUDINARY_API_KEY: "865282161267678",
        NEXT_PUBLIC_CLOUDINARY_API_SECRET: "_eVZpxeOYr_uTs-MZQufmaok8Y4",
        MAIL_USERNAME: "believeromain@gmail.com",
        MAIL_PASSWORD: "25gjwE34G4rZmB",
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
