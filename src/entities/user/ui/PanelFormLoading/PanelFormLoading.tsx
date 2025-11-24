import { Box, Stack } from "@mui/material"
import classes from './classes.module.scss';
import {motion} from 'motion/react'

export const PanelFormLoading = () => {
  return (
    <Stack
      component={motion.div}
      sx={{
        height: "100%",
        width: "100%",
        position: "absolute",
        top: 0,
        left: 0,
        bgcolor: "rgba(255, 255, 255, 0.5)",
        zIndex: 3,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      >
      <Box 
        sx={{
          height: "5px",
          overflow: "hidden",
        }}
        className={classes.indicator}>
        <Box 
          sx={theme => ({
            width: "200%",
            height: "100%",
            backgroundColor: theme.palette.primary[100],
            transform: "translateX(-100%)",
          })}
          className={classes.thumb}
          component={motion.div}
          animate={{ translateX: ["-100%", "0%", "100%"] }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}  
          />
      </Box>
    </Stack>
  )
}