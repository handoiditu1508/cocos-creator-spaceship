var Global = require("Global");

cc.Class({
	extends: cc.Component,

	properties: {
		speed: {
			default: 200,
			type: cc.Float
		},

		detectionRadius: {
			default: 100,
			type: cc.Float
		},

		directionX: {
			default: 0,
			type: cc.Float,
			range: [-1, 1]
		},

		directionY: {
			default: 0,
			type: cc.Float,
			range: [-1, 1]
		},
		
		detectionAudio: {
			default: null,
			type: cc.AudioClip
		},

		_isFollowingPlayer: false
	},

	start: function () {
		if (this.directionX == 0 && this.directionY == 0) {
			this.generateDirection();
		}
		else {
			var normalizedDirection = cc.v2(this.directionX, this.directionY).normalize();
			this.directionX = normalizedDirection.x;
			this.directionY = normalizedDirection.y;
		}
	},

	update: function (dt) {
		this.node.setPosition(this.node.x + this.directionX * this.speed * dt, this.node.y + this.directionY * this.speed * dt);

		if (this.isPlayerInSight()){
			if(!this._isFollowingPlayer){
				cc.audioEngine.playEffect(this.detectionAudio, false);
				this._isFollowingPlayer = true;
			}

			var playerPos = Global.game.player.parent.convertToWorldSpaceAR(Global.game.player.position);
			var enemyPos = this.node.parent.convertToWorldSpaceAR(this.node.position);
			var direction = playerPos.sub(enemyPos);
			direction = direction.normalize();
			this.directionX = direction.x;
			this.directionY = direction.y;
		}
		else this._isFollowingPlayer = false;

		var globalPosition = Global.game.convertToGameWorldSpaceAR(this.node.parent.convertToWorldSpaceAR(this.node.position));
		if (globalPosition.x > Global.game.worldSize.width || globalPosition.x < 0 || globalPosition.y > Global.game.worldSize.height || globalPosition.y < 0) {
			this.generateDirection();
		}
	},

	isPlayerInSight: function () {
		if (!Global.game.player.getComponent("Player").alive)
			return false;

		var playerPos = Global.game.player.parent.convertToWorldSpaceAR(Global.game.player.position);
		var enemyPos = this.node.parent.convertToWorldSpaceAR(this.node.position);

		var t1 = (playerPos.x - enemyPos.x);
		var t2 = (playerPos.y - enemyPos.y);
		return t1 * t1 + t2 * t2 <= this.detectionRadius * this.detectionRadius;
	},

	generateDirection: function () {
		do {
			this.directionX = Math.random() * 2 - 1;
			this.directionY = Math.random() * 2 - 1;
		}
		while (this.directionX == 0 && this.directionY == 0);

		var normalizedDirection = cc.v2(this.directionX, this.directionY).normalize();
		this.directionX = normalizedDirection.x;
		this.directionY = normalizedDirection.y;
	}
});
