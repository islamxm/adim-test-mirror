import { FC } from "react";
import classes from "./classes.module.scss";
import parseToHTML from "html-react-parser";
import DOMPurify from "isomorphic-dompurify";

type Props = {
  value?: string | null;
};

export const HTMLContent: FC<Props> = ({ value }) => {
  const blogContent = parseToHTML(DOMPurify.sanitize(value || ""));

  return (
    <div className={classes.wrapper}>
      {blogContent}
    </div>
  );
};
