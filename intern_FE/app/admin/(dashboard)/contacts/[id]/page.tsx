import { Suspense } from "react";
import { ContactDetail } from "@/components/admin/contact-detail";
import { LoadingBlock } from "@/components/admin/ui";

type Props = { params: Promise<{ id: string }> };

export default function AdminContactDetailPage({ params }: Props) {
  return (
    <Suspense fallback={<LoadingBlock rows={4} />}>
      <Detail params={params} />
    </Suspense>
  );
}

async function Detail({ params }: Props) {
  const { id } = await params;
  return <ContactDetail contactId={id} />;
}
