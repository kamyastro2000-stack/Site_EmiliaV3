import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { IMAGES, VIDEOS, MUSIC } from "@/data/media";
import { Lightbox } from "@/components/Lightbox";
import { VideoTile } from "@/components/VideoTile";
import { useReveal } from "@/hooks/useReveal";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Jade Emilia" },
      {
        name: "description",
        content:
          "Un film en forme de site : photographies, séquences et un texte, pour Jade Emilia.",
      },
      { property: "og:title", content: "Jade Emilia" },
      {
        property: "og:description",
        content:
          "Un film en forme de site : photographies, séquences et un texte, pour Jade Emilia.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Index,
});

const MESSAGE = [
  `Il y a des présences qu'on ne remarque pas tout de suite. Elles n'annoncent rien, ne cherchent rien, et pourtant un jour on réalise qu'elles ont toujours été là, quelque part entre les lignes du quotidien, discrètes et presque évidentes à la fois. La tienne fait partie de celles-là.`,
  `Il y a des jours qui ressemblent à tous les autres, et puis il y a ceux où quelque chose change de texture sans qu'on sache vraiment pourquoi. Un mot, un silence, une manière d'être là suffisent parfois à déplacer légèrement la lumière sur les choses. Ce n'est jamais spectaculaire. C'est plus discret que ça, plus profond aussi, comme une évidence qui n'a pas besoin d'être annoncée pour exister.`,
  `Certaines personnes traversent une vie sans y laisser de trace particulière. D'autres, sans faire de bruit, redessinent la manière dont on regarde le monde. Tu appartiens à la seconde catégorie, et il n'existe pas vraiment de mots simples pour dire ça sans le trahir un peu.`,
  `Alors ce site est plutôt une tentative, sans doute maladroite, de montrer ce que les mots peinent à formuler correctement : que ta présence compte plus que ce qu'elle laisse paraître, et que certaines rencontres n'ont besoin d'aucune explication pour rester précieuses.`,
];

