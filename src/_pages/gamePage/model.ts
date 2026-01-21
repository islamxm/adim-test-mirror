export type PlayerStatus = "WAIT" | "READY" | "NETWORK_ERROR" | "WIN" | "LOSE" | "DRAW";
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
