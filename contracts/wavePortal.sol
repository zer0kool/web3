// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract WavePortal {
	uint256 totalWaves;
	uint256 private seed;

	event NewWave(address indexed from, uint256 timestamp, string message, string nickname);

	struct Wave {
		address waver; // The address of the user who waved.
		string message; // The message the user sent.
		uint256 timestamp; // The timestamp when the user waved.
		string nickname;
	}

	Wave[] waves;
	
	
	/*
  * This is an address => uint mapping, meaning I can associate an address with a number!
  * In this case, I'll be storing the address with the last time the user waved at us.
  */
  mapping(address => uint256) public lastWavedAt;

	constructor() payable {
		console.log("I AM SMART CONTRACT. POG.");
		
		/*
		* set initial seed
		*/
		seed = (block.timestamp + block.difficulty) % 100;
	}

	function wave(string memory _message, string memory _nickname) public {
		 /*
     * We need to make sure the current timestamp is at least 15-minutes bigger than the last timestamp we stored
     */
     require(
       lastWavedAt[msg.sender] + 15 minutes < block.timestamp,
       "Wait 15m"
    );
		
    /*
    * Update the current timestamp we have for the user
    */
    lastWavedAt[msg.sender] = block.timestamp;
		
		totalWaves += 1;
		console.log("%s has waved!", msg.sender);

		waves.push(Wave(msg.sender, _message, block.timestamp, _nickname));
		
		/*
    * Generate a new seed for the next user that sends a wave
    */
    seed = (block.difficulty + block.timestamp + seed) % 100;
		
		/*
    * Give a 50% chance that the user gets rewarded.
    */
    if (seed <= 50) {
        console.log("%s won!", msg.sender);
    		uint256 prizeAmount = 0.0001 ether;
				require(prizeAmount <= address(this).balance, "Trying to withdraw more money than the contract has.");
				(bool success, ) = (msg.sender).call {value: prizeAmount}("");
				require(success, "Failed to withdraw money from contract.");
    }
		
		/*
		* write to blockchain
		*/
		emit NewWave(msg.sender, block.timestamp, _message, _nickname);

	}

	function getAllWaves() public view returns(Wave[] memory) {
		return waves;
	}

	function getTotalWaves() public view returns(uint256) {
		console.log("We have %d total waves!", totalWaves);
		return totalWaves;
	}
}
