import { FC } from "react";

import parseToHTML from "html-react-parser";
import DOMPurify from "isomorphic-dompurify";

import classes from "./classes.module.scss";

type Props = {
  value?: string | null;
};

export const HTMLContent: FC<Props> = ({ value }) => {
  const blogContent = parseToHTML(DOMPurify.sanitize(value || ""));

  return <div className={classes.wrapper}>{blogContent}</div>;
};
