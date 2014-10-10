var $ = require("jquery"),
    _ = require("underscore");

var index = {

    clockTemplate: _.template(require("./templates/clock.tpl")),

    init: function () {
        this.initClock();
    },

    initClock: function () {
        this.terminalDate = new Date(Date.parse("2014-11-8 0:0:0"));

        this.renderClock();
        var clockTimer = setInterval($.proxy(function () {
            this.renderClock();
        }, this), 100);
    },

    renderClock: function () {
        var msDelta = (this.terminalDate - new Date()),
            sDelta = msDelta / 1000,
            hour = Math.floor(sDelta / 60 / 60),
            minute = Math.floor(sDelta / 60) % 60,
            second = Math.floor(sDelta % 60);

        var clock = {
            hour: hour,
            minute: minute,
            second: second
        };

        $(".clock-wrapper").html(this.clockTemplate(clock));
    }
};

module.exports = index;