import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";

import { useSelector } from "@/shared/lib";

import { CnServerEventsMap, competitionWs } from "@/entities/competition";
import { PlayerStatusType } from "@/entities/competition";
import { userApi } from "@/entities/user";

import { GameStatus } from "../model";

let eventId = "1";

const isEventIdCorrect = (inEventId: number): boolean => Number(eventId) === Number(inEventId);
const generateEventId = (inEventId: string) => {
  if (isEventIdCorrect(Number(inEventId))) {
    eventId = Number(Number(inEventId) + 1).toString();
  }
};

const setTimer = (cb: () => void, delay: number = 3000) => {
  const id = setTimeout(cb, delay);
  return id;
};

/** @param timeoutId - всегда должен быть React.RefObject */
const removeTimer = (timeoutId?: NodeJS.Timeout, cb?: () => void) => {
  if (!timeoutId) return;
  clearTimeout(timeoutId);
  cb?.();
};

let wsReconnectDelay = 1000;
// const mockOpponent: CnServerEventsMap["OPPONENT_FOUND"] = {
//   opponentId: {
//     id: 1,
//     avatarUrl: "",
//     profileName: "Test Profilename Looooooooooooooooooooooooooong",
//     username: "test",
//     email: "test",
//     leagueName: "BRONZE",
//     totalPoints: 100,
//   },
//   roomCode: "1",
//   matchId: 1,
//   sessionTimeoutSec: 0,
//   winPoints: 10,
//   lossPoints: 10,
//   eventId: "",
// };

