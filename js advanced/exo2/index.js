class Timer {

    #time = 10;
    #interval;
    #input;
    #play_btn;
    #pause_btn;

    constructor(input, play_btn, pause_btn) { console.log("construct");
        this.#input = input;
        this.#play_btn = play_btn;
        this.#pause_btn = pause_btn;

        let self = this;
        this.#input.addEventListener('keypress', (e) => {
            if (e.key != "Enter")
                return;

            self.#time = self.#input.value;
            self.play(e, self);
        });
        this.#play_btn.addEventListener('click', function(e) { console.log("clicked"); self.play(e, self); });
        this.#pause_btn.addEventListener('click', function(e) { console.log("clicked"); self.pause(e, self); });
    }

    play(event, self) { console.log("play");
        self.#interval = setInterval(function() { self.decrement(self) }, 1000);
    }

    pause(event, self) { console.log("pause")
        if (self.#interval)
            clearInterval(self.#interval);
    }

    decrement(self) { console.log("decrement");
        if (self.#time <= 0){
            clearInterval(self.#interval);
            return;
        }
            
        self.#time--;
        self.#input.value = self.#time;
    }

}

// well, we should start from somewhere ~~
onload();

// Fires on load
function onload() {

    const timer = new Timer(
        document.querySelector("#timer > .time"),
        document.querySelector("#timer > .row > .play-btn"),
        document.querySelector("#timer > .row > .pause-btn"),
    );

}
