/**
 * Utility for client-side image optimization.
 * Compresses images and converts them to WebP format before upload
 * to improve storage efficiency and page load performance.
 */

interface OptimizationOptions {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number;
  format?: 'image/webp' | 'image/jpeg';
}

/**
 * Optimizes an image file by resizing and compressing it.
 * @param file The original image file
 * @param options Optimization settings
 * @returns A promise that resolves to the optimized File object
 */
export async function optimizeImage(
  file: File,
  options: OptimizationOptions = {}
): Promise<File> {
  const {
    maxWidth = 1920,
    maxHeight = 1080,
    quality = 0.9,
    format = 'image/webp'
  } = options;

  // If it's not an image, return original
  if (!file.type.startsWith('image/')) {
    return file;
  }

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      
      img.onload = () => {
        // If image is already smaller than maxWidth and maxHeight, 
        // we might still want to convert to webp for optimization, 
        // but let's ensure we don't resize up.
        
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        // Calculate new dimensions preserving aspect ratio
        let needsResize = false;
        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
          needsResize = true;
        }
        if (height > maxHeight) {
          width = Math.round((width * maxHeight) / height);
          height = maxHeight;
          needsResize = true;
        }

        // If no resize is needed and it's already the right format, return original
        // But usually we want to convert to webp regardless for consistency/optimization
        
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Failed to get canvas context'));
          return;
        }

        // Set high quality smoothing for resizing
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';

        // Draw and compress
        ctx.drawImage(img, 0, 0, width, height);
        
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error('Canvas toBlob failed'));
              return;
            }
            
            // Create a new file from the blob
            const extension = format === 'image/webp' ? 'webp' : 'jpg';
            const fileName = file.name.replace(/\.[^/.]+$/, "") + `_opt.${extension}`;
            const optimizedFile = new File([blob], fileName, {
              type: format,
              lastModified: Date.now(),
            });
            
            resolve(optimizedFile);
          },
          format,
          quality
        );
      };
      
      img.onerror = () => reject(new Error('Failed to load image'));
    };
    
    reader.onerror = () => reject(new Error('Failed to read file'));
  });
}
