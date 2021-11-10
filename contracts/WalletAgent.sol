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
		string nickname; // The nickname for the agent 
		address agent; // The address of the user who reported the wallet.
		string reportedAddress; // The bad address the user sent.
	}

	// All the reports 
	Report[] badWallets;
	

	// Mapping from address to track reports submitted by that address.
	mapping(address => Report[]) reportsByAddress;

	// Number of validations each report has.
	mapping(uint256 => uint256) validations;

	// Mapping to check whether a particular address has validated a report
	mapping(address => mapping(uint256 => bool)) validationsForAddress;

	constructor() {console.log("Wallet Agent initialized");}

	
	function addReport(string memory _reportedAddress, string memory _nickname) public {
		uint256 _id = badWallets.length;
		
		totalReports += 1;
		console.log("%s has reported!", msg.sender);	
		
		Report memory _newReporte = Report(_id, block.timestamp, _nickname, msg.sender, _reportedAddress);
		badWallets.push(_newReporte);
		reportsByAddress[msg.sender].push(_newReporte);
		
		emit NewReport(_id, block.timestamp, _nickname, msg.sender, _reportedAddress);
	}

	// get all reports 
	function getAllReports() public view returns(Report[] memory) {
		return badWallets;
	}

	// get the total number of reports 
	function getTotalReports() public view returns(uint256) {
		console.log("We have %d reported wallets!", totalReports);
		return totalReports;
	}

	// get my reports 
	function getMyReports() public view returns (Report[] memory) {
    return getReportsByAddress(msg.sender);
  }
	
	// get reports by address
	function getReportsByAddress(address _agent)
	public
	view
	returns(Report[] memory) {
		console.log("Getting reports submitted by address %s.", _agent);
		return reportsByAddress[_agent];
	}
	
	// validates the report for bad wallet
	function validateReport(uint256 _confirmation) public {
		require(
			!validationsForAddress[msg.sender][_confirmation],
			"Can't validate the report you've already confirmed"
		);

		validations[_confirmation] += 1;
		validationsForAddress[msg.sender][_confirmation] = true;

		emit ValidateAddr(msg.sender, _confirmation, block.timestamp);
	}
	
}
