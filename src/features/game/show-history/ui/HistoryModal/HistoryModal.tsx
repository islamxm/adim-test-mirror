import { FC, useState } from "react";

import { Box, IconButton } from "@mui/material";
import { AnimatePresence, motion } from "motion/react";

import { ModalProps } from "@/shared/types";
import { Modal } from "@/shared/ui";
import { ChevronLeftIcon } from "@/shared/ui/icons";

import { competitionApi } from "@/entities/competition";

import { ResourceList } from "@/widgets/resourceList";

import { HistoryMatchData } from "../../model";
import { HistoryItem } from "../HistoryItem/HistoryItem";
import { HistoryItemSkeleton } from "../HistoryItem/HistoryItem.skeleton";
import { MatchStat } from "../MatchStat/MatchStat";

export const HistoryModal: FC<ModalProps> = (props) => {
  const { data, fetchNextPage, hasNextPage, isLoading, isSuccess, isError } =
    competitionApi.useGetMatchsHistoryInfiniteQuery({ cursor: 0 }, { skip: !props.open });
  const [matchData, setMatchData] = useState<HistoryMatchData | null>(null);

  const showMatchStat = (matchData: HistoryMatchData) => {
    setMatchData(matchData);
  };
  const closeMatchStat = () => {
    setMatchData(null);
  };

  const history =
    data?.pages && data?.pages.length > 0 ? data.pages.map((p) => p.history).flat() : [];

  const closeHandle = () => {
    props?.onClose?.();
    closeMatchStat();
  };

  return (
    <Modal
      {...props}
      title={matchData ? "Результат" : "История"}
      onClose={closeHandle}
      wrapperStyle={{ maxWidth: "79rem" }}
      contentStyle={{
        height: "56rem",
        px: 0,
        py: 0,
        position: "relative",
      }}
      hideCloseButton={!!matchData}
      beforeTitleSlot={
        !!matchData && (
          <motion.div
            layout
            style={{ overflow: "hidden" }}
            initial={{ width: 0, opacity: 0 }}
            exit={{ width: 0, opacity: 0 }}
            animate={{ width: "auto", opacity: 1 }}
            key={"back-button"}
          >
            <IconButton onClick={closeMatchStat} sx={{ width: "4rem", height: "4rem", mr: "1rem" }}>
              <ChevronLeftIcon sx={{ fontSize: "3rem", color: "#000" }} />
            </IconButton>
          </motion.div>
        )
      }
    >
      <AnimatePresence>{matchData && <MatchStat {...matchData} />}</AnimatePresence>
      <Box
        sx={{
          maxHeight: "56rem",
          overflowY: matchData ? "hidden" : "auto",
          px: "3rem",
          pt: "1rem",
          pb: "4rem",
        }}
      >
        <ResourceList
          isLoading={isLoading}
          isError={isError}
          isSuccess={isSuccess}
          onLoadMore={fetchNextPage}
          canLoadMore={hasNextPage}
          skeleton={{
            count: 3,
            component: HistoryItemSkeleton,
          }}
        >
          {history.map((data) => (
            <HistoryItem
              onClick={() =>
                showMatchStat({
                  id: data.id,
                  winnerId: data.winnerId,
                  opponent: data.opponent,
                })
              }
              key={data.id}
              data={data}
            />
          ))}
        </ResourceList>
      </Box>
    </Modal>
  );
};
