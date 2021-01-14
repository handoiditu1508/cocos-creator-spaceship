var Global = require("Global");

cc.Class({
	extends: cc.Component,

	properties: {
		player: {
			default: null,
			type: cc.Node
		},

		focusArea: new cc.Size(0, 0),

		speed: {
			default: 5,
			type: cc.Float
		}
	},

	lateUpdate: function (dt) {
		var playerGlobalPos = this.player.parent.convertToWorldSpaceAR(this.player.position);
		var cameraGlobalPos = this.node.parent.convertToWorldSpaceAR(this.node.position);

		var offsetX = playerGlobalPos.x - cameraGlobalPos.x;
		if (Math.abs(offsetX) > this.focusArea.width / 2) {
			var directionX = 0;
			if (offsetX != 0) {
				directionX = offsetX / Math.abs(offsetX);
				this.node.x += directionX * this.speed * dt;
			}
		}

		var offsetY = playerGlobalPos.y - cameraGlobalPos.y;
		if (Math.abs(offsetY) > this.focusArea.height / 2) {
			var directionY = 0;
			if (offsetY != 0) {
				directionY = offsetY / Math.abs(offsetY);
				this.node.y += directionY * this.speed * dt;
			}
		}

		//limit camera position inside world
		this.limitCameraPosition();
	},

	limitCameraPosition: function(){
		var cameraGlobalPos = Global.game.convertToGameWorldSpaceAR(this.node.parent.convertToWorldSpaceAR(this.node.position));

		var halfCameraWidth = Global.game.node.getComponent(cc.Canvas).designResolution.width / 2;
		var halfCameraHeight = Global.game.node.getComponent(cc.Canvas).designResolution.height / 2;

		if (cameraGlobalPos.x + halfCameraWidth > Global.game.worldSize.width)
			this.node.x -= cameraGlobalPos.x + halfCameraWidth - Global.game.worldSize.width;
		else if (cameraGlobalPos.x - halfCameraWidth < 0)
			this.node.x -= cameraGlobalPos.x - halfCameraWidth;

		if (cameraGlobalPos.y + halfCameraHeight > Global.game.worldSize.height)
			this.node.y -= cameraGlobalPos.y + halfCameraHeight - Global.game.worldSize.height;
		else if (cameraGlobalPos.y - halfCameraHeight < 0)
			this.node.y -= cameraGlobalPos.y - halfCameraHeight;
	},
});
