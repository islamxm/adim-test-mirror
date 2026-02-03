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
  videoSrc: string;
  posterSrc?: string;
  title?: string;
};

export const VideoPlayer: FC<Props> = ({ videoSrc, posterSrc, title }) => {
  const ref = useRef<MediaPlayerInstance>(null);

  /** функция для того чтобы ограничить размер предзагрузки видео */
  const onProviderChange = (provider: MediaProviderAdapter | null) => {
    if (isHLSProvider(provider)) {
      provider.config = {
        // запас загрузки в секундах, то есть сколько видео будет загружено вперед
        maxBufferLength: 30,
        // максимальный запас загрузки в секундах
        maxMaxBufferLength: 45,
        // начать загрузку сразу после инициализации провайдера
        autoStartLoad: true,
      };
    }
  };

  return (
    <MediaPlayer
      ref={ref}
      aspectRatio="16/9"
      load="visible"
      title={title}
      src={videoSrc}
      preload="metadata"
      className={classes.wrapper}
      onProviderChange={onProviderChange}
      poster={posterSrc}
    >
      <MediaProvider />
      <VideoMask />
    </MediaPlayer>
  );
};
