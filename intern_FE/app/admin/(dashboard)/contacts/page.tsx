import { Suspense } from "react";
import { ContactsTable } from "@/components/admin/contacts-table";
import { LoadingBlock } from "@/components/admin/ui";

/** The table reads ?status from the URL (useSearchParams), hence the Suspense boundary. */
export default function AdminContactsPage() {
  return (
    <Suspense fallback={<LoadingBlock rows={6} />}>
      <ContactsTable />
    </Suspense>
  );
}
