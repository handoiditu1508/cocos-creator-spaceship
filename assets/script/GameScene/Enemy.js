var Global = require("Global");

cc.Class({
	extends: cc.Component,

	properties: {
		health: {
			default: 2,
			type: cc.Float
		}
	},

	takeDamage: function (damage) {
		if (damage < this.health) {
			this.health -= damage;
		}
		else {
			this.node.destroy();
			Global.game.enemyKilled();
		}
	}
});
