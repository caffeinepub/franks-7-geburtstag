import { useEffect, useState } from "react";
import { MapPin, Phone, Flame, Heart } from "lucide-react";

// ── Timing constants ──────────────────────────────────────────────────────────
const BIRTHDAY = new Date("2026-03-23T00:00:00");

function getDaysUntilBirthday(): number {
  const now = new Date();
  const diff = BIRTHDAY.getTime() - now.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

function formatCountdown(days: number): { number: string; label: string } {
  if (days <= 0) return { number: "🎂", label: "Heute ist der große Tag!" };
  if (days === 1) return { number: "1", label: "Tag noch!" };
  return { number: String(days), label: "Tage noch!" };
}

// ── Ember particle component ──────────────────────────────────────────────────
interface EmberProps {
  style: React.CSSProperties;
}

function Ember({ style }: EmberProps) {
  return <span className="particle" style={style} />;
}

// ── Main App ─────────────────────────────────────────────────────────────────
export default function App() {
  const [days] = useState(() => getDaysUntilBirthday());
  const { number: countdownNum, label: countdownLabel } = formatCountdown(days);

  // Generate stable ember particles
  const embers = Array.from({ length: 18 }, (_, i) => {
    const size = 3 + (i % 5) * 2;
    const colors = [
      "oklch(0.72 0.22 48)",
      "oklch(0.82 0.18 65)",
      "oklch(0.88 0.19 90)",
      "oklch(0.62 0.22 30)",
      "oklch(0.78 0.20 55)",
    ];
    return {
      id: i,
      style: {
        width: size,
        height: size,
        left: `${(i * 5.8 + 3) % 94}%`,
        bottom: "0%",
        backgroundColor: colors[i % colors.length],
        boxShadow: `0 0 ${size * 2}px ${colors[i % colors.length]}`,
        "--duration": `${1.8 + (i % 4) * 0.7}s`,
        "--delay": `${(i * 0.28) % 2.5}s`,
        "--drift": `${((i % 7) - 3) * 15}px`,
      } as React.CSSProperties,
    };
  });

  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        background:
          "radial-gradient(ellipse 80% 60% at 50% 100%, oklch(0.22 0.10 38) 0%, oklch(0.12 0.04 35) 45%, oklch(0.08 0.02 30) 100%)",
        fontFamily: "'Nunito', sans-serif",
      }}
    >
      {/* ── Ember field ────────────────────────────────────────────────────── */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {embers.map((e) => (
          <Ember key={e.id} style={e.style} />
        ))}
      </div>

      {/* ── Main content ───────────────────────────────────────────────────── */}
      <main className="relative z-10 flex-1 flex flex-col items-center px-4 py-8 md:py-12">
        {/* Photo ── */}
        <div
          className="animate-photo-reveal w-full max-w-md mb-8"
          style={{ animationDuration: "0.9s" }}
        >
          <div
            className="relative rounded-2xl overflow-hidden"
            style={{
              boxShadow:
                "0 0 0 3px oklch(0.72 0.22 48 / 0.5), 0 0 40px oklch(0.72 0.22 48 / 0.25), 0 16px 48px oklch(0.08 0.02 30 / 0.7)",
            }}
          >
            <img
              src="/assets/uploads/Frank-7-Jahre-Geburstag-1.jpg"
              alt="Frank am Lagerfeuer"
              className="w-full object-cover"
              style={{ maxHeight: "420px", objectPosition: "center top" }}
            />
            {/* Flame overlay at bottom of photo */}
            <div
              className="absolute bottom-0 left-0 right-0 h-24"
              style={{
                background:
                  "linear-gradient(to top, oklch(0.18 0.08 38) 0%, transparent 100%)",
              }}
            />
          </div>
        </div>

        {/* Countdown card ── */}
        <div
          className="card-ember rounded-2xl p-6 md:p-8 w-full max-w-md mb-6 text-center animate-fade-up delay-200"
          style={{ animationFillMode: "both" }}
        >
          <p
            className="text-lg font-bold mb-2 glow-subtle"
            style={{ color: "oklch(0.78 0.12 70)" }}
          >
            Hallo Freunde, in genau
          </p>

          <div className="flex items-baseline justify-center gap-3 mb-2">
            <span
              className="font-display animate-countdown-pulse glow-flame leading-none"
              style={{
                fontSize: "clamp(5rem, 22vw, 8rem)",
                color: "oklch(0.88 0.19 85)",
                fontFamily: "'Fredoka One', cursive",
              }}
            >
              {countdownNum}
            </span>
            {days > 0 && (
              <span
                className="font-display text-4xl md:text-5xl glow-subtle leading-tight"
                style={{
                  color: "oklch(0.72 0.22 55)",
                  fontFamily: "'Fredoka One', cursive",
                }}
              >
                {days === 1 ? "Tag" : "Tage"}
              </span>
            )}
          </div>

          <h1
            className="font-display text-2xl md:text-3xl glow-flame leading-snug"
            style={{
              color: "oklch(0.88 0.20 72)",
              fontFamily: "'Fredoka One', cursive",
            }}
          >
            {days > 0
              ? `werde ich 7 Jahre alt! 🎉`
              : `Heute werde ich 7 Jahre alt! 🎂`}
          </h1>
        </div>

        {/* Invitation text card ── */}
        <div
          className="card-ember rounded-2xl p-6 md:p-8 w-full max-w-md mb-6 animate-fade-up delay-300"
          style={{ animationFillMode: "both" }}
        >
          <div className="flex items-center gap-2 mb-4">
            <Flame
              className="animate-flicker"
              style={{
                color: "oklch(0.72 0.22 48)",
                width: 22,
                height: 22,
                flexShrink: 0,
              }}
            />
            <h2
              className="font-display text-xl"
              style={{
                color: "oklch(0.82 0.18 65)",
                fontFamily: "'Fredoka One', cursive",
              }}
            >
              Ihr seid eingeladen!
            </h2>
          </div>

          <p
            className="leading-relaxed text-base md:text-lg"
            style={{ color: "oklch(0.88 0.06 75)" }}
          >
            Leider ist das ein Montag und ich bin in der Schule. Aber so gegen{" "}
            <strong style={{ color: "oklch(0.88 0.19 85)" }}>17:00 Uhr</strong>{" "}
            würde ich Euch gerne einladen, mit mir ein kleines{" "}
            <strong style={{ color: "oklch(0.82 0.20 55)" }}>
              Lagerfeuer zu machen
            </strong>{" "}
            und ein paar Würstchen zu grillen. Ich denke um spätestens{" "}
            <strong style={{ color: "oklch(0.88 0.19 85)" }}>19:30 Uhr</strong>{" "}
            sind wir damit fertig, weil wir ja am nächsten Tag wieder Schule
            haben.
          </p>
        </div>

        {/* Location ── */}
        <div
          className="card-ember rounded-2xl p-5 md:p-6 w-full max-w-md mb-4 animate-fade-up delay-400"
          style={{ animationFillMode: "both" }}
        >
          <div className="flex items-start gap-3">
            <MapPin
              style={{ color: "oklch(0.72 0.22 48)", flexShrink: 0, marginTop: 2 }}
              size={22}
            />
            <div>
              <p
                className="font-bold text-base"
                style={{ color: "oklch(0.82 0.18 65)" }}
              >
                Wo? Bei mir im Garten hinterm Haus:
              </p>
              <p
                className="text-lg mt-1"
                style={{ color: "oklch(0.88 0.06 75)" }}
              >
                Plüschowstrasse 14
                <br />
                42285 Wuppertal
              </p>
            </div>
          </div>
        </div>

        {/* Contact ── */}
        <div
          className="card-ember rounded-2xl p-5 md:p-6 w-full max-w-md mb-6 animate-fade-up delay-500"
          style={{ animationFillMode: "both" }}
        >
          <div className="flex items-start gap-3">
            <Phone
              style={{ color: "oklch(0.72 0.22 48)", flexShrink: 0, marginTop: 2 }}
              size={22}
            />
            <div>
              <p
                className="font-semibold text-sm mb-1"
                style={{ color: "oklch(0.65 0.08 60)" }}
              >
                Fragen? Sprecht Papa an:
              </p>
              <a
                href="tel:+491632395102"
                className="text-xl font-bold transition-all hover:scale-105 inline-block"
                style={{
                  color: "oklch(0.88 0.19 85)",
                  textShadow: "0 0 12px oklch(0.88 0.19 85 / 0.4)",
                }}
              >
                +49 163 239 51 02
              </a>
            </div>
          </div>
        </div>

        {/* Closing note ── */}
        <div
          className="rounded-2xl p-5 md:p-6 w-full max-w-md mb-8 text-center animate-fade-up delay-600"
          style={{
            animationFillMode: "both",
            background: "oklch(0.16 0.06 38 / 0.6)",
            border: "1px solid oklch(0.72 0.22 48 / 0.15)",
          }}
        >
          <p
            className="text-base md:text-lg leading-relaxed italic"
            style={{ color: "oklch(0.78 0.07 70)" }}
          >
            Das ist keine offizielle Party, nur ein kleines Lagerfeuer,{" "}
            <strong style={{ color: "oklch(0.82 0.10 70)" }}>
              daher brauche ich auch keine Geschenke.
            </strong>
          </p>
          <p
            className="mt-4 text-xl font-display glow-subtle"
            style={{
              color: "oklch(0.88 0.19 80)",
              fontFamily: "'Fredoka One', cursive",
            }}
          >
            Ich freue mich! 🔥
          </p>
          <p
            className="mt-2 text-2xl font-display glow-flame"
            style={{
              color: "oklch(0.88 0.22 72)",
              fontFamily: "'Fredoka One', cursive",
            }}
          >
            Euer Frank
          </p>
        </div>
      </main>

      {/* ── Footer ─────────────────────────────────────────────────────────── */}
      <footer
        className="relative z-10 text-center py-4 text-xs"
        style={{ color: "oklch(0.45 0.04 50)" }}
      >
        © 2026. Built with{" "}
        <Heart
          className="inline"
          size={12}
          style={{ color: "oklch(0.72 0.22 48)" }}
        />{" "}
        using{" "}
        <a
          href="https://caffeine.ai"
          className="underline hover:opacity-80 transition-opacity"
          style={{ color: "oklch(0.55 0.06 55)" }}
          target="_blank"
          rel="noreferrer"
        >
          caffeine.ai
        </a>
      </footer>
    </div>
  );
}
