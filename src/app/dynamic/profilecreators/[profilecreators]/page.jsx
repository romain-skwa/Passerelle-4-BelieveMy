"use client";

import GeneralLayout from "@/components/GeneralLayout/GeneralLayout";
import { notFound, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Profile() {
  // Variable
  const params = useParams();
  const pseudo = params.profilecreators.slice(3); // Important de mettre le nom du dossier [profilecreators]
  //console.log(`On voit le contenu de pseudo : `, pseudo);
  // State
  const [user, setUser] = useState({});
  //console.log(`On voit le contenu de user : `, user);

  useEffect(() => {
    if (!pseudo) {
      notFound();
    }

    fetchUserData();
  }, []);

  // Function
  const fetchUserData = async () => {
    const response = await fetch("/api/user", {
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
    }

    setUser(data.user);
  };
  //console.log(params);

  return (
    <GeneralLayout>
      <section className="text-white">
        <div>Ceci est un profil {pseudo} </div>
        <div>
          Ici, on peut voir l'identifiant de l'utilisateur {user.username}{" "}
        </div>
        <div>Et ceci est la bio : {user.bio}</div>
        <div>Site : {user.url}</div>
      </section>
    </GeneralLayout>
  );
}
