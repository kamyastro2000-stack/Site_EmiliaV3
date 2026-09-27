import { useEffect, useRef, useState } from "react";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";

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
    <Button
      variant="ghost"
      ref={ref}
      onClick={onOpen}
      className="group relative block aspect-[9/16] h-auto w-full overflow-hidden rounded-none bg-secondary p-0 shadow-film"
      aria-label={`Lire la séquence ${label}`}
    >
      {visible ? (
        <video
          src={`${src}#t=0.8`}
          preload="metadata"
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover opacity-90 transition duration-700 group-hover:scale-[1.05] group-hover:opacity-100"
        />
      ) : null}
      <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-secondary/70 via-transparent to-transparent" />
      <span className="pointer-events-none absolute inset-0 flex items-center justify-center"><Play className="size-10 fill-primary/70 text-primary drop-shadow-lg transition-transform duration-300 group-hover:scale-125" /></span>
      <span className="pointer-events-none absolute bottom-3 left-3 font-sans text-[10px] tracking-[0.3em] text-secondary-foreground">
        {label}
      </span>
    </Button>
  );
}
