import React, { Component, useEffect, useState  } from "react";
import M from "materialize-css";
import "./MetaMask.css";


export default function MetaMask() {


//	debugger;
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
//			debugger;
      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found an authorized account:", account);
        setCurrentAccount(account);
//				getAllWaves();
      } else {
				var elem = document.querySelector('#meta');
    		var instance = M.Modal.getInstance(elem)
    		instance.open();
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
			window.location.reload(true);
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

	return(
  <div id="meta" class="modal modal-fixed-footer open">
    <div class="modal-content">
      <img src="https://d15shllkswkct0.cloudfront.net/wp-content/blogs.dir/1/files/2020/01/metamask-ethereum-online-wallet-logo-750x469.png"/>
		<h4>Welcome to the Web3!</h4>
      <p>The decentralized web awaits, to continue please connet your wallet with MetaMask. If you dont have a wallet you can dowload MetaMask and create one.</p>
    </div>
    <div class="modal-footer">
      <a href="https://metamask.io/download.html" class="modal-close waves-effect waves-green btn-flat">Download MetaMask</a>
      <a href="#!" onClick={connectWallet} class="waves-effect waves-green btn-flat">Connect Wallet</a>
    </div>
  </div>
	);

}
