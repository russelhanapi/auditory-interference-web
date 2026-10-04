import { useEffect, useRef, useState } from "react";
import { grantAccess, pinMatches } from "./access";
import { redirectToSpotify } from "./spotifyRedirect";
import { DiscField } from "./DiscField";
import { PinField } from "./PinField";

type Phase = "entry" | "decoding" | "peak" | "black" | "admitted";

function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function App() {
  const [digits, setDigits] = useState("");
  const [phase, setPhase] = useState<Phase>("entry");
  const [denied, setDenied] = useState(false);
  const [denyTick, setDenyTick] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const intensity = phase === "entry" ? digits.length : 0;

  useEffect(() => {
    if (phase !== "decoding") {
      return;
    }
    const wait = prefersReducedMotion() ? 220 : 800;
    const id = window.setTimeout(() => setPhase("peak"), wait);
    return () => window.clearTimeout(id);
  }, [phase]);

  useEffect(() => {
    if (phase !== "peak") {
      return;
    }
    const wait = prefersReducedMotion() ? 220 : 1500;
    const id = window.setTimeout(() => setPhase("black"), wait);
    return () => window.clearTimeout(id);
  }, [phase]);

  useEffect(() => {
    if (phase !== "black") {
      return;
    }
    const wait = prefersReducedMotion() ? 220 : 650;
    const id = window.setTimeout(() => setPhase("admitted"), wait);
    return () => window.clearTimeout(id);
  }, [phase]);

  useEffect(() => {
    if (phase !== "admitted") {
      return;
    }
    grantAccess();
    const wait = prefersReducedMotion() ? 400 : 1000;
    const id = window.setTimeout(() => {
      redirectToSpotify();
    }, wait);
    return () => window.clearTimeout(id);
  }, [phase]);

  useEffect(() => {
    if (denyTick === 0) {
      return;
    }
    inputRef.current?.focus();
  }, [denyTick]);

  function onValue(next: string) {
    if (phase !== "entry") {
      return;
    }
    if (denied) {
      setDenied(false);
    }
    if (next.length < 4) {
      setDigits(next);
      return;
    }
    if (pinMatches(next)) {
      setDigits("");
      setPhase("decoding");
      return;
    }
    setDigits("");
    setDenied(true);
    setDenyTick((tick) => tick + 1);
  }

  const reading = phase === "decoding" || phase === "peak";

  return (
    <main
      className="stage"
      data-intensity={intensity}
      data-phase={phase}
    >
      <div key={denyTick} className={denied ? "disc is-denied" : "disc"}>
        <DiscField />
        {phase === "entry" || reading ? (
          <h1 className="disc-band title">
            AUDITORY INTERFERENCE
          </h1>
        ) : null}
        {phase === "entry" ? (
          <>
            <div className="disc-hole">
              <PinField
                value={digits}
                denied={denied}
                describedBy={denied ? "access-denied" : undefined}
                inputRef={inputRef}
                onValue={onValue}
              />
            </div>
            <div className="disc-band disc-band-low">
              <label className="prompt" htmlFor="access-sequence">
                <span>ENTER ACCESS SEQUENCE</span>
              </label>
              {denied ? (
                <p
                  id="access-denied"
                  role="alert"
                  className="denied-copy"
                >
                  ACCESS DENIED
                </p>
              ) : null}
            </div>
          </>
        ) : null}
        {reading ? (
          <div className="disc-hole">
            <p role="status" className="decode-copy">
              DECRYPTING...
            </p>
          </div>
        ) : null}
      </div>
      {phase === "admitted" ? (
        <p className="admitted-copy">YOU'RE IN.</p>
      ) : null}
    </main>
  );
}
