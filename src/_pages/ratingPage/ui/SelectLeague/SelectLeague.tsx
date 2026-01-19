import { FC } from "react";

import { Stack } from "@mui/material";
import { motion } from "motion/react";

import { League, LeagueBadge } from "@/entities/league";
import { leagueMap } from "@/entities/league/model";

const leagues = Object.entries(leagueMap)
  .map(([_, value]) => ({ ...value, id: _ }))
  .reverse();

type Props = {
  activeLeague: string | null;
  onChange?: (league: League) => void;
};

export const SelectLeague: FC<Props> = ({ onChange, activeLeague }) => {
  return (
    <Stack justifyContent={"center"} gap={"1.6rem"} direction={"row"} sx={{ height: "4.2rem" }}>
      {leagues.map((league) => (
        <motion.div key={league.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <LeagueBadge
            isActive={league.id === activeLeague}
            onClick={onChange}
            leagueName={league.id as League}
          />
        </motion.div>
      ))}
    </Stack>
  );
};
