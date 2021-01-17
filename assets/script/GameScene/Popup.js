var TWEEN_TAG = {
	toggleWindow: 1
};

cc.Class({
	extends: cc.Component,

	properties: {
		_isShow: false
	},

	toggleWindow: function () {
		if (this._isShow)
			this.hideWindow();
		else this.showWindow();
	},

	showWindow: function () {
		this.node.opacity = 0;
		this.node.scale = 0.2;
		this.node.active = true;
		this._isShow = true;

		cc.Tween.stopAllByTag(TWEEN_TAG.toggleWindow);

		cc.tween(this.node)
			.tag(TWEEN_TAG.toggleWindow)
			.to(0.5, { scale: 1, opacity: 255 }, { easing: "quartInOut" })
			.start();
	},

	hideWindow: function () {
		this._isShow = false;

		cc.Tween.stopAllByTag(TWEEN_TAG.toggleWindow);

		cc.tween(this.node)
			.tag(TWEEN_TAG.toggleWindow)
			.to(0.5, { scale: 0.2, opacity: 0 }, { easing: "quartInOut" })
			.call(() => { this.node.active = false; })
			.start();
	},

	onClickButtonRestart: function (event) {
		cc.director.loadScene("GameScene");
	},

	onClickButtonBack: function (event) {
		cc.director.loadScene("GameCustomScene");
	}
});
