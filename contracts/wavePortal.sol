// SPDX-License-Identifier: UNLICENSED

pragma solidity ^ 0.8 .0;

import "hardhat/console.sol";

contract WavePortal {
	uint256 totalWaves;

	event NewWave(address indexed from, uint256 timestamp, string message);

	struct Wave {
		address waver; // The address of the user who waved.
		string message; // The message the user sent.
		uint256 timestamp; // The timestamp when the user waved.
	}

	Wave[] waves;

	constructor() {
		console.log("I AM SMART CONTRACT. POG.");
	}

	function wave(string memory _message) public {
		totalWaves += 1;
		console.log("%s has waved!", msg.sender);

		waves.push(Wave(msg.sender, _message, block.timestamp));

		emit NewWave(msg.sender, block.timestamp, _message);

		uint256 prizeAmount = 0.0001 ether;
		require(prizeAmount <= address(this).balance, "Trying to withdraw more money than the contract has.");
		(bool success, ) = (msg.sender).call {value: prizeAmount}("");
		require(success, "Failed to withdraw money from contract.");
	}

	function getAllWaves() public view returns(Wave[] memory) {
		return waves;
	}

	function getTotalWaves() public view returns(uint256) {
		// Optional: Add this line if you want to see the contract print the value!
		// We'll also print it over in run.js as well.
		console.log("We have %d total waves!", totalWaves);
		return totalWaves;
	}
}
