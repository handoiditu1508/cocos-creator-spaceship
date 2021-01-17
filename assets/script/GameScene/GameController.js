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
		_enemyLeft: 0,
		enemeLeftLabel: {
			default: null,
			type: cc.Label,
		},

		enemyContainer: {
			default: null,
			type: cc.Node
		},

		popup: {
			default: null,
			type: cc.Node
		},

		player: {
			default: null,
			type: cc.Node
		},

		timer: {
			default: null,
			type: cc.Node
		},

		backgroundMusic: {
			default: null,
			type: cc.AudioClip
		},
	},

	onLoad: function () {
		var manager = cc.director.getCollisionManager();
		manager.enabled = true;
		//manager.enabledDebugDraw = true;
		//manager.enabledDrawBoundingBox = true;

		Global.game = this;
		Global.state = Global.GAME_STATE.playing;
		this.scatterEnemy(this.enemyNumber);
		this._enemyLeft = this.enemyNumber;
		this.enemeLeftLabel.string = "x " + this.enemyNumber;

		if (Global.gameTime != null) {
			this.timer.getComponent("Timer").time = Global.gameTime;
		}

		if (Global.playerSpeed != null) {
			this.player.getComponent("PlayerControl").speed = Global.playerSpeed;
		}

		Global.backgroundMusicAudioID = null,
		cc.audioEngine.stopMusic();
		cc.audioEngine.playMusic(this.backgroundMusic, true);
	},

	onDestroy: function () {
		Global.game = null;
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
			if (Global.isMobileEnemy != null) {
				enemy.getComponent("EnemyAI").enabled = Global.isMobileEnemy;
			}
			enemy.position = this.getEnemyPosition();
			this.enemyContainer.addChild(enemy);
		}
	},

	enemyKilled: function () {
		this._enemyLeft--;
		this.enemeLeftLabel.string = "x " + this._enemyLeft;

		if (this._enemyLeft == 0) {
			this.onEndGame(true);
		}
	},

	onEndGame: function (isWin) {
		Global.state = isWin ? Global.GAME_STATE.won : Global.GAME_STATE.lost;
		this.popup.getComponent("Popup").showWindow();
	}
});
