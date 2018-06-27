load('api_config.js');
load('api_gpio.js');
load('api_mqtt.js');
load('api_timer.js');

let previous = -1;

function init() {
    GPIO.set_mode(Cfg.get('pir.pin'), GPIO.MODE_INPUT);
    Timer.set(1000 * 1, Timer.REPEAT, function () {
        let current = GPIO.read(Cfg.get('pir.pin'));
        if(current !== previous) {
            previous = current;
            MQTT.pub(Cfg.get('pir.topic'), JSON.stringify(current), 1, false);
        }
    }, null);
}

init();