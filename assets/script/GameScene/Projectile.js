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
		},

		damage: {
			default: 1,
			type: cc.Float
		},
		causeDamageToEnemy: true,
		causeDamageToPlayer: false
	},

	start: function () {
		//this.node.scaleX =this.directionX;
		this.node.scaleX = 0;
		//this.node.getComponent(cc.BoxCollider).size.width = 0;
	},

	update: function (dt) {
		this.node.x += this.speed * dt * this.directionX;

		this.node.scaleX += (this.speed * dt) / this.node.width * this.directionX;
		if (Math.abs(this.node.scaleX) > 1) {
			this.node.scaleX = this.directionX;
		}
		
		//this.node.getComponent(cc.BoxCollider).size.width = this.node.width * this.node.scaleX;

		this.limitProjectilePosition();
	},

	limitProjectilePosition: function () {
		var globalPosition = Global.game.convertToGameWorldSpaceAR(this.node.parent.convertToWorldSpaceAR(this.node.position));

		var halfImageWidth = this.node.width / 2;

		if (globalPosition.x - halfImageWidth > Global.game.worldSize.width || globalPosition.x + halfImageWidth < 0)
			this.node.destroy();
	},

	onCollisionEnter: function (other, self) {
		switch (other.node.groupIndex) {
			case Global.GROUP.enemy:
				other.node.getComponent("Enemy").takeDamage(this.damage);
				//this.node.destroy();
				cc.tween(this.node)
					.call(()=>{this.node.getComponent(cc.Collider).enabled = false})
					.delay(0.1)
					.call(()=>{this.node.destroy()})
					.start();
				break;
			default:
				break;
		}
	}
});
