import EventEmitter from "./event-emitter";

export default class Time extends EventEmitter {
    constructor(options) {
        super(options);

        this.start = Date.now();
        this.current = this.start;
        this.elapsed = 0;
        this.delta = 16;

        this.tick = this.tick.bind(this);
        this.tick();
    }

    tick() {
        this.ticker = requestAnimationFrame(this.tick);

        const current = Date.now();

        this.delta = current - this.current;
        this.elapsed = current - this.start;
        this.current = current;

        if (this.delta > 60) {
            this.delta = 60;
        }

        this.emit('tick');
    }

    stop() {
        window.cancelAnimationFrame(this.ticker);
    }
}
