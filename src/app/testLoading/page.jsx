"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import GeneralLayout from "@/components/ForLayout/GeneralLayout/GeneralLayout";
import Loading from "@/components/ForLayout/Loading/Loading";
import SocialFrame from "@/components/SocialFrame/SocialFrame";
import { Cloudinary } from "@cloudinary/url-gen";
import WeAreSendingData from "../../components/WeAreSendingData/WeAreSendingData";

export default function TestPage() {
 

  return (
    <GeneralLayout>
     <WeAreSendingData />
      <SocialFrame />
    </GeneralLayout>
  );
}