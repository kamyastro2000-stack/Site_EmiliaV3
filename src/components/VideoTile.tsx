import { useEffect, useRef, useState } from "react";

/** Vignette vidéo : ne charge la vidéo que lorsqu'elle approche de l'écran. */
export function VideoTile({
  src,
  label,
  onOpen,
}: {
  src: string;
  label: string;
  onOpen: () => void;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: "300px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <button
      ref={ref}
      onClick={onOpen}
      className="group relative block aspect-[9/16] w-full overflow-hidden rounded-sm bg-secondary shadow-film"
      aria-label={`Lire la séquence ${label}`}
    >
      {visible ? (
        <video
          src={`${src}#t=0.8`}
          preload="metadata"
          muted
          playsInline
          className="h-full w-full object-cover opacity-80 transition duration-700 group-hover:scale-[1.03] group-hover:opacity-100"
        />
      ) : null}
      <span className="pointer-events-none absolute inset-0 bg-background/30 transition-opacity duration-500 group-hover:opacity-0" />
      <span className="pointer-events-none absolute bottom-3 left-3 font-sans text-[10px] tracking-[0.3em] text-foreground/80">
        {label}
      </span>
    </button>
  );
}
