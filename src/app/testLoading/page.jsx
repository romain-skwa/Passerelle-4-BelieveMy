"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import GeneralLayout from "@/components/ForLayout/GeneralLayout/GeneralLayout";
import Loading from "@/components/ForLayout/Loading/Loading";
import SocialFrame from "@/components/SocialFrame/SocialFrame";
import { Cloudinary } from "@cloudinary/url-gen";
import { useLanguage } from "@/components/ForLayout/LanguageContext/LanguageContext";


export default function TestPage() {


  return (
    <GeneralLayout>
      <div>
        <h2>Sarlat, une perle de la Dordogne</h2>
        <p>
          Sarlat est une charmante ville médiévale située au cœur de la Dordogne. 
          Réputée pour son architecture préservée, ses ruelles pittoresques et son riche patrimoine historique, 
          elle est une destination incontournable pour les amateurs de culture et de gastronomie.
        </p>
        <p>
          Chaque année, Sarlat accueille le Festival du Film, un événement culturel majeur qui attire des cinéphiles 
          et des professionnels du cinéma de toute la France. Ce festival met en lumière des œuvres cinématographiques 
          variées et offre une plateforme unique pour les jeunes talents et les réalisateurs confirmés.
        </p>
      </div>
    </GeneralLayout>
  );
}
