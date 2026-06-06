'use client';

import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';
import { useState } from 'react';

export function SearchRefine({ initial = '' }: { initial?: string }) {
  const router = useRouter();
  const [q, setQ] = useState(initial);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        router.push(q.trim() ? `/search?q=${encodeURIComponent(q.trim())}` : '/search');
      }}
      className="border-hairline bg-canvas focus-within:border-ink flex items-center gap-2 rounded-full border p-1.5 pl-5 shadow-[var(--shadow-card)]"
    >
      <Search className="text-muted h-5 w-5 shrink-0" />
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search products…"
        className="text-body-md text-ink placeholder:text-muted-soft h-11 flex-1 bg-transparent outline-none"
      />
      <button
        type="submit"
        className="press bg-primary text-button-md hover:bg-primary-active flex h-11 items-center rounded-full px-6 font-semibold text-white transition-colors"
      >
        Search
      </button>
    </form>
  );
}
