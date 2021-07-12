class GameController {

    constructor(level) {
        this.game = new Game(level);

        this.keyStates = new KeyState(false, false, false, false, false);

        document.addEventListener("keydown", () => this.handleKeyPress(event, true));
        document.addEventListener("keyup", () => this.handleKeyPress(event, false));
    }

    startGame() {
        const me = this;
        this.timer = setInterval(() => me.step(), 1000/60);

        BoardView.resize();
        NextBoxView.resize();

        BoardView.clear();
        NextBoxView.clear();
    }

    stopGame() {
        if (this.timer !== undefined) {
            clearInterval(this.timer);
        }
    }

    step() {
        const state = this.game.nextFrame(this.keyStates);

        if (state.isGameOver) {
            this.stopGame();
            WebpageController.gameOver();
        }

        BoardView.draw(state);
        NextBoxView.draw(state);
        StatsView.draw(state);
    }

    togglePlayPause() {
        console.log("play/pause toggled");
    }

    handleKeyPress(event, isPressed) {
        if (event.repeat)
            return;

        switch(event.keyCode) {
            case 40: // DOWN
                this.keyStates.down = isPressed;
                break;
            case 37: // LEFT
                this.keyStates.left = isPressed;
                break;
            case 39: // RIGHT
                this.keyStates.right = isPressed;
                break;
            case 90: // Z
                this.keyStates.rotateCW = isPressed;
                break;
            case 88: // X
                this.keyStates.rotateACW = isPressed;
                break;
        }
    }

}