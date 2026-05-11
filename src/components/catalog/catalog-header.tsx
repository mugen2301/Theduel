import Link from "next/link";
import { ArrowLeft } from "lucide-react";

type CatalogHeaderProps = {
  eyebrow: string;
  title: string;
  description: string;
  backHref?: string;
  backLabel?: string;
};

export function CatalogHeader({
  eyebrow,
  title,
  description,
  backHref,
  backLabel
}: CatalogHeaderProps) {
  return (
    <header className="container-page pb-10 pt-8 sm:pb-14 sm:pt-12">
      {backHref ? (
        <Link
          href={backHref}
          className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-steel transition hover:text-bone"
        >
          <ArrowLeft className="h-4 w-4" />
          {backLabel ?? "Back"}
        </Link>
      ) : null}
      <p className="text-xs font-black uppercase tracking-[0.24em] text-volt">{eyebrow}</p>
      <h1 className="mt-4 max-w-4xl font-display text-5xl font-black leading-[0.92] text-bone sm:text-7xl">
        {title}
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-8 text-steel">{description}</p>
    </header>
  );
}
