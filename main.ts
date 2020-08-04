/**
 * 控制灯的关闭
 * 
 * 白色
 * 
 * 红色
 */
input.onButtonPressed(Button.A, function () {
    radio.sendNumber(8)
})
input.onButtonPressed(Button.AB, function () {
    radio.sendNumber(0)
})
input.onButtonPressed(Button.B, function () {
    radio.sendNumber(9)
})
let joystick_r_y = 0
let joystick_r_x = 0
let joystick_l_y = 0
let joystick_l_x = 0
radio.setGroup(9)
music.startMelody(music.builtInMelody(Melodies.Entertainer), MelodyOptions.Once)
// 震动电机
pins.digitalWritePin(DigitalPin.P15, 1)
basic.pause(1000)
pins.digitalWritePin(DigitalPin.P15, 0)
let strip = neopixel.create(DigitalPin.P16, 1, NeoPixelMode.RGB)
// 下面俩按钮
pins.setPull(DigitalPin.P8, PinPullMode.PullUp)
pins.setPull(DigitalPin.P12, PinPullMode.PullUp)
basic.showIcon(IconNames.Heart)
basic.forever(function () {
    // 左摇杆设置引脚P13
    pins.digitalWritePin(DigitalPin.P13, 0)
    joystick_l_x = pins.analogReadPin(AnalogPin.P1)
    pins.digitalWritePin(DigitalPin.P13, 1)
    joystick_l_y = pins.analogReadPin(AnalogPin.P1)
    // 右摇杆设置引脚P13
    pins.digitalWritePin(DigitalPin.P14, 0)
    joystick_r_x = pins.analogReadPin(AnalogPin.P2)
    pins.digitalWritePin(DigitalPin.P14, 1)
    joystick_r_y = pins.analogReadPin(AnalogPin.P2)
    if (joystick_r_x < 300) {
        radio.sendNumber(3)
        radio.sendString("left")
        basic.showLeds(`
            . . # . .
            . # . . .
            # # # # #
            . # . . .
            . . # . .
            `)
    } else if (joystick_r_x > 700) {
        radio.sendNumber(4)
        radio.sendString("right")
        basic.showLeds(`
            . . # . .
            . . . # .
            # # # # #
            . . . # .
            . . # . .
            `)
    } else if (joystick_l_y < 300) {
        radio.sendNumber(2)
        radio.sendString("backward")
        basic.showLeds(`
            . . # . .
            . . # . .
            # . # . #
            . # # # .
            . . # . .
            `)
    } else if (joystick_l_y > 700) {
        radio.sendNumber(1)
        radio.sendString("forward")
        basic.showLeds(`
            . . # . .
            . # # # .
            # . # . #
            . . # . .
            . . # . .
            `)
    } else {
        radio.sendNumber(5)
    }
})
