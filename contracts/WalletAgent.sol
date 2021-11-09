// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract WalletReport {
    uint256 totalReports;

    event NewReport(address indexed from, uint256 timestamp, string reportedAddress);

    struct Report {
        address agent; // The address of the user who reported the wallet.
        string reportedAddress; // The bad address the user sent.
        uint256 timestamp; // The timestamp when the user reported the wallet.
    }

    Report[] reports;

    constructor() {
        console.log("I AM SMART CONTRACT. POG.");
    }

    function report(string memory _reportedAddress) public {
        totalReports += 1;
        console.log("%s has reported!", msg.sender);

        reports.push(Report(msg.sender, _reportedAddress, block.timestamp));

        emit NewReport(msg.sender, block.timestamp, _reportedAddress);
    }

    function getAllReports() public view returns (Report[] memory) {
        return reports;
    }

    function getTotalReports() public view returns (uint256) {
        // Optional: Add this line if you want to see the contract print the value!
        // We'll also print it over in run.js as well.
        console.log("We have %d reported wallets!", totalReports);
        return totalReports;
    }
}