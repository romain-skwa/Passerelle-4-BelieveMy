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
