import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

interface LoadingSkeletonProps {
  type?: 'card' | 'list' | 'hero' | 'company';
  count?: number;
  className?: string;
}

export const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({ 
  type = 'card', 
  count = 1,
  className = ''
}) => {
  const renderSkeleton = () => {
    switch (type) {
      case 'hero':
        return (
          <div className={`space-y-6 ${className}`}>
            <Skeleton className="h-20 w-full max-w-4xl mx-auto animate-shimmer" />
            <Skeleton className="h-6 w-full max-w-2xl mx-auto animate-shimmer" />
            <div className="flex justify-center gap-4 mt-8">
              <Skeleton className="h-12 w-32 animate-shimmer" />
              <Skeleton className="h-12 w-32 animate-shimmer" />
            </div>
          </div>
        );
      
      case 'company':
        return (
          <div className="flex justify-center gap-6 flex-wrap">
            {Array.from({ length: 7 }).map((_, i) => (
              <Skeleton 
                key={i}
                className="w-36 h-32 rounded-lg animate-shimmer hover-lift"
                style={{ animationDelay: `${i * 100}ms` }}
              />
            ))}
          </div>
        );
      
      case 'list':
        return (
          <div className={`space-y-4 ${className}`}>
            {Array.from({ length: count }).map((_, i) => (
              <div key={i} className="flex items-center space-x-4">
                <Skeleton className="h-12 w-12 rounded-full animate-shimmer" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-4 w-full animate-shimmer" />
                  <Skeleton className="h-4 w-2/3 animate-shimmer" />
                </div>
              </div>
            ))}
          </div>
        );
      
      default: // card
        return (
          <div className={`grid gap-6 ${className}`}>
            {Array.from({ length: count }).map((_, i) => (
              <div key={i} className="space-y-4 p-6 border rounded-lg">
                <Skeleton className="h-6 w-3/4 animate-shimmer" />
                <Skeleton className="h-4 w-full animate-shimmer" />
                <Skeleton className="h-4 w-2/3 animate-shimmer" />
                <Skeleton className="h-10 w-32 animate-shimmer" />
              </div>
            ))}
          </div>
        );
    }
  };

  return <>{renderSkeleton()}</>;
};

export default LoadingSkeleton;