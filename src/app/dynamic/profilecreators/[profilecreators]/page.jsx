"use client";
// the Biography of a creator
import GeneralLayout from "@/components/ForLayout/GeneralLayout/GeneralLayout";
import { notFound, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import UserProfileSection from "@/components/UserProfileSection/UserProfileSection";
import Loading from "@/components/ForLayout/Loading/Loading";

export default function Profile() {
  // Variable
  const params = useParams();
  const pseudo = params.profilecreators.slice(3); // Important de mettre le nom du dossier [profilecreators]

  // State
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    if (!pseudo) {
      notFound();
    } else {
      fetchUserData();
    }
  }, [pseudo]);

  // Function
  const fetchUserData = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/userConnection", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ pseudo }),
      });

      const data = await response.json();

      if (!data) {
        throw new Error("Invalid JSON response");
      }

      if (!response.ok) {
        toast.error("Une erreur est intervenue");
      } else {
        setUser(data.user);
      }
    } catch (error) {
      toast.error(
        "Une erreur est survenue lors de la récupération des données."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <GeneralLayout>
      <section className="text-white">
        {loading ? (
          <Loading />
        ) : (
          <UserProfileSection user={user} />
        )}
      </section>
    </GeneralLayout>
  );
}
