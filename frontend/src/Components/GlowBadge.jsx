import React from "react";

/**
 * GlowBadge Component
 * Premium glassmorphic tag badge with subtle neon border glow and backdrop blur.
 */
export default function GlowBadge({
  children,
  icon: Icon,
  variant = "cyan", // 'cyan' | 'indigo' | 'emerald' | 'amber' | 'purple'
  className = "",
  onClick,
}) {
  const variantStyles = {
    cyan: "bg-[#0b0f19]/90 border-[#38bdf8]/30 text-[#38bdf8] shadow-[0_0_15px_rgba(56,189,248,0.15)] hover:border-[#38bdf8]/60 hover:shadow-[0_0_20px_rgba(56,189,248,0.25)]",
    indigo: "bg-[#0b0f19]/90 border-[#433bff]/40 text-[#a78bfa] shadow-[0_0_15px_rgba(67,59,255,0.2)] hover:border-[#433bff]/70 hover:shadow-[0_0_20px_rgba(67,59,255,0.3)]",
    emerald: "bg-[#0b0f19]/90 border-[#10b981]/30 text-[#34d399] shadow-[0_0_15px_rgba(16,185,129,0.15)] hover:border-[#10b981]/60",
    amber: "bg-[#0b0f19]/90 border-amber-400/40 text-amber-300 shadow-[0_0_15px_rgba(251,191,36,0.15)] hover:border-amber-400/70 hover:bg-amber-400/10",
    purple: "bg-[#0b0f19]/90 border-[#a78bfa]/30 text-[#c084fc] shadow-[0_0_15px_rgba(167,139,250,0.15)] hover:border-[#a78bfa]/60",
  };

  const Component = onClick ? "button" : "div";

  return (
    <Component
      onClick={onClick}
      className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-semibold backdrop-blur-md transition-all duration-300 ${variantStyles[variant] || variantStyles.cyan} ${className}`}
    >
      {Icon && <Icon size={14} className="shrink-0" />}
      <span>{children}</span>
    </Component>
  );
}
