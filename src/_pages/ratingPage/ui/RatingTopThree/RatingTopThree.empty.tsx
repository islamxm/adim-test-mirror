import { Box, Stack, Typography } from "@mui/material";
import { motion } from "motion/react";

import { Avatar } from "@/entities/user";

export const RatingTopThreeEmpty = () => {
  return (
    <Stack
      direction={"row"}
      justifyContent={"center"}
      alignItems={"flex-start"}
      gap={"17rem"}
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <Box sx={{ minWidth: 0, flex: 1 }}>
        <Stack
          component={motion.div}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          sx={{
            transform: `translateY(-2rem)`,
            minWidth: 0,
          }}
          gap={"1.2rem"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Avatar size={"18.4rem"} avatarUrl={""} shadowType={"0 0 10px #00FFA826"} />
          <Typography
            textAlign={"center"}
            variant={"body1"}
            sx={{
              fontSize: "2.2rem",
              fontWeight: 600,
              width: "100%",
            }}
          >
            Здесь будут отображатся участники этой лиги
          </Typography>
        </Stack>
      </Box>
    </Stack>
  );
};
