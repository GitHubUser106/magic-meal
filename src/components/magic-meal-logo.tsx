import { cn } from "@/lib/utils";

interface MagicMealLogoProps {
  variant?: "icon" | "full";
  size?: number;
  className?: string;
}

function LogoIcon({ size, className, ariaHidden }: { size: number; className?: string; ariaHidden?: boolean }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role={ariaHidden ? undefined : "img"}
      aria-label={ariaHidden ? undefined : "MagicMeal logo"}
      aria-hidden={ariaHidden}
    >
      {/* Plate — amber circle with rim */}
      <circle cx="22" cy="25" r="17" fill="#FDE68A" />
      <circle cx="22" cy="25" r="17" fill="none" stroke="#D97706" strokeWidth="2" />
      <circle cx="22" cy="25" r="13" fill="none" stroke="#FBBF24" strokeWidth="0.75" opacity="0.5" />

      {/* Fork — simplified 3-tine, crossing plate diagonally */}
      <g transform="translate(22,24) rotate(-40)">
        {/* Handle */}
        <rect x="-1.5" y="4" width="3" height="16" rx="1.5" fill="#92400E" />
        {/* Bridge */}
        <rect x="-5" y="1" width="10" height="3" rx="1" fill="#92400E" />
        {/* Tines */}
        <rect x="-4.5" y="-11" width="2" height="12" rx="1" fill="#92400E" />
        <rect x="-1" y="-11" width="2" height="12" rx="1" fill="#92400E" />
        <rect x="2.5" y="-11" width="2" height="12" rx="1" fill="#92400E" />
      </g>

      {/* Sparkle — 4-point star at upper-right */}
      <path
        d="M38 3 L39.5 6.5 L43 8 L39.5 9.5 L38 13 L36.5 9.5 L33 8 L36.5 6.5 Z"
        fill="#F59E0B"
      />
    </svg>
  );
}

export function MagicMealLogo({ variant = "icon", size = 32, className }: MagicMealLogoProps) {
  if (variant === "icon") {
    return <LogoIcon size={size} className={className} />;
  }

  return (
    <span className={cn("inline-flex items-center gap-2", className)} aria-label="MagicMeal">
      <LogoIcon size={size} ariaHidden />
      <span className="font-bold text-2xl">MagicMeal</span>
    </span>
  );
}
