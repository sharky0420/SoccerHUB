import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

export function MapPinIcon({ className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth={1.8}
      stroke="currentColor"
      className={className}
      aria-hidden
      {...props}
    >
      <path
        d="M12 21s-6.5-6.16-6.5-11.08A6.5 6.5 0 0 1 12 3a6.5 6.5 0 0 1 6.5 6.92C18.5 14.84 12 21 12 21Z"
        strokeLinejoin="round"
      />
      <circle cx={12} cy={9.5} r={2.6} />
    </svg>
  );
}

export function TargetIcon({ className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth={1.8}
      stroke="currentColor"
      className={className}
      aria-hidden
      {...props}
    >
      <path d="M12 3v3M12 18v3M21 12h-3M6 12H3" strokeLinecap="round" />
      <circle cx={12} cy={12} r={6.2} />
      <circle cx={12} cy={12} r={2.8} />
    </svg>
  );
}

export function SearchIcon({ className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth={1.8}
      stroke="currentColor"
      className={className}
      aria-hidden
      {...props}
    >
      <circle cx={11} cy={11} r={6.5} />
      <path d="m15.5 15.5 3.75 3.75" strokeLinecap="round" />
    </svg>
  );
}

export function ClockIcon({ className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth={1.8}
      stroke="currentColor"
      className={className}
      aria-hidden
      {...props}
    >
      <circle cx={12} cy={12} r={8.5} />
      <path d="M12 7.5V12l3.5 2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function EuroIcon({ className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth={1.8}
      stroke="currentColor"
      className={className}
      aria-hidden
      {...props}
    >
      <path
        d="M18.5 7.2a6.5 6.5 0 0 0-10.7 2.2H5.5m2.3 5.4A6.5 6.5 0 0 0 18.5 16m-13-2h2.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function WifiIcon({ className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth={1.6}
      stroke="currentColor"
      className={className}
      aria-hidden
      {...props}
    >
      <path d="M4 9.5a12 12 0 0 1 16 0M7 13a7.5 7.5 0 0 1 10 0M10.5 16.5a3 3 0 0 1 3 0" strokeLinecap="round" />
      <circle cx={12} cy={19.2} r={1.2} fill="currentColor" stroke="none" />
    </svg>
  );
}

export function ParkingIcon({ className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth={1.8}
      stroke="currentColor"
      className={className}
      aria-hidden
      {...props}
    >
      <rect x={4} y={3.5} width={16} height={17} rx={3} />
      <path d="M9 16V8h4.2a2.4 2.4 0 0 1 0 4.8H9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ShowerIcon({ className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth={1.8}
      stroke="currentColor"
      className={className}
      aria-hidden
      {...props}
    >
      <path d="M4 4h9.5a4.5 4.5 0 0 1 4.5 4.5V12" strokeLinecap="round" />
      <path d="M9 12v7M6 12v7M12 12v7" strokeLinecap="round" />
      <circle cx={18} cy={14} r={1} fill="currentColor" stroke="none" />
      <circle cx={18} cy={17} r={1} fill="currentColor" stroke="none" />
    </svg>
  );
}

export function LockerIcon({ className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth={1.8}
      stroke="currentColor"
      className={className}
      aria-hidden
      {...props}
    >
      <rect x={5} y={4} width={6.5} height={16} rx={1.5} />
      <rect x={12.5} y={4} width={6.5} height={16} rx={1.5} />
      <path d="M9 9h.01M9 12h.01M15.5 9h.01M15.5 12h.01" strokeLinecap="round" />
    </svg>
  );
}

export function CafeIcon({ className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth={1.8}
      stroke="currentColor"
      className={className}
      aria-hidden
      {...props}
    >
      <path d="M4.5 8.5h11.5a3.5 3.5 0 0 1 0 7H15" strokeLinecap="round" />
      <path d="M6 8.5v3.5a5 5 0 0 0 5 5h1a5 5 0 0 0 5-5V8.5" />
      <path d="M7 19h8" strokeLinecap="round" />
    </svg>
  );
}

export function ShopIcon({ className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth={1.8}
      stroke="currentColor"
      className={className}
      aria-hidden
      {...props}
    >
      <path d="M5 11.5V20h14v-8.5M3.5 8l2 3.5h13L20.5 8 18 4H6l-2.5 4Z" strokeLinejoin="round" />
      <path d="M9 14h6" strokeLinecap="round" />
    </svg>
  );
}

export function CardIcon({ className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth={1.8}
      stroke="currentColor"
      className={className}
      aria-hidden
      {...props}
    >
      <rect x={3.5} y={7} width={17} height={10} rx={2.5} />
      <path d="M5 10h14" strokeLinecap="round" />
      <path d="M7.5 14h2" strokeLinecap="round" />
    </svg>
  );
}

export function AccessibilityIcon({ className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth={1.8}
      stroke="currentColor"
      className={className}
      aria-hidden
      {...props}
    >
      <circle cx={12} cy={5.5} r={2} />
      <path d="M12 7.5v5M7 9l5 1.5 5-1.5M12 12.5l-3 7.5m3-7.5 3 7.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ACIcon({ className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth={1.8}
      stroke="currentColor"
      className={className}
      aria-hidden
      {...props}
    >
      <path d="M12 4v16M4 12h16" strokeLinecap="round" />
      <path d="m6.5 6.5 11 11m0-11-11 11" opacity={0.6} />
    </svg>
  );
}

