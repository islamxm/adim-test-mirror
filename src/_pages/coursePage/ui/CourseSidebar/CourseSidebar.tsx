import { Box, Stack } from "@mui/material";
import { CourseTabs } from "../CourseTabs/CourseTabs";
import { UnitsList } from "../UnitsList/UnitsList";
import { useSearchParams } from "next/navigation";
import { COURSE_TABS } from "@/entities/course";
import { Comments } from "../Comments/Comments";

export const CourseSidebar = () => {
  const params = useSearchParams();
  const tabValue = params.get("tab") as keyof typeof COURSE_TABS;

  return (
    <Stack gap={"1.5rem"} sx={{ overflowY: "hidden", height: "100%" }}>
      <Box
        sx={(theme) => ({
          position: "sticky",
          top: 0,
          backgroundColor: theme.palette.common.white,
          zIndex: 2,
        })}
      >
        <CourseTabs />
      </Box>
      {tabValue === "comments" && <Comments />}
      {tabValue === "units" && <UnitsList />}
    </Stack>
  );
};
