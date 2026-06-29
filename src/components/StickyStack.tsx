import { useRef } from "react";
import { useScroll, useTransform, motion, useReducedMotion } from "motion/react";

interface Props {
  children: React.ReactNode;
}

export default function StickyStack({ children }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const items = Array.isArray(children) ? children : [children];

  if (shouldReduceMotion || items.length === 0) {
    return <div className="flex flex-col gap-16">{items}</div>;
  }

  const total = items.length;

  return (
    <div ref={containerRef} className="relative" style={{ height: `${100 * total}vh` }}>
      {items.map((child, index) => (
        <StickyCard key={index} index={index} total={total} containerRef={containerRef}>
          {child}
        </StickyCard>
      ))}
    </div>
  );
}

function StickyCard({
  index,
  total,
  containerRef,
  children,
}: {
  index: number;
  total: number;
  containerRef: React.RefObject<HTMLDivElement | null>;
  children: React.ReactNode;
}) {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const start = index / total;
  const end = (index + 1) / total;

  const scale = useTransform(scrollYProgress, [start, end], [1, 0.92]);
  const opacity = useTransform(scrollYProgress, [start, end], [1, 0.55]);

  return (
    <motion.div
      className="sticky top-20 w-full px-4 md:px-6 flex justify-center"
      style={{
        scale,
        opacity,
        zIndex: total - index,
      }}
    >
      {children}
    </motion.div>
  );
}
