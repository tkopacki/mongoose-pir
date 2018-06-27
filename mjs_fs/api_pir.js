load('api_config.js');
load('api_gpio.js');
load('api_mqtt.js');
load('api_timer.js');

let previous = -1;

function init() {
    GPIO.set_mode(Cfg.get('pir.pin'), GPIO.MODE_INPUT);
    GPIO.set_mode(Cfg.get('pir.led'), GPIO.MODE_OUTPUT);
    Timer.set(1000 * 1, Timer.REPEAT, function () {
        let current = GPIO.read(Cfg.get('pir.pin'));
        if (current !== previous) {
            print("State update to", current);
            previous = current;
            MQTT.pub(Cfg.get('pir.topic'), JSON.stringify(current), 1, false);
        } else {
            print("No change on state observed(", current, ")");
        }
        GPIO.write(Cfg.get('pir.led'), current);
    }, null);
}

MQTT.pub(Cfg.get('pir.topic'), "Hello !", 1, false);
print("Init");
init();
print("Init done");