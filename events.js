class EventManager {
  constructor() {
    this.eventList = [];
  }

  on(eventName, callback) {
    if (!this.eventList[eventName]) {
      this.eventList[eventName] = [];
    }
    this.eventList[eventName].push(callback);
  }

  emit(eventName, event) {
    if (!this.eventList[eventName]) {
      return;
    }
    this.eventList[eventName].forEach((callback) => {
      callback(event);
    });
  }
}

class IEvent {}

class GameEvent extends IEvent {
  constructor(handler) {
    super();
    this.handler = handler;
  }
}

class UpdateEvent extends GameEvent {
  constructor(handler, deltaTime) {
    super(handler);
    this.deltaTime = deltaTime;
  }
}
