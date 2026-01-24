import { Stack } from "@mui/material";
import { motion } from "motion/react";

const dots = [1, 1, 1];

export const SearchDots = () => {
  return (
    <Stack
      alignItems={"center"}
      sx={{ height: "100%" }}
      direction={"row"}
      gap={"1rem"}
      component={motion.div}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {dots.map((_, index) => (
        <motion.span
          key={index}
          style={{
            width: "1rem",
            height: "1rem",
            borderRadius: "50%",
            flex: "0 0 auto",
            backgroundColor: "#000",
            display: "block",
          }}
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: [-10, -5, 0, 0], opacity: [0, 1, 1, 0] }}
          transition={{
            repeat: Infinity,
            times: [0, 0.3, 0, 6, 1],
            duration: 0.7,
            ease: "linear",
            repeatDelay: 0.5,
            delay: index * 0.2,
          }}
        />
      ))}
    </Stack>
  );
};
