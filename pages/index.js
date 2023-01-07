import { useEffect } from 'react'
import Head from 'next/head'
import { ethers } from 'ethers'
import { abi } from '../backend/contractsData/ERC20.json'
import { address } from '../backend/contractsData/ERC20-address.json'

export default function Home() {
  
  async function connect(){
    if( typeof window !== "undefined" && typeof window.ethereum !== "undefined" ){
        await window.ethereum.request({method: "eth_requestAccounts"});
        document.getElementById("connect-button").innerHTML = "Connected";
    } else {
      document.getElementById("connect-button").innerHTML = "Please install MetaMask to continue";
    }
  }
  
  async function mint(mintAmount){
    mintAmount = document.getElementById('mintAmount').value;
    console.log(`Minting...`);
    if( typeof window !== "undefined" && typeof window.ethereum !== "undefined" ){
        const provider = new ethers.providers.Web3Provider( window.ethereum );
        const signer = provider.getSigner();
        const contract = new ethers.Contract(address, abi, signer);
        try {
            const transactionResponse = await contract.mint(mintAmount);
            console.log(transactionResponse)
            await listenToTransactionMine(transactionResponse, provider);
            balance();
        } catch(error) {
            console.log(error);
        }
    }
  }
  
  async function burn(mintAmount){
    mintAmount = document.getElementById('mintAmount').value;
    console.log(`Burning...`);
    if( typeof window !== "undefined" && typeof window.ethereum !== "undefined" ){
        const provider = new ethers.providers.Web3Provider( window.ethereum );
        const signer = provider.getSigner();
        const contract = new ethers.Contract(address, abi, signer);
        try {
            const transactionResponse = await contract.burn(mintAmount);
            console.log(transactionResponse)
            await listenToTransactionMine(transactionResponse, provider);
            balance();
        } catch(error) {
            console.log(error);
        }
    }
  }
  
  async function balance(){
    if( typeof window !== "undefined" && typeof window.ethereum !== "undefined" ){
        const provider = new ethers.providers.Web3Provider( window.ethereum );
        const signer = provider.getSigner();
        const contract = new ethers.Contract(address, abi, signer);
        try {
            const balance = await contract.balanceOf(signer.getAddress());
            const eth = ethers.utils.formatEther(balance);
            document.getElementById('balance').innerHTML = eth;
        } catch(error) {
            console.log(error);
        }
    }
  }
  
  useEffect( () => {
    balance()
  }, [])
  
  function listenToTransactionMine(transactionResponse, provider){
    console.log(`Mining ${transactionResponse.hash}...`);
    return new Promise((resolve, reject) => {
        provider.once(transactionResponse.hash, (transactionReceipt) => {
            console.log(`Completed with ${transactionReceipt.confirmations} confirmation(s)`);
            resolve();
        });
    })
  }

  return (
    <>
      <Head>
        <title>Minting dApp</title>
        <meta name="description" content="Minting dApp" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>Hello! Start minting MTC Coins now!</h1>
      
        <button id="connect-button" onClick={connect}>Connect with MetaMask</button>
        <h2>Mint here</h2>
        <label htmlFor="mint">Mint Amount</label>
        <input id="mintAmount" name="mint" placeholder="1"/>
        <button id="mint-button" onClick={mint}>Mint</button>
        <button id="burn-button" onClick={burn}>Burn</button>
        <div className="balance-wrapper">
            <p>
                Balance: <span id="balance">0</span> MTC Coins
            </p>
        </div>
        <br/><br/>
        <h2>Manual Update</h2>
        <button id="balance-button" onClick={balance}>Update Balance</button>
      </main>
    </>
  )
}
