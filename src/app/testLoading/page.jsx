"use client";
import GeneralLayout from "@/components/GeneralLayout/GeneralLayout";
import Loading from "@/components/Loading/Loading";
import {ImageUpload} from "@/components/ImageUpload/ImageUpload";

export default function TestPage() {
    return(
        <GeneralLayout>
            <Loading />
            <ImageUpload/>
        </GeneralLayout>
    )
}