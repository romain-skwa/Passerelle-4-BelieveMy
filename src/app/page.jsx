"use client";
import { useEffect, useState } from "react";
import ConnectedUser from "@/components/ConnectedUser/ConnectedUser";
import GeneralLayout from "@/components/GeneralLayout/GeneralLayout";
import HomeImages from "@/components/HomeImages/HomeImages";
import Loading from "@/components/Loading/Loading";
import { toast } from "react-toastify";

// HOME

export default function Index() {
  const [introductionsImages, setIntroductionsImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch("/api/homeImages"); // Get the images
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des images");
        }
        const data = await response.json();
        setIntroductionsImages(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  return (
    <GeneralLayout>
      <ConnectedUser  />
      <section className="flex flex-wrap tablet:gap-4 gap-2 justify-center w-[95%] lg:w-2/3 mx-auto">
        {loading ? (
          <Loading />
        ) : (         
          <HomeImages introductionsImages={introductionsImages} />
        )}
      </section>
    </GeneralLayout>
  );
}