import { ArrowUpIcon } from "@/shared/ui/icons";
import { Button, Stack, TextField } from "@mui/material";

export const CommentTextAction = () => {
  return (
    <Stack p={".8rem"} direction={"row"} gap={"1.4rem"}>
      <TextField
        sx={{ "& .MuiInputBase-root": {borderRadius: "2.4rem"} }}
        placeholder="Your comment"
        fullWidth
      />
      <Button
        variant={"contained"}
        sx={{ borderRadius: "50%", flexShrink: 0, p: 0, minHeight: "unset", minWidth: "unset", width: "4.8rem", height: "4.8rem", }}
      >
        <ArrowUpIcon sx={{fontSize: "2.8rem"}} />
      </Button>
    </Stack>
  );
};
