import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowUpRight, Volume2, VolumeX } from "lucide-react";
import { IMAGES, VIDEOS, MUSIC } from "@/data/media";
import { Lightbox } from "@/components/Lightbox";
import { VideoTile } from "@/components/VideoTile";
import { Button } from "@/components/ui/button";
import { useReveal } from "@/hooks/useReveal";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Jade Emilia — Un univers rien qu'à toi" },
      { name: "description", content: "Un hommage en images, en musique et en mots pour Jade Emilia." },
      { property: "og:title", content: "Jade Emilia — Un univers rien qu'à toi" },
      { property: "og:description", content: "Un hommage en images, en musique et en mots pour Jade Emilia." },
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
  const [entered, setEntered] = useState(false);
  const [photo, setPhoto] = useState<number | null>(null);
  const [clip, setClip] = useState<number | null>(null);
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!entered) {
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = ""; };
    }
    document.body.style.overflow = "";
  }, [entered]);

  const enter = useCallback(() => {
    setEntered(true);
    const el = audioRef.current;
    if (el) {
      el.volume = 0.5;
      void el.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    }
  }, []);

  const toggleSound = useCallback(() => {
    const el = audioRef.current;
    if (!el) return;
    if (el.paused) {
      el.volume = 0.5;
      void el.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    } else {
      el.pause();
      setPlaying(false);
    }
  }, []);

  return (
    <main className="relative min-h-screen overflow-x-clip bg-background text-foreground">
      <video ref={audioRef} src={MUSIC} loop playsInline className="hidden" />

      {!entered && (
        <div className="intro-screen fixed inset-0 z-[60] flex items-center justify-center overflow-hidden" aria-label="Ouverture de Jade Emilia">
          <div className="intro-film absolute inset-0" />
          <div className="intro-beam absolute inset-0" />
          <div className="intro-frame absolute inset-5 sm:inset-9" />
          <div className="relative z-10 flex w-full flex-col items-center px-4 text-center">
            <p className="intro-kicker mb-7 font-sans text-[10px] font-semibold uppercase tracking-[0.38em] text-primary sm:text-xs">Une histoire à part</p>
            <div className="intro-mark relative w-full max-w-6xl">
              <span className="intro-echo absolute inset-0 block font-intro text-[clamp(3.2rem,13vw,10rem)] leading-none uppercase text-primary" aria-hidden="true">Jade<br className="sm:hidden" /> Emilia</span>
              <h1 className="intro-name relative font-intro text-[clamp(3.2rem,13vw,10rem)] leading-none uppercase text-foreground">Jade<br className="sm:hidden" /> Emilia</h1>
            </div>
            <span className="intro-line mt-9 h-px w-36 bg-primary" />
            <p className="intro-subtitle mt-6 font-display text-xl italic text-foreground/85 sm:text-2xl">Le monde, un peu plus beau avec toi.</p>
            <Button onClick={enter} className="intro-enter mt-12 h-12 gap-3 border border-primary/60 bg-primary px-7 font-sans text-xs font-bold uppercase tracking-[0.18em] text-primary-foreground shadow-glow hover:bg-accent sm:mt-14">
              Entrer dans son univers <ArrowUpRight aria-hidden="true" />
            </Button>
          </div>
          <div className="intro-bottom absolute bottom-8 left-0 right-0 flex justify-center font-sans text-[10px] uppercase tracking-[0.26em] text-foreground/60">Une expérience à vivre avec le son</div>
        </div>
      )}

      <section className="hero-scene relative flex min-h-[85svh] items-end overflow-hidden px-6 pb-16 pt-20 sm:min-h-[90svh] sm:px-12 sm:pb-20 lg:px-20">
        <video src={VIDEOS[0]} autoPlay muted loop playsInline preload="metadata" className="hero-video absolute inset-0 h-full w-full object-cover" />
        <div className="hero-tint absolute inset-0" />
        <div className="hero-wash absolute inset-0" />
        <div className="hero-edge absolute left-0 top-0 h-full w-1 bg-primary" />
        <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-start">
          <p className="mb-4 flex items-center gap-3 font-sans text-[10px] font-semibold uppercase tracking-[0.27em] text-primary sm:text-xs"><span className="h-px w-8 bg-primary" /> Pour toi, et personne d'autre</p>
          <h2 className="hero-heading max-w-[10ch] font-intro text-[clamp(4rem,13vw,12rem)] uppercase leading-[0.82] text-foreground">Jade<br />Emilia<span className="text-primary">.</span></h2>
          <div className="mt-7 flex w-full max-w-xl items-end justify-between gap-5 border-t border-foreground/40 pt-5">
            <p className="font-display text-xl italic leading-snug text-foreground sm:text-3xl">Certaines présences changent tout.</p>
            <a href="#photographies" aria-label="Voir les photographies" className="hero-scroll flex size-11 shrink-0 items-center justify-center border border-foreground/60 text-foreground transition-colors hover:border-primary hover:text-primary"><ArrowDown size={18} /></a>
          </div>
        </div>
        <span className="absolute bottom-5 right-6 font-sans text-[10px] font-bold uppercase tracking-[0.24em] text-foreground/70 sm:right-12">01 / 03</span>
      </section>

      <div className="marquee-band overflow-hidden border-y border-border bg-primary py-3 text-primary-foreground" aria-hidden="true">
        <div className="marquee-track flex w-max gap-12 font-sans text-xs font-bold uppercase tracking-[0.24em]">
          {Array.from({ length: 8 }, (_, i) => <span key={i}>JADE EMILIA <span className="mx-6">✦</span> Une histoire à part</span>)}
        </div>
      </div>

      <section id="photographies" className="light-scene relative overflow-hidden px-5 py-20 sm:px-8 sm:py-28">
        <div className="scene-lines pointer-events-none absolute inset-0" />
        <SectionTitle eyebrow="01 / Instants" title="Photographies" count={IMAGES.length} />
        <div className="relative mx-auto mt-12 max-w-6xl columns-2 gap-3 sm:mt-16 sm:columns-3 sm:gap-5 lg:columns-4 [&>*]:mb-3 sm:[&>*]:mb-5">
          {IMAGES.map((src, i) => (
            <Button variant="ghost" key={src} onClick={() => setPhoto(i)} className="reveal photo-tile group relative block h-auto w-full overflow-hidden rounded-none p-0 shadow-film" aria-label={`Ouvrir la photographie ${i + 1}`}>
              <img src={src} alt={`Souvenir de Jade Emilia, photographie ${i + 1}`} loading="lazy" className="h-auto w-full transition-transform duration-700 group-hover:scale-[1.06]" />
              <span className="absolute bottom-0 left-0 right-0 flex items-center justify-between bg-gradient-to-t from-background/80 to-transparent px-3 pb-3 pt-8 font-sans text-[10px] text-foreground opacity-0 transition-opacity duration-300 group-hover:opacity-100">{String(i + 1).padStart(2, "0")}<ArrowUpRight size={14} /></span>
            </Button>
          ))}
        </div>
      </section>

      <section id="sequences" className="purple-scene relative overflow-hidden px-5 py-20 sm:px-8 sm:py-28">
        <div className="purple-light pointer-events-none absolute inset-0" />
        <SectionTitle eyebrow="02 / En mouvement" title="Séquences" count={VIDEOS.length} />
        <div className="relative mx-auto mt-12 grid max-w-6xl grid-cols-2 gap-3 sm:mt-16 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">
          {VIDEOS.map((src, i) => (
            <div key={src} className="reveal"><VideoTile src={src} label={String(i + 1).padStart(2, "0")} onOpen={() => setClip(i)} /></div>
          ))}
        </div>
      </section>

      <section id="mots" className="words-scene relative overflow-hidden px-6 py-24 sm:py-36">
        <div className="words-light pointer-events-none absolute inset-0" />
        <div className="relative mx-auto max-w-3xl">
          <SectionTitle eyebrow="03 / Pour toi" title="Ce que les mots peinent à dire" />
          <span className="mx-auto mt-10 block h-px w-20 bg-primary" />
          <div className="mt-14 space-y-9 sm:mt-20 sm:space-y-12">
            {MESSAGE.map((p, i) => <p key={i} className="reveal font-display text-xl leading-[1.5] text-foreground sm:text-[1.7rem]">{p}</p>)}
          </div>
        </div>
      </section>

      <section className="final-scene relative flex min-h-[65svh] flex-col items-center justify-center overflow-hidden px-6 py-20 text-center">
        <div className="final-shimmer absolute inset-0" />
        <p className="relative font-sans text-[10px] font-semibold uppercase tracking-[0.4em] text-primary">À jamais une histoire à part</p>
        <h2 className="reveal relative mt-8 font-intro text-[clamp(3.5rem,12vw,10rem)] uppercase leading-none text-foreground">Jade Emilia<span className="text-primary">.</span></h2>
        <span className="relative mt-10 h-px w-24 bg-primary" />
        <p className="relative mt-7 font-display text-xl italic text-foreground/80">Fin du film. Pas de l'histoire.</p>
      </section>

      {entered && <Button onClick={toggleSound} variant="outline" size="icon" aria-label={playing ? "Couper la musique" : "Activer la musique"} title={playing ? "Couper la musique" : "Activer la musique"} className="fixed bottom-5 right-5 z-40 size-11 rounded-none border-primary/50 bg-secondary text-primary shadow-film hover:bg-primary hover:text-primary-foreground">{playing ? <Volume2 /> : <VolumeX />}</Button>}

      <Lightbox items={IMAGES} index={photo} kind="image" onClose={() => setPhoto(null)} onNav={setPhoto} />
      <Lightbox items={VIDEOS} index={clip} kind="video" onClose={() => setClip(null)} onNav={setClip} />
    </main>
  );
}

function SectionTitle({ eyebrow, title, count }: { eyebrow: string; title: string; count?: number }) {
  return (
    <div className="reveal relative mx-auto max-w-6xl text-center">
      <p className="font-sans text-[10px] font-bold uppercase tracking-[0.32em] text-primary">{eyebrow}</p>
      <h2 className="mt-4 font-display text-[clamp(2.7rem,7vw,5.5rem)] leading-[1.04] text-foreground">{title}</h2>
      {count !== undefined && <p className="mt-4 font-sans text-xs tracking-[0.22em] text-muted-foreground">— {String(count).padStart(2, "0")} —</p>}
    </div>
  );
}