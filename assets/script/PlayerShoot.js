var Global = require("Global");

cc.Class({
	extends: cc.Component,

	properties: {
		projectilePrefab: {
			default: null,
			type: cc.Prefab
		},

		shootKey: {
			default: cc.macro.KEY.space,
			type: Global.KEY
		},

		shootAudio: {
			default: null,
			type: cc.AudioClip
		},

		coolDown: {
			default: 1,
			type: cc.Float
		},
		_currentCoolDown: 0,

		projectileContainer: {
			default: null,
			type: cc.Node
		},

		_isClickShoot: false
	},

	onLoad: function () {
		//initialize the keyboard input listening
		cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
		cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
	},

	onDestroy: function () {
		//cancel keyboard input monitoring
		cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
		cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
	},

	onKeyDown: function (event) {
		if (event.keyCode == this.shootKey)
			this._isClickShoot = true;
	},

	onKeyUp: function (event) {
		if (event.keyCode == this.shootKey)
			this._isClickShoot = false;
	},

	update: function (dt) {
		if (this._isClickShoot && this._currentCoolDown == 0) {
			this.shoot();
			this._currentCoolDown = this.coolDown;
		}
		else if (this._currentCoolDown < dt)
			this._currentCoolDown = 0;
		else this._currentCoolDown -= dt;
	},

	shoot: function () {
		var projectile = cc.instantiate(this.projectilePrefab);
		projectile.scaleX = this.node.scaleX;

		var projectileComponent = projectile.getComponent("Projectile");
		projectileComponent.directionX = this.node.scaleX;

		projectile.position = this.getProjectilePosition(projectile.width);

		this.projectileContainer.addChild(projectile);
		cc.audioEngine.playEffect(this.shootAudio, false);
	},

	getProjectilePosition: function (projectileWidth) {
		var projectilePosition = cc.v2(this.node.x + projectileWidth / 2 * this.node.scaleX, this.node.y);
		projectilePosition = this.node.parent.convertToWorldSpaceAR(projectilePosition);
		projectilePosition = this.projectileContainer.convertToNodeSpaceAR(projectilePosition);
		return projectilePosition;
	}
});
