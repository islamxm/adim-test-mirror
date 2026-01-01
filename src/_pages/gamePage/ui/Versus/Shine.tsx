import { motion } from "motion/react";
import { FC } from "react";

type ShineType = {
  angle: number;
  delay: number;
};

const shines: Array<ShineType> = [
  { angle: 0, delay: 0 },
  { angle: 45, delay: 1 },
  { angle: 90, delay: 0 },
  { angle: 135, delay: 1 },
  { angle: 180, delay: 0 },
  { angle: 225, delay: 1 },
  { angle: 270, delay: 0 },
  { angle: 315, delay: 1 },
];

type Props = {
  duration?: number;
};

export const Shine: FC<Props> = ({ duration = 3 }) => {
  return (
    <motion.svg
      initial={{ rotate: 0, opacity: 1 }}
      animate={{ rotate: 90, opacity: 0 }}
      transition={{ duration, ease: "linear" }}
      viewBox="0 0 100 100"
      width="200"
      height="200"
    >
      <defs>
        <linearGradient id="rayGradient" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#fff" stopOpacity={1} />
          <stop offset="100%" stopColor="#fff" stopOpacity={0} />
        </linearGradient>
      </defs>

      <g transform="translate(50 50)">
        {shines.map(({ angle, delay }) => (
          <g key={angle} transform={`rotate(${angle})`}>
            <motion.path
              d={"M 0 0 L 45 -7 L 45 7 Z"}
              fill="url(#rayGradient)"
              initial={{
                scaleX: 0.5,
                transformOrigin: "0% 0%",
                transformBox: "fill-box",
              }}
              animate={{
                scaleX: [0.5, 1, 0.5],
                transformOrigin: "0% 0%",
                transformBox: "fill-box",
              }}
              transition={{
                ease: "linear",
                times: [0, 0.5, 1],
                duration: 2,
                repeat: Infinity,
                delay,
              }}
            />
          </g>
        ))}
      </g>
    </motion.svg>
  );
};
