import { COMPETITION_WS_URL } from "./api";
import {
  CnClientEventName,
  CnClientEventsMap,
  CnServerMessageSchema,
  CnServerEventName,
  CnServerEventsMap,
  CnServerEventSchema,
  GameResult,
} from "./model";
import { WsState } from "@/shared/model";

export class CompetitionWS {
  private ws: WebSocket | null = null;
  private handlers: Map<CnServerEventName, (data: any) => void> = new Map();
  private pendingMessages: Array<string> = [];

  constructor(
    private url: string,
    // private token: string
  ) {}

  private onOpenCb?: () => void;
  private onCloseCb?: () => void;
  private onErrorCb?: () => void;

  private _wsState(): WsState | undefined {
    if(!this.ws) return undefined;
    const readyState = this.ws.readyState;

    if(readyState === WebSocket.CONNECTING) return "CONNECTING";
    if(readyState === WebSocket.OPEN) return "OPEN";
    if(readyState === WebSocket.CLOSING) return "CLOSING";
    if(readyState === WebSocket.CLOSED) return "CLOSED";
  }

  connect(token: string) {
    if (this._wsState() === "OPEN") {
      return;
    }
    this.ws = new WebSocket(this.url + `/?token=${token}`);
    this.ws.onopen = () => {
      console.log("OPENED")
      //логика при установлении соединения
      while (this.pendingMessages.length > 0) {
        const message = this.pendingMessages.shift();
        if(message) {
          this.ws?.send(message);
        }
      }
      this.onOpenCb?.();
    };
    this.ws.onclose = () => {
      this.onCloseCb?.();
    };
    this.ws.onerror = () => {
      this.onErrorCb?.();
    };
    this.ws.onmessage = (e) => {
      const d = JSON.parse(e.data);
      try {
        const { event, data } = CnServerMessageSchema.parse(d);
        if (this.handlers.has(event)) {
          const EventDataSchema = CnServerEventSchema.shape[event]
          const validatedData = EventDataSchema.parse(data);
          this.handlers.get(event)?.(validatedData)
        }
      } catch (err) {
        console.error(`WS: [EVENT NAME: ${d.event}]`, err);
      }
    };
  }

  disconnect() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }

  onOpen(cb: () => void) {
    this.onOpenCb = cb;
  }

  onClose(cb: () => void) {
    this.onCloseCb = cb;
  }

  onError(cb: () => void) {
    this.onErrorCb = cb;
  }

  on<EventName extends CnServerEventName>(
    event: EventName,
    cb: (data: CnServerEventsMap[EventName]) => void
  ) {
    if(this.handlers.has(event)) {
      this.handlers.delete(event)
    }
    this.handlers.set(event, cb)
  }

  off(event: CnServerEventName) {
    if(this.handlers.has(event)) {
      this.handlers.delete(event)
    }
  }

  emit<EventType extends CnClientEventName>(
    event: EventType,
    data: CnClientEventsMap[EventType]
  ) {
    const payload = JSON.stringify({
      event,
      data,
    });

    if (this._wsState() === "CONNECTING") {
      this.pendingMessages.push(payload);
      return;
    }

    if (this._wsState() === "OPEN") {
      this.ws?.send(payload);
    }
  }
}

export const competitionWs = new CompetitionWS(COMPETITION_WS_URL);

export const getGameResult = (result: CnServerEventsMap['RESULT']['winnerId'] | undefined, selfId?: number): GameResult | undefined => {
  if(result === null) {
    return "DRAFT"
  }
  if(result && result === selfId) {
    return "WIN"
  }
  if(result && result !== selfId) {
    return "LOSE"
  }
  return undefined;
}