"use client";

export default function Button({
  children,
  variant = "primary",
  size = "medium",
  type = "button",
  onClick,
  disabled = false,
  className = "",
}) {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50";

  const variants = {
    primary:
      "bg-[#0F766E] text-white hover:bg-[#115E59] shadow-sm",

    secondary:
      "bg-[#E8F4F0] text-[#0F766E] hover:bg-[#DCEFEA]",

    outline:
      "border border-[#D7E2DE] bg-white text-[#334155] hover:bg-[#F0F7F4]",

    danger:
      "bg-[#DC5555] text-white hover:bg-red-700",

    success:
      "bg-[#15803D] text-white hover:bg-green-800",
  };

  const sizes = {
    small: "px-3 py-2 text-xs",
    medium: "px-4 py-2.5 text-sm",
    large: "px-6 py-3 text-base",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </button>
  );
}