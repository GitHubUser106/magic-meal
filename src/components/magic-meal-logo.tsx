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
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role={ariaHidden ? undefined : "img"}
      aria-label={ariaHidden ? undefined : "MagicMeal logo"}
      aria-hidden={ariaHidden}
    >
      {/* Plate outer ring */}
      <path d="M 95.88,11.41 C 45.87,11.41 4.61,52.16 4.61,103.77 C 4.61,154.44 45.46,195.19 95.88,195.19 C 146.62,195.19 188.51,154.81 188.51,103.2 C 188.51,52.53 147.66,11.41 95.88,11.41 Z" fill="url(#paint0_linear)" />
      {/* Plate face */}
      <path d="M 95.99,186.69 C 50.76,186.69 12.07,151.16 12.07,103.77 C 12.07,57.23 49.91,18.99 95.99,18.99 C 142.44,18.99 180.28,56.52 180.28,103.2 C 180.28,149.74 141.66,186.69 95.99,186.69 Z" fill="#FDE66F" />
      {/* Plate rim */}
      <path d="M 95.88,33.42 C 57.06,33.42 25.74,65.66 25.74,104.31 C 25.74,142.28 57.17,173.39 95.67,173.39 C 134.7,173.39 166.33,142.71 166.33,103.66 C 166.33,65.21 134.91,33.42 95.88,33.42 Z M 95.78,170.01 C 59.31,170.01 29.39,140.33 29.39,103.98 C 29.39,66.71 59.11,36.82 95.88,36.82 C 132.96,36.82 163.08,67.29 163.08,103.98 C 163.08,140.66 132.75,170.01 95.78,170.01 Z" fill="#F09A00" />
      {/* Fork */}
      <path d="M 161.76,131.33 L 110.74,81.53 C 115.98,72.71 108.72,57.01 95.99,50.02 C 86.76,44.76 77.93,45.61 73.61,53.2 C 67.75,63.41 75.31,79.84 87.07,86.21 C 93.91,89.96 100.19,89.64 104.61,87.61 L 152.32,138.91 C 155.67,142.5 159.78,140.87 161.86,138.48 C 163.94,135.99 163.63,133.08 161.76,131.33 Z" fill="url(#paint1_linear)" />
      {/* Spoon */}
      <path d="M 84.78,98.81 L 84.26,98.92 L 57.48,72.08 C 55.71,70.33 53.74,70.75 52.61,72.08 C 51.48,73.42 51.37,75.71 52.92,77.05 L 79.08,103.41 L 75.52,107.01 L 48.75,80.46 C 47.09,78.81 45.11,79.33 44.08,80.56 C 42.75,82.01 42.85,84.29 44.39,85.73 L 70.76,111.88 L 67.01,115.96 L 40.13,89.01 C 38.36,87.26 36.39,87.89 35.46,89.01 C 34.33,90.46 34.43,92.63 35.87,93.97 L 62.75,120.62 L 62.65,120.83 C 61.52,122.58 62.85,125.07 65.76,127.03 C 67.42,128.16 69.29,127.54 70.12,126.3 L 77.48,119.41 L 123.36,169.08 C 126.81,172.88 131.13,170.6 132.79,167.9 C 134.02,165.73 133.92,162.53 132.06,160.57 L 83.84,113.32 L 89.91,107.64 C 92.1,105.46 90.13,102.03 87.22,100.07 C 86.49,99.44 85.56,98.81 84.78,98.81 Z" fill="url(#paint2_linear)" />
      {/* Sparkle */}
      <path d="M 179.05,4.42 L 184.5,15.71 L 195.75,20.66 L 184.5,26.13 L 179.05,37.73 L 173.71,26.13 L 162.26,20.66 L 173.71,15.4 L 179.05,4.42 Z" fill="#F09105" />
      <defs>
        <linearGradient id="paint0_linear" x1="96.558" y1="11.4062" x2="96.558" y2="195.188" gradientUnits="userSpaceOnUse">
          <stop stopColor="#8E420B" />
          <stop offset="1" stopColor="#8C4109" />
        </linearGradient>
        <linearGradient id="paint1_linear" x1="117.371" y1="46.4629" x2="117.371" y2="141.184" gradientUnits="userSpaceOnUse">
          <stop stopColor="#8E420B" />
          <stop offset="1" stopColor="#8C4109" />
        </linearGradient>
        <linearGradient id="paint2_linear" x1="84.0175" y1="70.8281" x2="84.0175" y2="171.821" gradientUnits="userSpaceOnUse">
          <stop stopColor="#8E420B" />
          <stop offset="1" stopColor="#8C4109" />
        </linearGradient>
      </defs>
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
