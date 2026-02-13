interface ScrollIndicatorProps {
  children: React.ReactNode;
  className?: string;
}

export function ScrollIndicator({ children, className = '' }: ScrollIndicatorProps) {
  return (
    <div className={`relative ${className}`}>
      {/* Native scrollbar with touch optimization */}
      <div className="overflow-x-auto mobile-scrollbar">
        {children}
      </div>
    </div>
  );
}