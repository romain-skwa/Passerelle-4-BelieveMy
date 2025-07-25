import { NextResponse } from "next/server";
import { cleanupUnpaidDrafts } from "@/actions/cleanup-unpaid-drafts";

export async function POST(request) {
  try {
    const result = await cleanupUnpaidDrafts();

    return NextResponse.json(result);
  } catch (error) {
    console.error("Erreur lors du nettoyage:", error);
    return NextResponse.json(
      { error: "Erreur lors du nettoyage des brouillons" },
      { status: 500 }
    );
  }
}
