export default function ChefIcon({ className = "w-16 h-16" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Chef Hat */}
      <path
        d="M50 25C45 25 40 27 37 30C34 27 29 25 24 25C17 25 12 30 12 37C12 40 13 43 15 45V52C15 55 17 57 20 57H80C83 57 85 55 85 52V45C87 43 88 40 88 37C88 30 83 25 76 25C71 25 66 27 63 30C60 27 55 25 50 25Z"
        fill="#FF6B35"
      />
      <path
        d="M20 52H80C83 52 85 54 85 57V65C85 68 83 70 80 70H20C17 70 15 68 15 65V57C15 54 17 52 20 52Z"
        fill="#FF6B35"
      />
      
      {/* Pleats on hat */}
      <path
        d="M30 45V52"
        stroke="#D2691E"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M40 45V52"
        stroke="#D2691E"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M50 45V52"
        stroke="#D2691E"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M60 45V52"
        stroke="#D2691E"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M70 45V52"
        stroke="#D2691E"
        strokeWidth="2"
        strokeLinecap="round"
      />
      
      {/* Left Hand */}
      <path
        d="M15 60C10 62 5 67 5 72C5 75 7 77 10 77C13 77 15 75 15 72V60Z"
        fill="#FF6B35"
      />
      <circle cx="10" cy="72" r="4" fill="#D2691E" />
      
      {/* Right Hand */}
      <path
        d="M85 60C90 62 95 67 95 72C95 75 93 77 90 77C87 77 85 75 85 72V60Z"
        fill="#FF6B35"
      />
      <circle cx="90" cy="72" r="4" fill="#D2691E" />
    </svg>
  );
}