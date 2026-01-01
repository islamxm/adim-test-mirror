import { FC } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { useRef, useEffect, useState } from "react";
import {
  animate,
  AnimatePresence,
  motion,
  useMotionValue,
  useTransform,
} from "motion/react";

const CIRCLE_SIZE_PX = 100;
const STORKE_WIDTH = 12;
const RADIUS = CIRCLE_SIZE_PX / 2 - STORKE_WIDTH / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const COLOR_START = "green";
const COLOR_WARN = "yellow";
const COLOR_ALERT = "red";

type Props = {
  duration: number;
  id: number;
  onComplete?: (ms: number) => void;
};
export const QuestionCountdown: FC<Props> = ({ duration, onComplete, id }) => {
  const [pulsing, setPulsing] = useState(false);
  const [value, setValue] = useState(duration);
  const [finished, setFinished] = useState(false);
  const time = useRef<number>(0);
  const timer = useRef<any>(null);

  const progress = useMotionValue(0);

  const stroke = useTransform(
    progress,
    [0, 0.5, 0.8, 1],
    [COLOR_START, COLOR_START, COLOR_WARN, COLOR_ALERT]
  );

  useEffect(() => {
    if (!duration) {
      timer.current = null;
      return;
    }
    time.current = Date.now();
    progress.set(0);
    setValue(duration);
    setFinished(false);
    setPulsing(false);

    if (timer.current) {
      clearInterval(timer.current);
    }
    console.log(progress);
    const controls = animate(progress, 1, {
      duration,
      ease: "linear",
      onComplete: () => {
        onComplete?.(Date.now() - time.current);
      },
    });

    timer.current = setInterval(() => {
      setValue((v) => {
        if (v <= 0) {
          return 0;
        }
        return v - 1;
      });
    }, 1000);

    return () => {
      controls.stop();
      clearInterval(timer.current);
    };
  }, [duration, id, progress]);

  return (
    <Box
      sx={{
        position: "relative",
        width: `${CIRCLE_SIZE_PX / 10}rem`,
        height: `${CIRCLE_SIZE_PX / 10}rem`,
        flexShrink: 0,
      }}
      component={motion.div}
      animate={pulsing && !finished ? "run" : "stop"}
      variants={{
        run: {
          scale: [1, 1.1, 1],
          transition: {
            times: [0, 0.2, 1],
            duration: 1,
            repeat: Infinity,
          },
        },
        stop: { scale: 1 },
      }}
    >
      <svg
        style={{ overflow: "visible" }}
        width={CIRCLE_SIZE_PX}
        height={CIRCLE_SIZE_PX}
      >
        <circle
          r={RADIUS}
          cx={CIRCLE_SIZE_PX / 2}
          cy={CIRCLE_SIZE_PX / 2}
          fill="none"
          stroke="#76D9B7"
          strokeOpacity="0.15"
          strokeWidth={STORKE_WIDTH}
          strokeLinecap="round"
          style={{
            transform: "rotate(-90deg)",
            transformOrigin: "50% 50%",
          }}
        />
        <motion.circle
          key={id}
          r={RADIUS}
          cx={CIRCLE_SIZE_PX / 2}
          cy={CIRCLE_SIZE_PX / 2}
          fill="none"
          strokeWidth={STORKE_WIDTH}
          strokeLinecap="round"
          stroke={stroke}
          initial={{
            strokeDasharray: CIRCUMFERENCE,
            pathLength: 1,
            stroke: COLOR_START,
          }}
          animate={{
            pathLength: 0,
          }}
          transition={{
            duration,
            ease: "linear",
            pathLength: { duration, ease: "linear" },
          }}
          onUpdate={(latest) => {
            if ((latest.pathLength as number) <= 0.2 && !pulsing && !finished) {
              setPulsing(true);
            }
          }}
          onAnimationComplete={() => {
            setFinished(true);
            setPulsing(false);
          }}
          style={{
            transform: "rotate(-90deg)",
            transformOrigin: "50% 50%",
          }}
        />
      </svg>
      <Stack
        justifyContent={"center"}
        alignItems={"center"}
        sx={{ position: "absolute", inset: 0 }}
      >
        <AnimatePresence mode="wait">
          <Typography
            component={motion.span}
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              duration: 0,
              type: "spring",
            }}
            key={value}
            sx={{ fontSize: "3rem", fontWeight: 600 }}
          >
            {value}
          </Typography>
        </AnimatePresence>
      </Stack>
    </Box>
  );
};
