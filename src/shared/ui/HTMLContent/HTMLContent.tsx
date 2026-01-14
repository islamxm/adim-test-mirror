"use client";
import { FC } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";

import { Box } from "@mui/material";
import parseToHTML, { DOMNode, domToReact } from "html-react-parser";
import DOMPurify from "isomorphic-dompurify";

import classes from "./classes.module.scss";

type Props = {
  value?: string | null;
};

export const HTMLContent: FC<Props> = ({ value }) => {
  const blogContent = parseToHTML(DOMPurify.sanitize(value || ""), {
    replace: (node) => {
      if (
        node.type === "tag" &&
        node.name === "pre" &&
        node.children &&
        node.children[0].type === "tag" &&
        node.children[0].name === "code"
      ) {
        const codeElement = node.children[0];

        const className = codeElement.attribs.class || "";
        const language = className.replace("language-", "") || "text";

        const codeContent = domToReact(codeElement.children as DOMNode[]);

        return (
          <SyntaxHighlighter language={language} style={dracula}>
            {String(codeContent)}
          </SyntaxHighlighter>
        );
      }
    },
  });

  return (
    <Box sx={(theme) => ({ color: theme.palette.text.primary })} className={classes.wrapper}>
      {blogContent}
    </Box>
  );
};
