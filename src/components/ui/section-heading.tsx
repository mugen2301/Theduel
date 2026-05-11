import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  text?: string;
  align?: "left" | "center";
  tone?: "dark" | "light";
};

export function SectionHeading({ eyebrow, title, text, align = "left", tone = "dark" }: SectionHeadingProps) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center")}>
      <p className={cn("mb-3 text-xs font-black uppercase tracking-[0.24em]", tone === "dark" ? "text-volt" : "text-ember")}>
        {eyebrow}
      </p>
      <h2 className={cn("font-display text-3xl font-black leading-[0.98] sm:text-5xl", tone === "dark" ? "text-bone" : "text-ink")}>
        {title}
      </h2>
      {text ? (
        <p className={cn("mt-5 text-base leading-7 sm:text-lg", tone === "dark" ? "text-steel" : "text-ink/68")}>
          {text}
        </p>
      ) : null}
    </div>
  );
}
