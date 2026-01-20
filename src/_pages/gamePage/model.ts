export type PlayerStatus = "WAIT" | "READY" | "NETWORK_ERROR" | "WIN" | "LOSE" | "DRAFT";
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
