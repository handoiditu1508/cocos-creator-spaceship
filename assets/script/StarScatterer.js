cc.Class({
	extends: cc.Component,

	properties: {
		starNumber: {
			default: 0,
			type: cc.Integer
		},

		starSprite: {
			default: null,
			type: cc.SpriteFrame
		}
	},

	onLoad: function () {
		for (var i = 0; i < this.starNumber; i++) {
			var star = new cc.Node();
			star.addComponent(cc.Sprite);
			star.getComponent(cc.Sprite).spriteFrame = this.starSprite;
			star.setPosition(this.getStarPosition());
			this.node.addChild(star);
		}
	},

	getStarPosition: function () {
		var maxX = this.node.width / 2;
		var minX = -maxX;
		var maxY = this.node.height / 2;
		var minY = -maxY;
		var posX = Math.random() * (maxX - minX) + minX;
		var posY = Math.random() * (maxY - minY) + minY;
		return cc.v2(posX, posY);
	}
});
