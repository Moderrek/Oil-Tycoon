class GameObject {
  constructor() {
    this.name = "Unknown";
    this.components = [];
    this.handler = null;
  }

  /**
   * @returns {boolean} Whether the Game object is handled by the Game handler
   */
  isHandled() {
    return this.handler != null;
  }

  /**
   * Gets the Game handler
   * @returns {Game} The Game handler
   */
  getHandler() {
    return this.handler;
  }

  /**
   * @param {Game} handler The Game handler
   */
  _init(handler) {
    // Handle the game object
    this.handler = handler;
    // Initialize all components
    for (let i = 0; i < this.components.length; i++) {
      this.components[i]._init(this);
    }
    // Start all components
    for (let i = 0; i < this.components.length; i++) {
      this.components[i].start(handler);
    }
  }

  _update() {
    if (!this.isHandled()) {
      console.error("Game object not handled");
      return;
    }
    for (let i = 0; i < this.components.length; i++) {
      this.components[i].update();
    }
  }

  _draw() {
    if (!this.isHandled()) {
      console.error("Game object not handled");
      return;
    }
    for (let i = 0; i < this.components.length; i++) {
      this.components[i].draw();
    }
  }
  
  addComponent(component) {
    component._init(this);
    this.components.push(component);
  }

  /**
   * Gets component of given type.
   * @param {Component} type The type of the component
   * @returns The component of the given type, or null if not found
   */
  getComponent(type) {
    for (let i = 0; i < this.components.length; i++) {
      if (this.components[i] instanceof type) {
        return this.components[i];
      }
    }
    return null;
  }

  removeComponent(type) {
    for (let i = 0; i < this.components.length; i++) {
      if (this.components[i] instanceof type) {
        this.components.splice(i, 1);
        return;
      }
    }
  }

  /**
   * @returns {Transform} The Transform component
   */
  getTransform() {
    const found = this.getComponent(Transform);
    if (!found) {
      throw new Error("Transform component not found");
    }
    return found;
  }
}

class Component {
  _init(gameObject) {
    this.gameObject = gameObject;
  }

  /**
   * Invoked when the component is added to a GameObject
   * @param {Game} handler The Game handler 
   */
  start(handler) {}
  /**
   * Invoked every frame
    * @param {UpdateEvent} event The update event
   */
  update(event) {}
  /**
   * Invoked every frame and sometimes for example when the window resizes
   * @param {GameEvent} event The draw event
   */
  draw(event) {}
}

class Transform extends Component {
  constructor() {
    super();
    this.position = new Vec2(0, 0);
  }

  /**
   * @param {Vec2} position The position
   */
  setPosition(position) {
    this.position = position;
  }

  /**
   * @param {Vec2} position The position
   */
  move(position) {
    this.position = this.position.add(position);
  }
}

class SpriteRenderer extends Component {
  constructor(sprite) {
    super();
    this.sprite = sprite;
  }

  draw() {
    this.gameObject.handler.drawSprite(this.sprite, this.gameObject.getTransform().position);
  }
}

class ShapeRenderer extends Component {
  constructor(size) {
    super();
    this.size = size;
  }

  draw() {
    drawRect(this.gameObject.getTransform().position, this.size);
  }
}

const CreateGameObject = () => {
  const go = new GameObject();
  go.addComponent(new Transform());
  return go;
}

/**
 * @param {Vec2} pos
 * @param {Vec2} size  
 * @returns {GameObject}
 */
const CreateSprite = (pos, size) => {
  const go = CreateGameObject();
  // Set the position of the game object
  go.getTransform().setPosition(pos);
  // Add the sprite renderer component
  go.addComponent(new ShapeRenderer(size));
  return go;
}

const Instiantiate = (gameObject) => {
  game.addGameObject(gameObject);
  return gameObject;
}

const InstiantiateGameObject = () => {
  const go = CreateGameObject();
  Instiantiate(go);
  return go;
}