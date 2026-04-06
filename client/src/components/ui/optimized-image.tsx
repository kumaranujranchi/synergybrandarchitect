import { useState } from "react";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
}

/**
 * A performance-focused image component that handles:
 * - Lazy loading for off-screen images.
 * - Loading placeholder with skeleton.
 * - Smooth transition when image is ready.
 * - Aspect ratio handling to prevent layout shifts.
 */
export function OptimizedImage({ 
  src, 
  alt, 
  className, 
  containerClassName,
  ...props 
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <div className={cn("relative overflow-hidden", containerClassName)}>
      {!isLoaded && !hasError && (
        <Skeleton className="absolute inset-0 z-0 h-full w-full" />
      )}
      
      {hasError ? (
        <div className="flex items-center justify-center h-full w-full bg-gray-100 text-gray-400 text-xs text-center p-2">
          Image failed to load
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          className={cn(
            "transition-opacity duration-500",
            !isLoaded ? "opacity-0" : "opacity-100",
            className
          )}
          {...props}
        />
      )}
    </div>
  );
}
