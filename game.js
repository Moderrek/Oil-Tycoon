class Game {
    /**
     * @type {GameObject[]} gameobjects
     */
    gameobjects = [];

    constructor() {
        this.gameobjects = [];
    }

    addGameObject(gameobject) {
        gameobject._init(this);
        this.gameobjects.push(gameobject);
    }
}