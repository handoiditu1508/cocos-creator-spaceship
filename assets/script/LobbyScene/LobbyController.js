var Global = require("Global");

cc.Class({
	extends: cc.Component,

	properties: {
		backgroundMusic: {
			default: null,
			type: cc.AudioClip
		},
	},

	onLoad: function () {
		Global.lobby = this;
		Global.state = Global.GAME_STATE.lobby;

		if (Global.backgroundMusicAudioID == null || !cc.audioEngine.isMusicPlaying()) {
			cc.audioEngine.stopMusic();
			Global.backgroundMusicAudioID = cc.audioEngine.playMusic(this.backgroundMusic, true);
		}

		cc.director.preloadScene("GameCustomScene");
	},

	onDestroy: function () {
		Global.lobby = null;
	},

	onClickButtonPlay: function (event) {
		cc.director.loadScene("GameCustomScene");
	},

	onClickButtonExit: function (event) {
		cc.game.end();
	},

	onClickButtonTrophy: function (event) {
		//console.log("trophy");
	},

	onClickButtonShopping: function (event) {
		//console.log("shopping");
	}
});
