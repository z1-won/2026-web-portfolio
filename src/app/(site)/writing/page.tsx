import { Suspense } from "react";
import { fetchVelogPosts } from "@/lib/api/velog";
import WritingClient from "./_components/WritingClient";

async function WritingContent() {
  const posts = await fetchVelogPosts();
  return <WritingClient posts={posts} />;
}

export default function WritingPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-7xl px-4 py-12 md:px-8">
          <div className="mb-8">
            <p className="mb-1 font-mono text-[10px] tracking-widest text-subtle">WRITING</p>
            <h1 className="text-3xl font-bold text-text">Writing</h1>
          </div>
          <p className="text-sm text-muted animate-pulse">Velog에서 글을 불러오는 중...</p>
        </div>
      }
    >
      <WritingContent />
    </Suspense>
  );
}
