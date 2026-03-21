import { useState, useMemo, useRef, useEffect } from 'react';
import { generateCloudflareImageUrl } from '../lib/cloudflare';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  loading?: 'lazy' | 'eager';
  cloudflareImageId?: string;
  cloudflareR2Url?: string;
  accountHash?: string;
  style?: React.CSSProperties;
  objectPosition?: string;
}

/**
 * OptimizedImage component that supports Cloudflare Images and R2.
 * Priority: cloudflareR2Url > cloudflareImageId > local src
 * Falls back to local src if Cloudflare fails.
 *
 * Measures its container width and requests appropriately-sized images
 * from Cloudflare (with 2× retina multiplier) instead of full originals.
 */
export default function OptimizedImage({
  src,
  alt,
  className = '',
  width,
  height,
  loading = 'lazy',
  cloudflareImageId,
  cloudflareR2Url,
  accountHash,
  style,
  objectPosition,
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [useFallback, setUseFallback] = useState(false);
  const [containerWidth, setContainerWidth] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Measure container width on mount and resize
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const measure = () => {
      const w = el.clientWidth;
      if (w > 0) setContainerWidth(w);
    };

    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Compute display-appropriate dimensions for Cloudflare requests
  const optimizedDimensions = useMemo(() => {
    if (!containerWidth || !width) return { reqWidth: width, reqHeight: height };

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const reqWidth = Math.ceil(containerWidth * dpr);

    // Don't request larger than the original
    const clampedWidth = Math.min(reqWidth, width);

    // Maintain aspect ratio if height is provided
    let clampedHeight: number | undefined;
    if (height && width) {
      clampedHeight = Math.ceil(clampedWidth * (height / width));
    }

    return { reqWidth: clampedWidth, reqHeight: clampedHeight };
  }, [containerWidth, width, height]);

  // Determine which URL to use (priority: R2 > Images > local)
  const imageUrl = useMemo(() => {
    if (useFallback) {
      return src;
    }

    if (cloudflareR2Url) {
      return cloudflareR2Url;
    } else if (cloudflareImageId) {
      const cloudflareUrl = generateCloudflareImageUrl(cloudflareImageId, accountHash, {
        width: optimizedDimensions.reqWidth,
        height: optimizedDimensions.reqHeight,
        format: 'auto',
        quality: 90,
      });

      if (cloudflareUrl) {
        return cloudflareUrl;
      }
    }

    return src;
  }, [useFallback, cloudflareR2Url, cloudflareImageId, accountHash, src, optimizedDimensions]);

  // For Cloudflare images, wait for container measurement before rendering img
  const waitingForMeasure = cloudflareImageId && !useFallback && containerWidth === null;

  return (
    <div ref={containerRef} style={{ position: 'relative', width: '100%', height: '100%' }}>
      {(isLoading || waitingForMeasure) && (
        <div style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#EAE4DA',
          zIndex: 10,
        }}>
          <div style={{
            width: '32px',
            height: '32px',
            border: '2px solid #8B8980',
            borderTopColor: '#2D2D2A',
            borderRadius: '50%',
            animation: 'optimized-image-spin 0.8s linear infinite',
          }} />
        </div>
      )}
      {hasError ? (
        <div style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#EAE4DA',
          color: '#8B8980',
          zIndex: 10,
        }}>
          <span style={{
            fontFamily: '"Vulf Mono", monospace',
            fontSize: '12px',
          }}>
            Image unavailable
          </span>
        </div>
      ) : !waitingForMeasure && (
        <img
          key={imageUrl}
          src={imageUrl}
          alt={alt}
          width={width}
          height={height}
          loading={loading}
          className={className}
          style={{
            ...style,
            objectPosition,
            opacity: isLoading ? 0 : 1,
            transition: 'opacity 0.3s ease',
          }}
          onLoad={() => setIsLoading(false)}
          onError={() => {
            if (!useFallback && (cloudflareR2Url || cloudflareImageId)) {
              setUseFallback(true);
              setIsLoading(true);
              setHasError(false);
            } else {
              setIsLoading(false);
              setHasError(true);
            }
          }}
        />
      )}
      <style>{`
        @keyframes optimized-image-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
