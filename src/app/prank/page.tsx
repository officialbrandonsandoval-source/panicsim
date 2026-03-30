import type { Metadata } from "next";
import PrankPageClient from "@/components/PrankPage";

export const metadata: Metadata = {
  title: "System Alert — Immediate Action Required",
  description: "A critical notification requires your immediate attention. Click to view.",
  openGraph: {
    title: "System Alert — Immediate Action Required",
    description: "A critical notification requires your immediate attention.",
  },
};

export default function PrankPage() {
  return <PrankPageClient />;
}