/** для того чтобы инкапсулировать логику игры от UI-компонента */
export const useGame = () => {
  const { accessToken } = useSelector((s) => s.user);
  const { subcategory } = useParams();
  const { data } = userApi.useGetUserProfileQuery(undefined);
  const [getUserdata] = userApi.useLazyGetHomeUserDataQuery();
  const [getProfiledata] = userApi.useLazyGetUserProfileQuery();

  // const { data: sessionData } = useSession();
  const subCategoryId = Number(subcategory);

  const retryTimer = useRef<NodeJS.Timeout>(undefined);
  const reconnectTimer = useRef<NodeJS.Timeout>(undefined);
  const sessionTimer = useRef<NodeJS.Timeout>(undefined);
  const sessionActiveRef = useRef<boolean>(false);
  /** оборвана ли связь специально, поможет при запуске реконнекта, если true то reconnect не запускается */
  const isManualDisconnect = useRef<boolean | null>(null);
  const [gameStatus, setGameStatus] = useState<GameStatus>("LOBBY");

  const [opponentStatus, setOpponentStatus] = useState<PlayerStatusType>();
  const [selfStatus, setSelfStatus] = useState<PlayerStatusType>();
  const selfStatusPrev = useRef<PlayerStatusType>(undefined);
  const [matchData, setMatchData] =
    useState<
      Pick<CnServerEventsMap["OPPONENT_FOUND"], "roomCode" | "matchId" | "sessionTimeoutSec">
    >();
  const [opponentData, setOpponentData] = useState<CnServerEventsMap["OPPONENT_FOUND"]>();
  const [question, setQuestion] = useState<CnServerEventsMap["NEXT_QUESTION"]>();
  const [result, setResult] = useState<{
    winner?: number | null;
    selfResult: CnServerEventsMap["RESULT"]["answers"];
    opponentResult?: CnServerEventsMap["RESULT"]["opponentAnswers"];
  }>();
  const [startCountdownSecs, setStartCountdownSecs] = useState(0);
  const [isConnected, setIsConnected] = useState(false);
  const [isSubmittingAnswer, setIsSubmittingAnswer] = useState(false);

  /** после отправки ивента - включаем, при получении отключаем */
  const [isPending, setIsPending] = useState(false);

  const resetGame = () => {
    setGameStatus("LOBBY");
    setOpponentStatus(undefined);
    setSelfStatus(undefined);
    setMatchData(undefined);
    setOpponentData(undefined);
    setQuestion(undefined);
    setResult(undefined);
    setStartCountdownSecs(0);
    setIsSubmittingAnswer(false);
    removeTimer(retryTimer.current, () => (retryTimer.current = undefined));
    removeTimer(reconnectTimer.current, () => (reconnectTimer.current = undefined));
    removeTimer(sessionTimer.current, () => (sessionTimer.current = undefined));
    sessionActiveRef.current = false;
    competitionWs.disconnect();
    if (accessToken) {
      competitionWs.connect(accessToken);
    }
  };

  const onWsOpen = () => {
    setIsConnected(true);
    setSelfStatus(selfStatusPrev.current);
    console.log("[ws]: Open");
  };

  const onWsClose = () => {
    setIsConnected(false);
    setSelfStatus((s) => {
      selfStatusPrev.current = s;
      return "NETWORK_ERROR";
    });
    console.log("[ws]: Closed");

    removeTimer(retryTimer.current, () => (retryTimer.current = undefined));
    removeTimer(reconnectTimer.current, () => (reconnectTimer.current = undefined));
    removeTimer(sessionTimer.current, () => (sessionTimer.current = undefined));

    if (isManualDisconnect.current === false) {
      if (reconnectTimer.current) {
        return;
      }
      reconnectTimer.current = setTimeout(() => {
        if (accessToken) {
          competitionWs.connect(accessToken);
          wsReconnectDelay = Math.min(wsReconnectDelay * 2, 30000);
          clearTimeout(reconnectTimer.current);
          reconnectTimer.current = undefined;
        }
      }, wsReconnectDelay);
    }
  };

  const onWsError = () => {
    console.log("[ws]: Error");
  };

  /** CLIENT: иницирум поиск соперника, то есть вход в игру (не начало!), ENTER_QUEUE  */
  const enterQueue = () => {
    setIsPending(true);
    sessionActiveRef.current = false;
    competitionWs.emit("ENTER_QUEUE", {
      subCategoryId: subCategoryId,
      eventId,
    });
    setGameStatus("LOBBY");
  };

  /** CLIENT: я готов, соперник получает ивент - OPPONENT_READY, COMPETE */
  const compete = () => {
    setIsPending(true);
    removeTimer(retryTimer.current, () => (retryTimer.current = undefined));
    if (matchData) {
      sessionActiveRef.current = true;
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
      removeTimer(sessionTimer.current, () => (sessionTimer.current = undefined));
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
      setIsSubmittingAnswer(true);
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
    setIsPending(false);
    setSelfStatus("WAIT");
    removeTimer(retryTimer.current, () => (retryTimer.current = undefined));
    setGameStatus("SEARCH");
  };

  /** SERVER: нашелся соперник, OPPONENT_FOUND */
  const onOpponentFound = (data: CnServerEventsMap["OPPONENT_FOUND"]) => {
    setIsPending(false);
    generateEventId(data.eventId);
    setOpponentData(data);
    setSelfStatus("WAIT");
    setOpponentStatus("WAIT");
    setMatchData({
      roomCode: data.roomCode,
      matchId: data.matchId,
      sessionTimeoutSec: data.sessionTimeoutSec,
    });
    removeTimer(sessionTimer.current, () => (sessionTimer.current = undefined));
    sessionTimer.current = setTimer(() => {
      if (sessionActiveRef.current === true) {
        enterQueue();
        return;
      }
      resetGame();
    }, data.sessionTimeoutSec * 1000);
    removeTimer(retryTimer.current, () => (retryTimer.current = undefined));
    setGameStatus("WAIT");
  };

  /** SERVER: ждем ответа от соперника, COMPETE_AWAIT */
  const onCompeteAwait = () => {
    setIsPending(false);
    setOpponentStatus("WAIT");
    removeTimer(retryTimer.current, () => (retryTimer.current = undefined));
    setGameStatus("WAIT");
  };

  /** SERVER: соперник готов, то есть отправил ивент - COMPETE, OPPONENT_READY */
  const onOpponentReady = () => {
    setIsPending(false);
    setOpponentStatus("READY");
    setGameStatus("WAIT");
    removeTimer(retryTimer.current, () => (retryTimer.current = undefined));
  };

  /** SERVER: матч начался, получаем первый вопрос и отведенное на него время, COMPETE_START */
  const onCompeteStart = (data: CnServerEventsMap["START"]) => {
    const { countdownSec, ...other } = data;
    setIsPending(false);
    setOpponentStatus("READY");
    setStartCountdownSecs(countdownSec);
    setQuestion(other);
    generateEventId(other.eventId);
    removeTimer(retryTimer.current, () => (retryTimer.current = undefined));
    setGameStatus("READY");
    removeTimer(sessionTimer.current, () => (sessionTimer.current = undefined));
  };

  /** SERVER: получаем следующий вопрос, NEXT_QUESTION */
  const onNextQuestion = (data: CnServerEventsMap["NEXT_QUESTION"]) => {
    setIsPending(false);
    setIsSubmittingAnswer(false);
    setQuestion(data);
    generateEventId(data.eventId);
    removeTimer(retryTimer.current, () => (retryTimer.current = undefined));
    setGameStatus("START");
  };

  /** SERVER: ждем результат матча, WAIT_RESULT */
  const onWaitResult = (data: CnServerEventsMap["WAIT_RESULT"]) => {
    setIsPending(false);
    generateEventId(data.eventId);
    removeTimer(retryTimer.current, () => (retryTimer.current = undefined));
    setResult({ selfResult: data.answers });
    setGameStatus("WAIT_RESULT");
    setSelfStatus("READY");
    setOpponentStatus("WAIT");
  };

  /** SERVER: получаем результат матча, RESULT */
  const onResult = (data: CnServerEventsMap["RESULT"]) => {
    setIsPending(false);
    getUserdata({}, true);
    getProfiledata({}, true);
    generateEventId(data.eventId);
    removeTimer(retryTimer.current, () => (retryTimer.current = undefined));
    setResult({
      winner: data.winnerId,
      selfResult: data.answers,
      opponentResult: data.opponentAnswers,
    });
    setGameStatus("RESULT");
  };

  /** отдельное подтверждение действия, если на других сервер-ивентах нет eventId */
  const onAcknowledge = (data: CnServerEventsMap["ACKNOWLEDGE"]) => {
    setIsPending(false);
    generateEventId(data.eventId);
    removeTimer(retryTimer.current, () => (retryTimer.current = undefined));
  };

  const onOpponentRejected = (data: CnServerEventsMap["OPPONENT_REJECTED"]) => {
    // generateEventId(data.eventId);
    setIsPending(false);
    removeTimer(retryTimer.current, () => (retryTimer.current = undefined));
    setGameStatus("SEARCH");
    setOpponentData(undefined);
    setSelfStatus("WAIT");
    setOpponentStatus(undefined);
    setMatchData(undefined);
    removeTimer(sessionTimer.current, () => (sessionTimer.current = undefined));
    sessionActiveRef.current = false;
  };

  const onCancelled = (data: CnServerEventsMap["CANCELLED"]) => {
    console.log(`[ws: CANCELLED]: ${data.code} - ${data.message}`);
    if (data.code === 409) {
      toast.error("Вы уже в игре!");
    }
    if (data.code === 410) {
      toast.error("Соперник покинул игру!");
    }
    setGameStatus((s) => {
      if (s === "WAIT") {
        resetGame();
        return "LOBBY";
      }
      return s;
    });
    setIsPending(false);
    removeTimer(retryTimer.current, () => (retryTimer.current = undefined));
  };

  useEffect(() => console.log("Status: ", gameStatus), [gameStatus]);
  const onError = (data: CnServerEventsMap["ERROR"]) => {
    console.log(`[ws: ERROR]: ${data.code} - ${data.message}`);
    if (data.code === 410) {
      toast.error("Соперник покинул игру!");
    }
    if (data.code === 409) {
      toast.error("Вы уже в игре!");
    }
    setIsPending(false);
    resetGame();
  };

  useEffect(() => {
    if (gameStatus === "RESULT" && opponentData && result) {
      if (result.winner === null) {
        setSelfStatus("DRAW");
        setOpponentStatus("DRAW");
      } else {
        if (result.winner === opponentData?.opponentId?.id) {
          setOpponentStatus("WIN");
          setSelfStatus("LOSE");
        } else {
          setOpponentStatus("LOSE");
          setSelfStatus("WIN");
        }
      }
    }
  }, [gameStatus, opponentData, result]);

  useEffect(() => {
    if (!accessToken) {
      return;
    }

    competitionWs.connect(accessToken);

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
      isManualDisconnect.current = true;
      competitionWs.disconnect();
      if (retryTimer.current) {
        clearTimeout(retryTimer.current);
      }
      if (reconnectTimer.current) {
        clearTimeout(reconnectTimer.current);
      }
      if (sessionTimer.current) {
        clearTimeout(sessionTimer.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken]);

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
    isSubmittingAnswer,
    isPending,
  };
};
