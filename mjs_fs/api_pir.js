load('api_config.js');
load('api_gpio.js');
load('api_mqtt.js');
load('api_timer.js');

function init() {
    let pin = Cfg.get('pir.pin');
    let topic = Cfg.get('pir.topic');
    GPIO.set_mode(pin, GPIO.MODE_INPUT);
    Timer.set(1000 * 5, Timer.REPEAT, function () {
        let state = GPIO.read(pin);
        MQTT.pub(topic, JSON.stringify({
            "state": state
        }), 1, false);
    }, null);
}

init();