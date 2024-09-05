export default () => {
  if (process.env.NODE_ENV === "development") {
    return {
      env: {
        MONGODB_CLIENT:
          "mongodb+srv://nostromo:ItTZaPAYQ7NGCuF8@believemy-passerelle-qu.cqc1i.mongodb.net/?retryWrites=true&w=majority&appName=BelieveMy-Passerelle-Quatre-Cluster",
        MONGODB_DATABASE: "PasserelleQuatre",
        NEXTAUTH_SECRET: "djherzùjknczzeùkcsdoizjnvuyrnoxmfhzyawqx",
      },
    };
  } else {
    return {
      env: {
        MONGODB_CLIENT:
          "mongodb+srv://nostromo:ItTZaPAYQ7NGCuF8@believemy-passerelle-qu.cqc1i.mongodb.net/?retryWrites=true&w=majority&appName=BelieveMy-Passerelle-Quatre-Cluster",
        MONGODB_DATABASE: "PasserelleQuatre",
        NEXTAUTH_SECRET: "djherzùjknczzeùkcsdoizjnvuyrnoxmfhzyawqx",
      },
    };
  }
};
