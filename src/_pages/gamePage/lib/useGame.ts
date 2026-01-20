import { useEffect, useRef, useState } from "react";

import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";

import { CnServerEventsMap, competitionWs } from "@/entities/competition";
import { userApi } from "@/entities/user";

import { GameStatus, PlayerStatus } from "../model";

let eventId = "1";

const isEventIdCorrect = (inEventId: number): boolean => Number(eventId) === Number(inEventId);
const generateEventId = (inEventId: string) => {
  if (isEventIdCorrect(Number(inEventId))) {
    eventId = Number(Number(inEventId) + 1).toString();
  }
};

const setTimer = (cb: () => void) => {
  const id = setTimeout(cb, 3000);
  return id;
};

const removeTimer = (timeoutId?: NodeJS.Timeout) => {
  clearTimeout(timeoutId);
};

let wsReconnectDelay = 1000;

/** для того чтобы инкапсулировать логику игры от UI-компонента */
export const useGame = () => {
  const { subcategory } = useParams();
  const { data } = userApi.useGetUserProfileQuery(undefined);
  const { data: sessionData } = useSession();
  const subCategoryId = Number(subcategory);

  const retryTimer = useRef<NodeJS.Timeout>(undefined);
  const reconnectTimer = useRef<NodeJS.Timeout>(undefined);

  const [gameStatus, setGameStatus] = useState<GameStatus>("LOBBY");

  const [opponentStatus, setOpponentStatus] = useState<PlayerStatus>();
  const [selfStatus, setSelfStatus] = useState<PlayerStatus>();
  const selfStatusPrev = useRef<PlayerStatus>(undefined);
  const [matchData, setMatchData] =
    useState<Pick<CnServerEventsMap["OPPONENT_FOUND"], "roomCode" | "matchId">>();
  const [opponentData, setOpponentData] = useState<CnServerEventsMap["OPPONENT_FOUND"]>();
  const [question, setQuestion] = useState<CnServerEventsMap["NEXT_QUESTION"]>();
  const [result, setResult] = useState<{
    winner?: number | null;
    selfResult: CnServerEventsMap["RESULT"]["answers"];
    opponentResult?: CnServerEventsMap["RESULT"]["opponentAnswers"];
  }>();
  const [startCountdownSecs, setStartCountdownSecs] = useState(0);
  const [isConnected, setIsConnected] = useState(true);

  const clearTimer = () => {
    removeTimer(retryTimer.current);
    retryTimer.current = undefined;
  };

  const onWsOpen = () => {
    setSelfStatus(selfStatusPrev.current);
    setIsConnected(true);
    console.log("[ws]: Open");
  };

  const onWsClose = () => {
    setIsConnected(false);
    setSelfStatus((s) => {
      selfStatusPrev.current = s;
      return "NETWORK_ERROR";
    });
    console.log("[ws]: Closed");
    if (reconnectTimer.current) {
      return;
    }
    reconnectTimer.current = setTimeout(() => {
      if (sessionData?.accessToken) {
        competitionWs.connect(sessionData.accessToken);
        wsReconnectDelay = Math.min(wsReconnectDelay * 2, 30000);
        clearTimeout(reconnectTimer.current);
        reconnectTimer.current = undefined;
      }
    }, wsReconnectDelay);
  };

  const onWsError = () => {
    console.log("[ws]: Error");
  };

  /** CLIENT: иницирум поиск соперника, то есть вход в игру (не начало!), ENTER_QUEUE  */
  const enterQueue = () => {
    competitionWs.emit("ENTER_QUEUE", {
      subCategoryId: subCategoryId,
      eventId,
    });
    setGameStatus("LOBBY");
  };

  /** CLIENT: я готов, соперник получает ивент - OPPONENT_READY, COMPETE */
  const compete = () => {
    if (retryTimer.current) {
      clearTimer();
    }
    if (matchData) {
      competitionWs.emit("COMPETE", {
        roomCode: matchData.roomCode,
        eventId,
      });
      setSelfStatus("READY");
      retryTimer.current = setTimer(compete);
    }
  };

  /** CLIENT: изменить противника, NEXT_OPPONENT */
  const nextOpponent = () => {
    if (matchData) {
      competitionWs.emit("NEXT_OPPONENT", {
        roomCode: matchData.roomCode,
        subCategoryId,
        eventId,
      });
      setGameStatus("SEARCH");
      setOpponentData(undefined);
      setSelfStatus("WAIT");
      setOpponentStatus(undefined);
      setMatchData(undefined);
    }
  };

  /** CLIENT: отправить ответ на вопрос, SUBMIT_ANSWER */
  const submitAnswer = (answer: string, elapsedMs: number) => {
    if (matchData && question) {
      competitionWs.emit("SUBMIT_ANSWER", {
        roomCode: matchData.roomCode,
        matchId: matchData.matchId,
        questionOrder: question?.questionOrder,
        answer,
        elapsedMs,
        eventId,
      });
    }
  };

  /** SERVER: добавление в очередь, IN_QUEUE */
  const onInQueue = (data: CnServerEventsMap["IN_QUEUE"]) => {
    setSelfStatus("WAIT");
    clearTimer();
    setGameStatus("SEARCH");
  };

  /** SERVER: нашелся соперник, OPPONENT_FOUND */
  const onOpponentFound = (data: CnServerEventsMap["OPPONENT_FOUND"]) => {
    generateEventId(data.eventId);
    setOpponentData(data);
    setSelfStatus("WAIT");
    setOpponentStatus("WAIT");
    setMatchData({ roomCode: data.roomCode, matchId: data.matchId });
    clearTimer();
    setGameStatus("WAIT");
  };

  /** SERVER: ждем ответа от соперника, COMPETE_AWAIT */
  const onCompeteAwait = () => {
    setOpponentStatus("WAIT");
    clearTimer();
    setGameStatus("WAIT");
  };

  /** SERVER: соперник готов, то есть отправил ивент - COMPETE, OPPONENT_READY */
  const onOpponentReady = () => {
    setOpponentStatus("READY");
    setGameStatus("WAIT");
    clearTimer();
  };

  /** SERVER: матч начался, получаем первый вопрос и отведенное на него время, COMPETE_START */
  const onCompeteStart = (data: CnServerEventsMap["START"]) => {
    const { countdownSec, ...other } = data;
    setOpponentStatus("READY");
    setStartCountdownSecs(countdownSec);
    setQuestion(other);
    generateEventId(other.eventId);
    clearTimer();
    setGameStatus("READY");
  };

  /** SERVER: получаем следующий вопрос, NEXT_QUESTION */
  const onNextQuestion = (data: CnServerEventsMap["NEXT_QUESTION"]) => {
    setQuestion(data);
    generateEventId(data.eventId);
    clearTimer();
    setGameStatus("START");
  };

  /** SERVER: ждем результат матча, WAIT_RESULT */
  const onWaitResult = (data: CnServerEventsMap["WAIT_RESULT"]) => {
    generateEventId(data.eventId);
    clearTimer();
    setResult({ selfResult: data.answers });
    setGameStatus("WAIT_RESULT");
  };

  /** SERVER: получаем результат матча, RESULT */
  const onResult = (data: CnServerEventsMap["RESULT"]) => {
    userApi.endpoints.getUserProfile.initiate({});
    generateEventId(data.eventId);
    clearTimer();
    setResult({
      winner: data.winnerId,
      selfResult: data.answers,
      opponentResult: data.opponentAnswers,
    });
    setGameStatus("RESULT");
    if (data.winnerId === null) {
      setSelfStatus("DRAFT");
      setOpponentStatus("DRAFT");
    } else {
      if (data.winnerId === opponentData?.opponentId?.id) {
        setOpponentStatus("WIN");
        setSelfStatus("LOSE");
      } else {
        setOpponentStatus("LOSE");
        setSelfStatus("WIN");
      }
    }
  };

  /** отдельное подтверждение действия, если на других сервер-ивентах нет eventId */
  const onAcknowledge = (data: CnServerEventsMap["ACKNOWLEDGE"]) => {
    generateEventId(data.eventId);
    clearTimer();
  };

  const onOpponentRejected = (data: CnServerEventsMap["OPPONENT_REJECTED"]) => {
    // generateEventId(data.eventId);
    clearTimer();
    setGameStatus("SEARCH");
    setOpponentData(undefined);
    setSelfStatus("WAIT");
    setOpponentStatus(undefined);
    setMatchData(undefined);
  };
  const onCancelled = (data: CnServerEventsMap["CANCELLED"]) => {
    console.log(`[ws: CANCELLED]: ${data.code} - ${data.message}`);
    clearTimer();
  };
  const onError = (data: CnServerEventsMap["ERROR"]) => {
    console.log(`[ws: ERROR]: ${data.code} - ${data.message}`);
    clearTimer();
  };

  useEffect(() => {
    if (!sessionData?.accessToken) {
      return;
    }

    competitionWs.connect(sessionData.accessToken);

    competitionWs.onOpen(onWsOpen);
    competitionWs.onClose(onWsClose);
    competitionWs.onError(onWsError);

    competitionWs.on("IN_QUEUE", onInQueue);
    competitionWs.on("OPPONENT_FOUND", onOpponentFound);
    competitionWs.on("COMPETE_AWAIT", onCompeteAwait);
    competitionWs.on("OPPONENT_READY", onOpponentReady);
    competitionWs.on("START", onCompeteStart);
    competitionWs.on("NEXT_QUESTION", onNextQuestion);
    competitionWs.on("WAIT_RESULT", onWaitResult);
    competitionWs.on("RESULT", onResult);
    competitionWs.on("ACKNOWLEDGE", onAcknowledge);
    competitionWs.on("OPPONENT_REJECTED", onOpponentRejected);
    competitionWs.on("CANCELLED", onCancelled);
    competitionWs.on("ERROR", onError);

    return () => {
      competitionWs.disconnect();
      if (retryTimer.current) {
        clearTimeout(retryTimer.current);
      }
      if (reconnectTimer.current) {
        clearTimeout(reconnectTimer.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionData]);

  return {
    enterQueue,
    compete,
    nextOpponent,
    submitAnswer,
    setGameStatus,

    profileData: data,
    question,
    selfStatus,
    opponentStatus,
    opponentData,
    matchData,
    result,
    startCountdownSecs,
    gameStatus,
    isConnected,
  };
};
