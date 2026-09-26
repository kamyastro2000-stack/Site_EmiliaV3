import { useEffect } from "react";

type Props = {
  items: string[];
  index: number | null;
  kind: "image" | "video";
  onClose: () => void;
  onNav: (next: number) => void;
};

export function Lightbox({ items, index, kind, onClose, onNav }: Props) {
  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNav((index + 1) % items.length);
      if (e.key === "ArrowLeft") onNav((index - 1 + items.length) % items.length);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [index, items.length, onClose, onNav]);

  if (index === null) return null;
  const src = items[index];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 p-4 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <button
        aria-label="Fermer"
        onClick={onClose}
        className="absolute right-5 top-5 text-2xl leading-none text-muted-foreground transition-colors hover:text-accent"
      >
        ×
      </button>
      <button
        aria-label="Précédent"
        onClick={(e) => {
          e.stopPropagation();
          onNav((index - 1 + items.length) % items.length);
        }}
        className="absolute left-3 text-3xl text-muted-foreground transition-colors hover:text-accent sm:left-8"
      >
        ‹
      </button>
      <div className="max-h-[85vh] w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
        {kind === "image" ? (
          <img
            src={src}
            alt=""
            className="mx-auto max-h-[85vh] w-auto rounded-sm shadow-film animate-scale-in"
          />
        ) : (
          <video
            src={src}
            controls
            autoPlay
            playsInline
            className="mx-auto max-h-[85vh] w-auto rounded-sm shadow-film animate-scale-in"
          />
        )}
      </div>
      <button
        aria-label="Suivant"
        onClick={(e) => {
          e.stopPropagation();
          onNav((index + 1) % items.length);
        }}
        className="absolute right-3 text-3xl text-muted-foreground transition-colors hover:text-accent sm:right-8"
      >
        ›
      </button>
      <span className="absolute bottom-6 font-sans text-xs tracking-[0.3em] text-muted-foreground">
        {index + 1} / {items.length}
      </span>
    </div>
  );
}
