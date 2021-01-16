var Global = require("Global");

cc.Class({
	extends: cc.Component,

	properties: {
		time: {
			default: 99,
			type: cc.Float,
			tooltip: "Time in seconds"
		}
	},

	start: function () {
		this.node.getComponent(cc.Label).string = this.formatSeconds(this.time);
	},

	update: function (dt) {
		if (dt > this.time) {
			this.time = 0;
			this.enabled = false;
			Global.game.onEndGame(false);
		}
		else this.time -= dt;
		this.node.getComponent(cc.Label).string = this.formatSeconds(this.time);
	},

	formatSeconds: function (seconds) {
		return new Date(seconds * 1000).toISOString().substr(11, 8);
	}
});
