import { FC, useEffect, useRef, useState } from "react";

import { Box, Stack, Typography } from "@mui/material";
import { AnimatePresence, motion } from "motion/react";

import { Shine } from "../../../../entities/competition/ui/Versus/Shine";

type Props = {
  duration?: number;
  onComplete?: () => void;
};

export const GameCountdown: FC<Props> = ({ duration = 10, onComplete }) => {
  const [value, setValue] = useState<number>(duration);
  const timer = useRef<any>(null);
  const onCompleteRef = useRef(onComplete);

  const onTick = () => {
    setValue((v) => v - 1);
  };

  useEffect(() => {
    if (value === 0) {
      onCompleteRef.current?.();
      return;
    }
    timer.current = setTimeout(onTick, 1000);
    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
    };
  }, [value]);

  return (
    <Stack
      justifyContent={"center"}
      alignItems={"center"}
      sx={{
        position: "relative",
        height: "20rem",
        width: "20rem",
      }}
    >
      <Box sx={{ position: "absolute", inset: 0 }}>
        <Shine duration={Infinity} />
      </Box>
      <AnimatePresence mode="wait">
        <Typography
          key={value}
          sx={(theme) => ({
            zIndex: 1,
            fontSize: "5rem",
            fontWeight: 700,
            color: theme.palette.primary.main,
          })}
          component={motion.div}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{
            ease: "easeIn",
            duration: 0.2,
          }}
        >
          {value > 0 ? value : ""}
        </Typography>
      </AnimatePresence>
    </Stack>
  );
};
