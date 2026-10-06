interface CurrentPathSpec {
  d: string;
  color: "sunset" | "mist";
  delayMs: number;
}

// Starts after the logo/pause/tagline beats (500 + 450 + 500 = 1450ms,
// rounded down slightly) so the Current only begins once the identity
// moment has settled.
const REVEAL_DELAY_MS = 1400;
const REVEAL_DURATION_MS = 1200;

// Two hand-authored, asymmetric bezier paths per breakpoint — not one path
// rescaled. Desktop: shallow diagonal, wide exit spread. Mobile: steep,
// near-vertical, single shared exit point. Values are reasoned estimates,
// not measured against a real render — flagged for validation.
const desktopPaths: CurrentPathSpec[] = [
  { d: "M 48 0 C 40 25, 20 45, 22 65 C 24 82, 12 92, 10 100", color: "sunset", delayMs: 0 },
  { d: "M 52 0 C 65 20, 78 35, 80 55 C 82 75, 88 88, 90 100", color: "mist", delayMs: 80 },
];

const mobilePaths: CurrentPathSpec[] = [
  {
    d: "M 48 0 C 44 20, 40 35, 44 50 C 46 62, 42 72, 46 82 C 47 88, 49 94, 50 100",
    color: "sunset",
    delayMs: 0,
  },
  {
    d: "M 52 0 C 56 18, 60 32, 56 48 C 54 60, 58 70, 54 80 C 53 87, 51 93, 50 100",
    color: "mist",
    delayMs: 80,
  },
];

function CurrentPaths({ paths }: { paths: CurrentPathSpec[] }) {
  return (
    <>
      {paths.map((path) => (
        <path
          key={path.color}
          d={path.d}
          vectorEffect="non-scaling-stroke"
          strokeLinecap="round"
          fill="none"
          className={path.color === "sunset" ? "stroke-sunset" : "stroke-mist"}
          style={{
            strokeWidth: "clamp(3px, 0.4vw, 6px)",
            animation: `arrival-current-reveal ${REVEAL_DURATION_MS}ms cubic-bezier(0.16, 1, 0.3, 1) ${
              REVEAL_DELAY_MS + path.delayMs
            }ms both`,
          }}
        />
      ))}
    </>
  );
}

interface CurrentProps {
  className?: string;
}

/**
 * The Current — two flowing lines extending outward from the logo,
 * representing the journey that follows the confluence the static logo
 * already depicts. Reveals via a top-to-bottom clip-path wipe on mount (see
 * `arrival-current-reveal` in globals.css); a dash reveal truncates under
 * non-scaling-stroke because its length is in screen pixels. Stroke width is intentionally
 * uniform, not tapered — true per-point taper would need a filled-ribbon
 * path instead of a stroked line; deferred as a refinement, not attempted
 * here. `prefers-reduced-motion` is handled automatically by the existing
 * global rule (collapses the animation duration to ~0) — no special-case
 * code needed in this component.
 */
export function Current({ className }: CurrentProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden="true"
      className={["pointer-events-none", className].filter(Boolean).join(" ")}
    >
      {/* visibility, not display: display:none cancels the reveal animation,
          so crossing the breakpoint mid-reveal would replay it from blank. */}
      <g className="invisible tablet:visible">
        <CurrentPaths paths={desktopPaths} />
      </g>
      <g className="visible tablet:invisible">
        <CurrentPaths paths={mobilePaths} />
      </g>
    </svg>
  );
}
