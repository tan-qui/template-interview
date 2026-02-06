import { redirect } from "next/navigation";

type Props = {
  params: {
    locale: string;
  };
};

export default function LocaleRootPage({ params }: Props) {
  redirect(`/${params.locale}/chat`);
}
