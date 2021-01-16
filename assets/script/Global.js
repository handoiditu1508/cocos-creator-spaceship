module.exports = {
	game: null,
	lobby: null,
	gameCustom: null,
	state: 0,

	gameTime: null,
	playerSpeed: null,
	isMobileEnemy: null,

	KEY: cc.Enum(cc.macro.KEY),
	DIRECTION_X: cc.Enum({
		left: -1,
		right: 1
	}),
	GROUP: {
		default: 0,
		player: 1,
		enemy: 2,
		projectile: 3
	},
	GAME_STATE:{
		notStart: 0,
		lobby: 1,
		customGame: 2,
		playing: 3,
		lost: 4,
		won: 5
	}
};