export function Ornament({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`} aria-hidden>
      <span className="h-px w-14 bg-gradient-to-r from-transparent to-current opacity-50" />
      <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current opacity-80">
        <path d="M12 2c1.6 2.6 2.4 5 2.4 7.2 0 2-.8 3.6-2.4 5-1.6-1.4-2.4-3-2.4-5C9.6 7 10.4 4.6 12 2zM4 9.4c2.9.3 5 1.1 6.5 2.3 1.4 1.1 2.2 2.4 2.4 4-1.9.6-3.6.5-5.2-.3C5.9 14.5 4.7 12.4 4 9.4zM20 9.4c-.7 3-1.9 5.1-3.7 6-1.6.8-3.3.9-5.2.3.2-1.6 1-2.9 2.4-4 1.5-1.2 3.6-2 6.5-2.3z" />
        <circle cx="12" cy="19" r="1.6" />
      </svg>
      <span className="h-px w-14 bg-gradient-to-l from-transparent to-current opacity-50" />
    </div>
  );
}

export function SmallDots({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-2 ${className}`} aria-hidden>
      {[0, 1, 2].map((i) => (
        <span key={i} className="h-1 w-1 rounded-full bg-current opacity-60" />
      ))}
    </div>
  );
}
