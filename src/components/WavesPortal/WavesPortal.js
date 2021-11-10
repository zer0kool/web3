
import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import './WavesPortal.css';
import M from "materialize-css";

//contract
import abi from './utils/WavePortal.json';

export default function WavesPortal() {

	const contractAddress = '0xe8dF7C21fB5E74e605178c39998c1Bc92D5abe66';
	const contractABI = abi.abi;

	/*
  * Just a state variable we use to store our user's public wallet.
  */
  const [currentAccount, setCurrentAccount] = useState("");

	const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        console.log("Make sure you have metamask!");
        return;
      } else {
        console.log("We have the ethereum object", ethereum);
      }

      /*
      * Check if we're authorized to access the user's wallet
      */
      const accounts = await ethereum.request({ method: 'eth_accounts' });

      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found an authorized account:", account);
        setCurrentAccount(account);
				getAllWaves();
      } else {
        console.log("No authorized account found")
      }
    } catch (error) {
      console.log(error);
    }
  }


	/**
  * Implement your connectWallet method here
  */
  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

			// get rid of .then
      const accounts = await ethereum.request({ method: "eth_requestAccounts" });


      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error)
    }
  }


	/*
  * This runs our function when the page loads.
  */
  useEffect(() => {
    checkIfWalletIsConnected();
  }, [])

  const wave = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer);

        let count = await wavePortalContract.getTotalWaves();
        console.log("Retrieved total wave count...", count.toNumber());

				let message = document.querySelector('#message').value;
				if(message.length === 0){
					M.toast({html: 'A message is needed to complete the wave!', classes: 'red'});
					return;
				}
				console.log(message);

        const waveTxn = await wavePortalContract.wave(message);
        console.log("Mining...", waveTxn.hash);

        await waveTxn.wait();
        console.log("Mined -- ", waveTxn.hash);

        count = await wavePortalContract.getTotalWaves();
        console.log("Retrieved total wave count...", count.toNumber());
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error)
    }
  }


  /*
   * All state property to store all waves
   */
  const [allWaves, setAllWaves] = useState([]);

  /*
   * Create a method that gets all waves from your contract
   */
  const getAllWaves = async () => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer);

        /*
         * Call the getAllWaves method from your Smart Contract
         */
        const waves = await wavePortalContract.getAllWaves();


        /*
         * We only need address, timestamp, and message in our UI so let's
         * pick those out
         */
        let wavesCleaned = [];
        waves.forEach(wave => {
          wavesCleaned.push({
            address: wave.waver,
            timestamp: new Date(wave.timestamp * 1000).toGMTString(),
            message: wave.message
          });
        });

        /*
         * Store our data in React State
         */
        setAllWaves(wavesCleaned);
      } else {
        console.log("Ethereum object doesn't exist!")
      }
    } catch (error) {
      console.log(error);
    }
  }



  return (
    <div className="mainContainer">

      <div className="container">
        <div className="header">
        👋 Hey there!
        </div>

        <div className="bio">
        I am Alejandro and my idea is to be able to give the community access to report portfolios that harm the ethereum ecosystem. If you like my idea for the builspace hackathon. Connect your Ethereum wallet and wave at me!
        </div>

				<input id="message"></input>

				{currentAccount && (
					<button className="waveButton" onClick={wave}>
						Wave at Me
					</button>
				)}

        {!currentAccount && (
          <button className="waveButton" onClick={connectWallet}>
            Connect Wallet
          </button>
        )}
      </div>


			<div id="data" class="container">
					<h5>Recent Waves</h5>
					<table class="striped highlight responsive-table">
						<thead>
							<tr>
									<th>Date</th>
									<th>Message</th>
									<th>Address</th>
							</tr>
						</thead>
						<tbody>
						{allWaves.map((wave, index) => {
						 return(
							<tr key={index}>
								<td class="truncate">{wave.timestamp.toString()}</td>
								<td>{wave.message}</td>
								<td class="truncate">{wave.address}</td>
							</tr>)
						})}
						</tbody>
					</table>
				</div>
    </div>
  );
}
