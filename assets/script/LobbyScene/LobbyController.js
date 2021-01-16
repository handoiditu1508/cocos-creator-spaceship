var Global = require("Global");

cc.Class({
	extends: cc.Component,

	properties: {

	},

	onLoad: function () {
		Global.lobby = this;
		Global.state = Global.GAME_STATE.lobby;
	},

	onDestroy: function () {
		Global.lobby = null;
	},

	onClickButtonPlay: function (event) {
		cc.director.loadScene("GameCustomScene");
	},

	onClickButtonExit: function (event) {
		console.log("exit");
		//cc.director.end();
	},

	onClickButtonTrophy: function (event) {
		console.log("trophy");
	},

	onClickButtonShopping: function (event) {
		console.log("shopping");
	}
});
