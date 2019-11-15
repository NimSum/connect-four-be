const { expect } = require("chai");
const { newPlayer } = require("../mockData");
const { createNewPlayer, getPlayer } = require("../../dist/src/db");
const mongoose = require("mongoose");

describe("mongodb", () => {
	it("responds with new player", async () => {
		const player = await createNewPlayer(newPlayer);
		expect(player.player_name).to.equal(newPlayer.player_name);
	});

	it("creates player in players db", async () => {
		const response = await getPlayer(true, newPlayer.email);
		expect(response.player_name).to.equal(newPlayer.player_name);
	});
});
