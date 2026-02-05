import { defaultLocale } from "@/constants/languages";
import { redirect } from "next/navigation";

export default function RootPage() {
  redirect(`/${defaultLocale}`);
}