function Index() {
  useReveal();
  const [intro, setIntro] = useState(true);
  const [photo, setPhoto] = useState<number | null>(null);
  const [clip, setClip] = useState<number | null>(null);
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setIntro(false), 4600);
    return () => clearTimeout(t);
  }, []);

  // La musique démarre à la première interaction de la page.
  useEffect(() => {
    const start = () => {
      const el = audioRef.current;
      if (!el) return;
      el.volume = 0.5;
      el.play().then(
        () => setPlaying(true),
        () => setPlaying(false),
      );
    };
    window.addEventListener("pointerdown", start, { once: true });
    window.addEventListener("keydown", start, { once: true });
    return () => {
      window.removeEventListener("pointerdown", start);
      window.removeEventListener("keydown", start);
    };
  }, []);

  const toggleSound = useCallback(() => {
    const el = audioRef.current;
    if (!el) return;
    if (el.paused) {
      el.volume = 0.5;
      void el.play();
      setPlaying(true);
    } else {
      el.pause();
      setPlaying(false);
    }
  }, []);

  return (
    <main className="relative min-h-screen bg-background text-foreground">
      {/* Bande son */}
      <video ref={audioRef} src={MUSIC} loop playsInline className="hidden" />

      {/* Générique d'ouverture */}
      {intro ? (
        <div className="curtain-out fixed inset-0 z-[60] flex flex-col items-center justify-center bg-background">
          <h1 className="title-cinema title-sheen px-4 text-center text-[clamp(2.5rem,11vw,7rem)] uppercase tracking-[0.22em]">
            Jade Emilia
          </h1>
          <span className="rule-grow mt-6 block h-px w-32 bg-primary" />
        </div>
      ) : null}

      {/* Ouverture */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6">
        <video
          src={VIDEOS[0]}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/40 to-background" />
        <div className="relative text-center">
          <p className="font-sans text-[11px] uppercase tracking-[0.5em] text-primary">
            Un film en forme de site
          </p>
          <h2 className="mt-6 text-[clamp(2.5rem,9vw,6rem)] uppercase tracking-[0.2em]">
            Jade Emilia
          </h2>
          <span className="mx-auto mt-8 block h-px w-24 bg-primary/70" />
          <p className="mt-8 font-sans text-xs uppercase tracking-[0.35em] text-muted-foreground">
            Faire défiler
          </p>
        </div>
      </section>

      {/* Photographies */}
      <section className="px-5 py-24 sm:px-8">
        <SectionTitle eyebrow="Chapitre I" title="Photographies" count={IMAGES.length} />
        <div className="mx-auto mt-16 max-w-6xl columns-2 gap-4 sm:columns-3 lg:columns-4 [&>*]:mb-4">
          {IMAGES.map((src, i) => (
            <button
              key={src}
              onClick={() => setPhoto(i)}
              className="reveal group block w-full overflow-hidden rounded-sm shadow-film"
              aria-label={`Ouvrir la photographie ${i + 1}`}
            >
              <img
                src={src}
                alt=""
                loading="lazy"
                className="w-full transition duration-700 group-hover:scale-[1.03]"
              />
            </button>
          ))}
        </div>
      </section>

      {/* Séquences */}
      <section className="px-5 py-24 sm:px-8">
        <SectionTitle eyebrow="Chapitre II" title="Séquences" count={VIDEOS.length} />
        <div className="mx-auto mt-16 grid max-w-6xl grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {VIDEOS.map((src, i) => (
            <div key={src} className="reveal">
              <VideoTile
                src={src}
                label={String(i + 1).padStart(2, "0")}
                onOpen={() => setClip(i)}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Texte */}
      <section className="px-6 py-28">
        <div className="mx-auto max-w-2xl">
          <SectionTitle eyebrow="Chapitre III" title="Ce que les mots peinent à dire" />
          <div className="mt-14 space-y-8">
            {MESSAGE.map((p, i) => (
              <p
                key={i}
                className="reveal font-display text-lg leading-relaxed text-foreground/90 sm:text-xl"
              >
                {p}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Fin */}
      <section className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
        <span className="h-px w-24 bg-primary/70" />
        <h2 className="reveal mt-10 text-[clamp(2rem,7vw,4.5rem)] uppercase tracking-[0.2em]">
          Jade Emilia
        </h2>
        <p className="reveal mt-6 font-sans text-xs uppercase tracking-[0.4em] text-muted-foreground">
          Fin
        </p>
      </section>

      {/* Son */}
      <button
        onClick={toggleSound}
        className="fixed bottom-5 right-5 z-40 rounded-sm border border-border bg-background/80 px-4 py-2 font-sans text-[10px] uppercase tracking-[0.3em] text-muted-foreground backdrop-blur transition-colors hover:text-accent"
      >
        {playing ? "Son actif" : "Son coupé"}
      </button>

      <Lightbox
        items={IMAGES}
        index={photo}
        kind="image"
        onClose={() => setPhoto(null)}
        onNav={setPhoto}
      />
      <Lightbox
        items={VIDEOS}
        index={clip}
        kind="video"
        onClose={() => setClip(null)}
        onNav={setClip}
      />
    </main>
  );
}

function SectionTitle({
  eyebrow,
  title,
  count,
}: {
  eyebrow: string;
  title: string;
  count?: number;
}) {
  return (
    <div className="reveal mx-auto max-w-6xl text-center">
      <p className="font-sans text-[10px] uppercase tracking-[0.5em] text-primary">{eyebrow}</p>
      <h2 className="mt-5 text-[clamp(1.8rem,5vw,3.2rem)] uppercase tracking-[0.18em]">{title}</h2>
      {count ? (
        <p className="mt-4 font-sans text-[11px] tracking-[0.3em] text-muted-foreground">
          {count}
        </p>
      ) : null}
    </div>
  );
}
