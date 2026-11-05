import { Suspense } from "react";
import { PostForm } from "@/components/admin/post-form";
import { LoadingBlock } from "@/components/admin/ui";

type Props = { params: Promise<{ id: string }> };

/** `params` is URL data, so it is awaited inside Suspense (Cache Components). */
export default function AdminEditPostPage({ params }: Props) {
  return (
    <Suspense fallback={<LoadingBlock rows={6} />}>
      <Editor params={params} />
    </Suspense>
  );
}

async function Editor({ params }: Props) {
  const { id } = await params;
  return <PostForm postId={id} />;
}
