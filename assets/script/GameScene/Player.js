var Global = require("Global");

cc.Class({
	extends: cc.Component,

	properties: {
		alive: true
	},

	onCollisionEnter: function (other, self) {
		switch (other.node.groupIndex) {
			case Global.GROUP.enemy:
				//player die, show popup
				this.alive = false;
				this.node.active = false;
				Global.game.onEndGame(false);
				break;
			default:
				break;
		}
	}
});
