var Global = require("Global");

cc.Class({
	extends: cc.Component,

	properties: {
		upKey: {
			default: cc.macro.KEY.up,
			type: Global.KEY
		},
		downKey: {
			default: cc.macro.KEY.down,
			type: Global.KEY
		},
		leftKey: {
			default: cc.macro.KEY.left,
			type: Global.KEY
		},
		rightKey: {
			default: cc.macro.KEY.right,
			type: Global.KEY
		},
		speed: {
			default: 5,
			type: cc.Float
		},
		_accUp: false,
		_accDown: false,
		_accLeft: false,
		_accRight: false
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

	update: function (dt) {
		var directionX = 0;
		if (this._accLeft) {
			directionX += -1;
		}
		if (this._accRight) {
			directionX += 1;
		}

		var directionY = 0;
		if (this._accDown) {
			directionY += -1;
		}
		if (this._accUp) {
			directionY += 1;
		}

		var direction = cc.v2(directionX, directionY);
		direction = direction.normalize();

		this.node.setPosition(this.node.x + direction.x * this.speed * dt, this.node.y + direction.y * this.speed * dt);

		//limit player position inside world
		this.limitPlayerPosition();

		if (directionX != 0)
			this.node.scaleX = directionX;
	},

	limitPlayerPosition: function(){
		var globalPosition = Global.game.convertToGameWorldSpaceAR(this.node.parent.convertToWorldSpaceAR(this.node.position));

		if (globalPosition.x > Global.game.worldSize.width)
			this.node.x -= globalPosition.x - Global.game.worldSize.width;
		else if (globalPosition.x < 0)
			this.node.x -= globalPosition.x;

		if (globalPosition.y > Global.game.worldSize.height)
			this.node.y -= globalPosition.y - Global.game.worldSize.height;
		else if (globalPosition.y < 0)
			this.node.y -= globalPosition.y;
	},

	onKeyDown: function (event) {
		//set a flag when key pressed
		switch (event.keyCode) {
			case this.upKey:
				this._accUp = true;
				break;
			case this.downKey:
				this._accDown = true;
				break;
			case this.leftKey:
				this._accLeft = true;
				break;
			case this.rightKey:
				this._accRight = true;
		}
	},

	onKeyUp: function (event) {
		//unset a flag when key released
		switch (event.keyCode) {
			case this.upKey:
				this._accUp = false;
				break;
			case this.downKey:
				this._accDown = false;
				break;
			case this.leftKey:
				this._accLeft = false;
				break;
			case this.rightKey:
				this._accRight = false;
		}
	},
});
