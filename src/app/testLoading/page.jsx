"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import GeneralLayout from "@/components/ForLayout/GeneralLayout/GeneralLayout";
import Loading from "@/components/ForLayout/Loading/Loading";
import SocialFrame from "@/components/SocialFrame/SocialFrame";
import { Cloudinary } from "@cloudinary/url-gen";
import { useLanguage } from "@/components/ForLayout/LanguageContext/LanguageContext";

export default function TestPage() {
  const { language } = useLanguage();
  const titleNow = language === "fr" ? "Mon titre" : "My Title";

  useEffect(() => {
    document.title = titleNow;
  }, [language, titleNow]);

  return (
    <GeneralLayout>
      <SocialFrame />
    </GeneralLayout>
  );
}
