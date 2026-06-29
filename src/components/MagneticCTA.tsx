import { useRef } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react";

type Variant = "primary" | "outline";

interface Props extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "ref"> {
  href: string;
  variant?: Variant;
  external?: boolean;
}

export default function MagneticCTA({
  href,
  variant = "primary",
  external,
  children,
  className = "",
  ...rest
}: Props) {
  const ref = useRef<HTMLAnchorElement>(null);
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.6 });

  const onMove = (e: React.PointerEvent<HTMLAnchorElement>) => {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const dx = (e.clientX - (r.left + r.width / 2)) * 0.25;
    const dy = (e.clientY - (r.top + r.height / 2)) * 0.25;
    x.set(Math.max(-10, Math.min(10, dx)));
    y.set(Math.max(-10, Math.min(10, dy)));
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const variantClass =
    variant === "primary"
      ? "bg-accent text-white hover:bg-accent-soft"
      : "border border-zinc-300 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200 hover:border-accent hover:text-accent";

  return (
    <motion.a
      ref={ref}
      href={href}
      onPointerMove={onMove}
      onPointerLeave={reset}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      style={{ x: sx, y: sy }}
      whileHover={reduce ? undefined : { scale: 1.03 }}
      whileTap={reduce ? undefined : { scale: 0.97 }}
      transition={{ type: "spring", stiffness: 280, damping: 22 }}
      className={`magnetic-cta inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium text-sm no-underline transition-colors ${variantClass} ${className}`}
      {...rest}
    >
      {children}
    </motion.a>
  );
}
