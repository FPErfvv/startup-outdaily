

class EventMessage {
  constructor(from, score) {
    this.from = from;
    this.score = score;
  }
}

class GameEventNotifier {
  events = [];
  

  constructor() {
    this.handlerFunction = null;
    let port = window.location.port;
    const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
    this.socket = new WebSocket(`${protocol}://${window.location.hostname}:${port}/ws`);
    this.socket.onmessage = async (msg) => {
      try {
        const event = JSON.parse(await msg.data.text());
        this.receiveEvent(event);
      } catch {}
    };
  }

  broadcastEvent(from, score) {
    const event = new EventMessage(from, score);
    this.socket.send(JSON.stringify(event));
  }

  addHandler(handler) {
    this.handlerFunction = handler;
  }

  removeHandler(handler) {
    this.handlerFunction = null;
  }

  receiveEvent(event) {
    this.events.push(event);

    if (this.handlerFunction) {
      this.handlerFunction(event);
    }
  }
}

const GameNotifier = new GameEventNotifier();
export { GameNotifier };
