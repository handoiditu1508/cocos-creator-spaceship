var Global = require("Global");

cc.Class({
	extends: cc.Component,

	properties: {
		worldSize: new cc.Size(400, 400),

		enemyPrefab: {
			default: null,
			type: cc.Prefab
		},

		enemyNumber: {
			default: 10,
			type: cc.Integer
		},

		enemyContainer: {
			default: null,
			type: cc.Node
		}
	},

	onLoad: function () {
		Global.game = this;
		this.scatterEnemy(this.enemyNumber);
	},

	convertToGameWorldSpaceAR: function (worldPoint) {
		var canvasSize = this.node.getComponent(cc.Canvas).designResolution;
		return new cc.v2(worldPoint.x - canvasSize.width / 2 + this.worldSize.width / 2, worldPoint.y - canvasSize.height / 2 + this.worldSize.height / 2);
	},

	convertBackToWorldSpaceAR: function (gameWorldPoint) {
		var canvasSize = this.node.getComponent(cc.Canvas).designResolution;
		return new cc.v2(gameWorldPoint.x - this.worldSize.width / 2 + canvasSize.width / 2, gameWorldPoint.y - this.worldSize.height / 2 + canvasSize.height / 2);
	},

	getEnemyPosition: function () {
		var posX = Math.random() * this.worldSize.width;
		var posY = Math.random() * this.worldSize.height;
		var Enemyposition = this.convertBackToWorldSpaceAR(cc.v2(posX, posY));
		return this.enemyContainer.convertToNodeSpaceAR(Enemyposition);
	},

	scatterEnemy: function (number) {
		for (var i = 0; i < number; i++) {
			var enemy = cc.instantiate(this.enemyPrefab);
			enemy.position = this.getEnemyPosition();
			this.enemyContainer.addChild(enemy);
		}
	}
});