export function GymIcon({ className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth={1.8}
      stroke="currentColor"
      className={className}
      aria-hidden
      {...props}
    >
      <rect x={4} y={9} width={4} height={6} rx={1} />
      <rect x={16} y={9} width={4} height={6} rx={1} />
      <path d="M8 12h8" strokeLinecap="round" />
      <path d="M2.5 10.5v3m19-3v3" strokeLinecap="round" />
    </svg>
  );
}

export function CourseIcon({ className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth={1.8}
      stroke="currentColor"
      className={className}
      aria-hidden
      {...props}
    >
      <path d="M5 5h14v10H5z" strokeLinejoin="round" />
      <path d="M9 5v10m6-10v10" opacity={0.7} />
      <path d="M4 18h16" strokeLinecap="round" />
    </svg>
  );
}

export function LightIcon({ className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth={1.8}
      stroke="currentColor"
      className={className}
      aria-hidden
      {...props}
    >
      <path d="M12 3v4M6 6l2.8 2.8M18 6l-2.8 2.8M4 13h4m8 0h4M6 21l2.8-2.8M18 21l-2.8-2.8M12 17v4" strokeLinecap="round" />
      <circle cx={12} cy={13} r={3.5} />
    </svg>
  );
}

export function RacketIcon({ className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth={1.8}
      stroke="currentColor"
      className={className}
      aria-hidden
      {...props}
    >
      <ellipse cx={10} cy={8} rx={5} ry={3.5} />
      <path d="m13 10 6 6-2 2-6-6" strokeLinecap="round" />
      <path d="m16 18 2 2" strokeLinecap="round" />
    </svg>
  );
}

export function ShoeIcon({ className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth={1.8}
      stroke="currentColor"
      className={className}
      aria-hidden
      {...props}
    >
      <path d="M4 13.5c1 .5 2.5.5 4 .5 2.5 0 4.5 2 9.5 2 1.5 0 2.5-.2 3.5-.5v2H4v-4Z" />
      <path d="m8 11 2.2 1.8M11 10l2.2 1.8M14 9l2 1.6" strokeLinecap="round" />
    </svg>
  );
}

export function PoolIcon({ className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth={1.8}
      stroke="currentColor"
      className={className}
      aria-hidden
      {...props}
    >
      <path d="M7 5.5a2.5 2.5 0 0 1 5 0V19" strokeLinecap="round" />
      <path d="M7 19c1 0 2-.8 3-.8s2 .8 3 .8 2-.8 3-.8 2 .8 3 .8" strokeLinecap="round" />
      <path d="M7 11h5" strokeLinecap="round" />
    </svg>
  );
}

export function SaunaIcon({ className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth={1.8}
      stroke="currentColor"
      className={className}
      aria-hidden
      {...props}
    >
      <path d="M5 6h14v12H5z" />
      <path d="M9 8v8m6-8v8" opacity={0.6} />
      <path d="M7 18c1 0 1.2-1.2 2.2-1.2S11 18 12 18s1.2-1.2 2.2-1.2S15 18 16 18s1.2-1.2 2.2-1.2" strokeLinecap="round" />
    </svg>
  );
}

export function TribuneIcon({ className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth={1.8}
      stroke="currentColor"
      className={className}
      aria-hidden
      {...props}
    >
      <path d="M4 7h16v3H4z" />
      <path d="M6 10v6m12-6v6" opacity={0.7} />
      <path d="M4 16h16v3H4z" />
    </svg>
  );
}

export function BoardIcon({ className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth={1.8}
      stroke="currentColor"
      className={className}
      aria-hidden
      {...props}
    >
      <rect x={4} y={5} width={16} height={12} rx={2} />
      <path d="m9 15 2-4 2 2 2-5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function FoodIcon({ className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth={1.8}
      stroke="currentColor"
      className={className}
      aria-hidden
      {...props}
    >
      <path d="M6.5 4v8c0 1 .8 1.8 1.8 1.8h.2V4" />
      <path d="M11 4v9.8c0 1 .8 1.7 1.8 1.7H13V4" />
      <path d="M17.5 4a2.5 2.5 0 0 1 0 5H17v8" strokeLinecap="round" />
    </svg>
  );
}

export function SparkleIcon({ className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth={1.6}
      stroke="currentColor"
      className={className}
      aria-hidden
      {...props}
    >
      <path d="M12 4.5 13.4 9l4.6 1.4L13.4 12 12 16.5 10.6 12 6 10.4 10.6 9 12 4.5Z" strokeLinejoin="round" />
      <path d="M5 5.5 5.6 7l1.5.6-1.5.6L5 9.7l-.6-1.5L2.9 7l1.5-.6L5 5.5Zm14 9 1 2.6 2.5 1L20 19.9l-1 2.6-1-2.6-2.5-.8 2.5-1 1-2.6Z" />
    </svg>
  );
}

export function ArrowRightIcon({ className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth={1.8}
      stroke="currentColor"
      className={className}
      aria-hidden
      {...props}
    >
      <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function BadgeCheckIcon({ className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth={1.8}
      stroke="currentColor"
      className={className}
      aria-hidden
      {...props}
    >
      <path d="M12 4 9.5 5l-2.5-.5-1 2.4L4 8.5l.5 2.5L4 13l2.5 1.1 1 2.4 2.5-.5L12 17l2.5 1 2.5.5 1-2.4L20 13l-.5-2.5.5-2.5-2.5-1-1-2.4L14.5 5 12 4Z" strokeLinejoin="round" />
      <path d="m9.8 12.2 1.9 1.9 3.5-3.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

