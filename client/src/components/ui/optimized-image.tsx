import { useState } from "react";
import { cn } from "@/lib/utils";

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  disableOverlay?: boolean;
}

/**
 * Performance-focused image component.
 * - Shows image immediately at low opacity (NOT hidden with opacity-0)
 * - Gray skeleton pulses in background while image downloads
 * - Fades to full opacity once image is fully loaded
 * This prevents "image not showing" issues for large files like hero.png (10MB)
 */
export function OptimizedImage({ 
  src, 
  alt, 
  className, 
  containerClassName,
  loading = "lazy",
  disableOverlay = false,
  ...props 
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <div className={cn("relative overflow-hidden group", containerClassName)}>
      {/* Skeleton background - visible while image is downloading */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-xl z-0" />
      )}

      {hasError ? (
        <div className="flex items-center justify-center h-64 w-full bg-gray-100 text-gray-400 text-sm text-center p-4 rounded-xl">
          Image could not be loaded
        </div>
      ) : (
        <>
          {/* 
            Image shown immediately at opacity-30 (not hidden).
            For large images (10MB hero.png), opacity-0 made it look like 
            the image was broken. Now user sees a faint image immediately
            that fades to full clarity when download completes.
          */}
          <img
            src={src}
            alt={alt}
            loading={loading}
            decoding="async"
            onLoad={() => setIsLoaded(true)}
            onError={() => setHasError(true)}
            ref={(el) => {
              if (el?.complete) {
                setIsLoaded(true);
              }
            }}
            className={cn(
              "relative z-10 transition-opacity duration-700 group-hover:scale-105",
              isLoaded ? "opacity-100" : "opacity-100", // Keep it 100% as per user request
              className
            )}
            {...props}
          />

          {/* Brand overlay gradient - only after image is fully loaded */}
          {!disableOverlay && isLoaded && (
            <div className="absolute inset-0 z-20 bg-gradient-to-t from-[#FF6B00]/40 via-transparent to-transparent pointer-events-none" />
          )}
        </>
      )}
    </div>
  );
}
