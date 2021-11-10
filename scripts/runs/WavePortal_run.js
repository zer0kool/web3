const main = async () => {
	const waveContractFactory = await hre.ethers.getContractFactory('WavePortal');

	// The ammount of funding for the contract
	const waveContract = await waveContractFactory.deploy({
		value: hre.ethers.utils.parseEther('0.1'),
	});

	// Test and compile
	await waveContract.deployed();
	console.log('Contract address:', waveContract.address);

	// Get Contract balance
	let contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
	console.log('Contract balance:', hre.ethers.utils.formatEther(contractBalance));

	let waveCount;
	waveCount = await waveContract.getTotalWaves();
	console.log(waveCount.toNumber());

	let waveTxn = await waveContract.wave('A message!');
	await waveTxn.wait(); // Wait for the transaction to be mined

	const [_, randomPerson] = await hre.ethers.getSigners();
	waveTxn = await waveContract.connect(randomPerson).wave('Another message!');
	await waveTxn.wait(); // Wait for the transaction to be mined

	// Get Contract balance after two waves
	let contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
	console.log('Contract balance:', hre.ethers.utils.formatEther(contractBalance));

	let allWaves = await waveContract.getAllWaves();
	console.log(allWaves);

};

const runMain = async () => {
	try {
		await main();
		process.exit(0);
	} catch (error) {
		console.log(error);
		process.exit(1);
	}
};
runMain();
