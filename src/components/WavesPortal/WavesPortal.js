
import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import './WavesPortal.css';
import M from "materialize-css";
import MetaMask from "../MetaMask/MetaMask";
import abi from './utils/WavePortal.json';
import BuildWave from './modules/Wave';
import { createAvatar } from '@dicebear/avatars';
import * as style from '@dicebear/avatars-bottts-sprites';

export default function WavesPortal() {

	const contractAddress = '0xbbb56565084f95c168885FB09725C5375b1511Fe';
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
					var agent = createAvatar(style, {seed: wave.waver,});
          wavesCleaned.push({
            address: wave.waver,
            timestamp: new Date(wave.timestamp * 1000).toGMTString(),
            message: wave.message,
						name: wave.nickname,
						avatar: agent
          });
        });

				console.log(wavesCleaned)

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
			<MetaMask/>
			<BuildWave/>
      <div className="container">
        <div className="header">
        👋 Hey there!
        </div>
        <div className="bio">
        I am Alejandro and my idea is to be able to give the community access to report portfolios that harm the ethereum ecosystem. If you like my idea for the builspace hackathon. Connect your Ethereum wallet and wave at me!
        </div>

				{currentAccount && (
					<button className="tip btn-small modal-trigger" href="#waveForm">
						Wave at Me
					</button>
				)}

        {!currentAccount && (
          <button className="waveButton" onClick={connectWallet}>
            Connect Wallet
          </button>
        )}
      </div>

			<div id="waves">

						{allWaves.map((wave, index) => {
						 return(


							   <div key={index}  class="card">
									<div class="card-image waves-effect waves-block waves-light">
							     <picture class="activator" dangerouslySetInnerHTML={{ __html:wave.avatar }}/>
									</div>
									<div class="card-content">
										<span class="card-title activator grey-text text-darken-4">{wave.name}<i class="material-icons right">more_vert</i></span>
										<p><a className="AgentID" href="#">{wave.address}</a></p>
									</div>
									<div class="card-reveal">
										<span class="card-title grey-white">Message<i class="material-icons right">close</i></span>
										<p className="message">{wave.message}</p>
							 			<span className="date">{wave.timestamp.toString()} </span>
									</div>
								</div>
						)
						})}

				</div>
    </div>
  );
}
