export default function ChefHatLogoIcon({ className = "w-16 h-16" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Left Fork */}
      <g transform="translate(15, 20) rotate(-15)">
        <rect x="0" y="0" width="3" height="35" fill="#FF6B35" rx="1.5" />
        <rect x="-4" y="0" width="2" height="15" fill="#FF6B35" rx="1" />
        <rect x="5" y="0" width="2" height="15" fill="#FF6B35" rx="1" />
        <rect x="-6" y="35" width="15" height="4" fill="#D2691E" rx="2" />
      </g>
      
      {/* Right Spatula */}
      <g transform="translate(82, 20) rotate(15)">
        <rect x="0" y="0" width="3" height="35" fill="#FF6B35" rx="1.5" />
        <path
          d="M -4 0 L 7 0 L 7 12 L -4 12 Z"
          fill="#FF6B35"
          stroke="#D2691E"
          strokeWidth="1"
        />
        <rect x="-6" y="35" width="15" height="4" fill="#D2691E" rx="2" />
      </g>
      
      {/* Chef Hat - Main body */}
      <ellipse cx="50" cy="45" rx="28" ry="15" fill="#FF6B35" />
      
      {/* Chef Hat - Top puff */}
      <circle cx="35" cy="35" r="10" fill="#FF6B35" />
      <circle cx="50" cy="30" r="12" fill="#FF6B35" />
      <circle cx="65" cy="35" r="10" fill="#FF6B35" />
      <circle cx="42" cy="28" r="9" fill="#FF8C42" />
      <circle cx="58" cy="28" r="9" fill="#FF8C42" />
      
      {/* Chef Hat - Band */}
      <rect x="22" y="43" width="56" height="10" fill="#D2691E" rx="2" />
      
      {/* Pleats on hat band */}
      <line x1="30" y1="45" x2="30" y2="51" stroke="#B8621B" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="38" y1="45" x2="38" y2="51" stroke="#B8621B" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="46" y1="45" x2="46" y2="51" stroke="#B8621B" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="54" y1="45" x2="54" y2="51" stroke="#B8621B" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="62" y1="45" x2="62" y2="51" stroke="#B8621B" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="70" y1="45" x2="70" y2="51" stroke="#B8621B" strokeWidth="1.5" strokeLinecap="round" />
      
      {/* Decorative stars */}
      <path
        d="M 50 60 L 51 63 L 54 63 L 51.5 65 L 52.5 68 L 50 66 L 47.5 68 L 48.5 65 L 46 63 L 49 63 Z"
        fill="#FF9A76"
      />
    </svg>
  );
}