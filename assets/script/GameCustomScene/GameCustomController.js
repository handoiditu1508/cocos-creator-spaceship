var Global = require("Global");

cc.Class({
	extends: cc.Component,

	properties: {
		timeValues: [cc.Integer],
		_timeIndex: null,
		timeValueLabel: {
			default: null,
			type: cc.Label
		},

		speedValues: [cc.Integer],
		_speedIndex: null,
		speedValueLabel: {
			default: null,
			type: cc.Label
		},

		enemyMobilityCheckbox: {
			default: null,
			type: cc.Toggle
		}
	},

	onLoad: function () {
		Global.gameCustom = this;
		Global.state = Global.GAME_STATE.customGame;

		if (this.timeValues.length == 0) {
			this.timeValues.push(0);
		}
		if (Global.gameTime != null) {
			this._timeIndex = this.timeValues.indexOf(Global.gameTime);
		}
		else this._timeIndex = 0;
		this.timeValueLabel.string = this.timeValues[this._timeIndex];

		if (this.speedValues.length == 0) {
			this.speedValues.push(0);
		}
		if (Global.playerSpeed != null) {
			this._speedIndex = this.speedValues.indexOf(Global.playerSpeed);
		}
		else this._speedIndex = 0;
		this.speedValueLabel.string = this.speedValues[this._speedIndex];

		if (Global.isMobileEnemy != null) {
			this.enemyMobilityCheckbox.isChecked = Global.isMobileEnemy;
		}
		else this.enemyMobilityCheckbox.isChecked = false;
	},

	onDestroy: function () {
		Global.gameCustom = null;
	},

	onClickButtonBack: function (event) {
		cc.director.loadScene("LobbyScene");
	},

	onClickButtonStart: function (event) {
		Global.gameTime = this.timeValues[this._timeIndex];
		Global.playerSpeed = this.speedValues[this._speedIndex];
		Global.isMobileEnemy = this.enemyMobilityCheckbox.isChecked;
		cc.director.loadScene("GameScene");
	},

	onClickButtonPrevTime: function (event) {
		if (this._timeIndex == 0)
			this._timeIndex = this.timeValues.length - 1;
		else this._timeIndex--;
		this.timeValueLabel.string = this.timeValues[this._timeIndex];

		Global.gameTime = this.timeValues[this._timeIndex];
	},

	onClickButtonNextTime: function (event) {
		this._timeIndex = (this._timeIndex + 1) % this.timeValues.length;
		this.timeValueLabel.string = this.timeValues[this._timeIndex];

		Global.gameTime = this.timeValues[this._timeIndex];
	},

	onCheckEnemyMobility: function (event) {
		Global.isMobileEnemy = event.isChecked;
	},

	onClickButtonPrevSpeed: function (event) {
		if (this._speedIndex == 0)
			this._speedIndex = this.speedValues.length - 1;
		else this._speedIndex--;
		this.speedValueLabel.string = this.speedValues[this._speedIndex];

		Global.playerSpeed = this.speedValues[this._speedIndex];
	},

	onClickButtonNextSpeed: function (event) {
		this._speedIndex = (this._speedIndex + 1) % this.speedValues.length;
		this.speedValueLabel.string = this.speedValues[this._speedIndex];

		Global.playerSpeed = this.speedValues[this._speedIndex];
	},
});
