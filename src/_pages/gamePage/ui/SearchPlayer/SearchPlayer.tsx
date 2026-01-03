import { Box, Stack } from "@mui/material"
import { motion } from "motion/react"
import { FC } from "react"
import searchRollImg from '../../../../../public/search-roll.webp';

type Props = {
  size: any
}

export const SearchPlayer: FC<Props> = ({
  size
}) => {

  return (
    <Stack
      sx={{
        width: size,
        height: size,
        borderRadius: "50%",
        overflow: "hidden",
      }}
    >
      <Stack component={motion.div} initial={{ x: 0 }} animate={{ x: "-100%" }} transition={{ ease: "linear", duration: 1, repeat: Infinity }} sx={{
        width: "max-content",
      }}>
        <img alt="" src={searchRollImg.src} height={220} style={{ width: "auto", flexShrink: 0 }} />
      </Stack>

    </Stack>
  )
}