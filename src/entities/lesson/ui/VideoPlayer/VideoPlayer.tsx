import { FC, useRef } from "react";

import {
  MediaPlayer,
  MediaPlayerInstance,
  MediaProvider,
  MediaProviderAdapter,
  isHLSProvider,
} from "@vidstack/react";
import "@vidstack/react/player/styles/base.css";

import { VideoMask } from "./VideoMask";
import classes from "./classes.module.scss";

type Props = {
  src: string;
  title?: string;
};

export const VideoPlayer: FC<Props> = ({ src, title }) => {
  const ref = useRef<MediaPlayerInstance>(null);

  const onProviderChange = (provider: MediaProviderAdapter | null) => {
    if (isHLSProvider(provider)) {
      provider.config = {
        maxBufferLength: 0.1,
        maxMaxBufferLength: 1,
        autoStartLoad: true,
      };
    }
  };

  return (
    <MediaPlayer
      ref={ref}
      aspectRatio="16/9"
      load="idle"
      title={title}
      src={src}
      preload="metadata"
      className={classes.wrapper}
      onProviderChange={onProviderChange}
    >
      <MediaProvider />
      <VideoMask />
    </MediaPlayer>
  );
};
