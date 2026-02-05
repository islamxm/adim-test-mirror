"use client";
import { useTranslations } from "next-intl";

import { Container, Typography } from "@mui/material";

import { PageEnterAnimationLayout } from "@/widgets/pageEnterAnimationLayout";

export const AccountDeletionPage = () => {
  const t = useTranslations("pages.accountDeletionPage.AccountDeletionPage");
  return (
    <PageEnterAnimationLayout>
      <Container sx={{ pt: "10rem" }}>
        <Typography variant="h2">{t("title")}</Typography>
        <Typography>{t("p1")}</Typography>
        <Typography>{t("p2")}</Typography>
        <ul>
          <li>{t("p3")}</li>
          <li>
            {t("p4")}
            <a href="mailto:berktechnology7@gmail.com">{t("mail")}</a> {t("p6")}
          </li>
        </ul>
        <Typography>{t("p7")}</Typography>
        <ol>
          <li>{t("p8")}</li>
          <li>{t("p9")}</li>
        </ol>
        <Typography>{t("p10")}</Typography>
        <ul>
          <li>{t("p11")}</li>
          <li>{t("p12")}</li>
        </ul>
      </Container>
    </PageEnterAnimationLayout>
  );
};
