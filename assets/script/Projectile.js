var Global = require("Global");

cc.Class({
	extends: cc.Component,

	properties: {
		speed: {
			default: 500,
			type: cc.Float
		},

		directionX: {
			default: Global.DIRECTION_X.right
		}
	},

	update: function (dt) {
		this.node.x += this.speed * dt * this.directionX;

		this.limitProjectilePosition();
	},

	limitProjectilePosition: function () {
		var globalPosition = Global.game.convertToGameWorldSpaceAR(this.node.parent.convertToWorldSpaceAR(this.node.position));

		var halfImageWidth = this.node.width / 2;

		if (globalPosition.x - halfImageWidth > Global.game.worldSize.width || globalPosition.x + halfImageWidth < 0)
			this.node.destroy();
	},
});
