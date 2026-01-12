import { JSX, ReactNode } from "react";

import { LobbyView } from "./ui/views/LobbyView/LobbyView";

export type PlayerStatus = "WAIT" | "READY" | "NETWORK_ERROR";
export type GameStatus =
  | "LOBBY"
  | "SEARCH"
  | "WAIT"
  | "READY"
  | "START"
  | "WAIT_RESULT"
  | "RESULT"
  | "ERROR"
  | "EXIT";
