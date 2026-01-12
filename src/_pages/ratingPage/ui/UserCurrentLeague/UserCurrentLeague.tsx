import { FC } from "react";

import { Box } from "@mui/material";
import { motion } from "motion/react";

import { League, LeagueBadge } from "@/entities/league";

type Props = {
  leagueName?: League;
};

export const UserCurrentLeague: FC<Props> = ({ leagueName }) => {
  return (
    <Box sx={{ height: "4.2rem", width: "11.5rem" }}>
      {leagueName && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <LeagueBadge leagueName={leagueName} />
        </motion.div>
      )}
    </Box>
  );
};
