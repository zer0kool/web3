// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract WalletReport {
    uint256 totalReports;

    event NewReport(
			uint256 id,
			uint256 timestamp,
			string nickname,
			address indexed from, 
			string reportedAddress
		);
	
	
    //Event emitted when an address validates a report
    event ValidateAddr(address indexed agent, uint256 id, uint256 timestamp);


    struct Report {
				uint256 id;
			  uint256 timestamp; // The timestamp when the user reported the wallet.
        address agent; // The address of the user who reported the wallet.
				string nickname; // The nickname for the agent 
        string reportedAddress; // The bad address the user sent.
    }

		// All the reports 
    Report[] badWallets;

	  // Mapping from address to track reports submitted by that address.
    mapping(address => Report[]) reportsByAddress;

    // Number of validations each report has.
    mapping(uint256 => uint256) validations;

    // Mapping to check whether a particular address has liked a particular track.
    mapping(address => mapping(uint256 => bool)) validationsForAddress;
	
	
	
    constructor() {
        console.log("Wallet Agent initialized");
    }

	
	
	
    function report(string memory _reportedAddress) public {
				uint256 _id = badWallets.length;
        
				totalReports += 1;
        console.log("%s has reported!", msg.sender);
			
			  Report memory _newReport = Report(
						_id,
					  block.timestamp,
            msg.sender,
            _reportedAddress
        );

        badWallets.push(_newReport);
				reportsByAddress[msg.sender].push(_newReport);

        emit NewReport(_id, block.timestamp, msg.sender, _reportedAddress);
    }

	
	
    function getAllReports() public view returns (Report[] memory) {
        return badWallets;
    }
	
	

    function getTotalReports() public view returns (uint256) {
        // Optional: Add this line if you want to see the contract print the value!
        // We'll also print it over in run.js as well.
        console.log("We have %d reported wallets!", totalReports);
        return totalReports;
    }
	
	
	
}