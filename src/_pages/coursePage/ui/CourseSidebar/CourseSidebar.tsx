import { Stack } from "@mui/material";
import { CourseTabs } from "../CourseTabs/CourseTabs";
import { UnitsList } from "../UnitsList/UnitsList";
import { useSearchParams } from "next/navigation";
import { COURSE_TABS } from "@/entities/course";
import { Comments } from "../Comments/Comments";

export const CourseSidebar = () => {
  const params = useSearchParams();
  const tabValue = params.get("tab") as keyof typeof COURSE_TABS;

  return (
    <Stack gap={"1.5rem"} sx={{height: "100%"}}>
      <CourseTabs />
      {tabValue === "comments" && <Comments />}
      {tabValue === "units" && <UnitsList />}
    </Stack>
  );
};
