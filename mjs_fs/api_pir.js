load('api_config.js');
load('api_gpio.js');
load('api_mqtt.js');
load('api_timer.js');

function init() {
    GPIO.set_mode(Cfg.get('pir.pin'), GPIO.MODE_INPUT);
    Timer.set(1000 * 1, Timer.REPEAT, function () {
        MQTT.pub(Cfg.get('pir.topic'), JSON.stringify(GPIO.read(Cfg.get('pir.pin'))), 1, false);
        print(JSON.stringify(GPIO.read(Cfg.get('pir.pin'))));
    }, null);
}

init();