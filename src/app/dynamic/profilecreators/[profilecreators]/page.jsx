"use client";
// introduction of a creator
import GeneralLayout from "@/components/GeneralLayout/GeneralLayout";
import { notFound, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Profile() {
  // Variable
  const params = useParams();
  const pseudo = params.profilecreators.slice(3); // Important de mettre le nom du dossier [profilecreators]

  // State
  const [user, setUser] = useState({});

  useEffect(() => {
    if (!pseudo) {
      notFound();
    }

    fetchUserData();
  }, []);

  // Function
  const fetchUserData = async () => {
    const response = await fetch("/api/userConnection", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({pseudo}),
    });

    const data = await response.json();

    if (!data) {throw new Error("Invalid JSON response");}

    if (!response.ok) {toast.error("Une erreur est intervenue");}

    setUser(data.user);
  };

  return (
    <GeneralLayout>
      <section className="text-white">
        <div>Ici le pseudo sans décodage : {pseudo} </div>
        <div>Ceci est un profil {decodeURIComponent(pseudo)} </div>
        <div>
          Ici, on peut voir l'identifiant de l'utilisateur {decodeURIComponent(user.username)} {" "}
        </div>
        <div>Et ceci est la bio : {user.bio}</div>
        <div>Site : {user.url}</div>
        {user.discord && <div>{user.discord}</div>}
        {user.itchoIo && <div>{user.itchoIo}</div>}
        {user.twitch && <div>{user.twitch}</div>}
      </section>
    </GeneralLayout>
  );
}
