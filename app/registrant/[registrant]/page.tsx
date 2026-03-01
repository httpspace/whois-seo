import RegistrantDomainsPage from "@/page-components/RegistrantDomains";

export function generateStaticParams() {
  return [
    { registrant: "OpenAI%2C%20Inc." },
  ]
}

export default function Page() {
  return <RegistrantDomainsPage />;
}
