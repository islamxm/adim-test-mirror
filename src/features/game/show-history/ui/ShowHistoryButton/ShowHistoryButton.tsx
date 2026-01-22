import { useState } from "react";

import { Button } from "@mui/material";

import { HistoryModal } from "../HistoryModal/HistoryModal";

export const ShowHistoryButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <HistoryModal open={isOpen} onClose={() => setIsOpen(false)} />
      <Button onClick={() => setIsOpen(true)} variant={"outlined"}>
        Show history
      </Button>
    </>
  );
};
