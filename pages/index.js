import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import count_abi from '../artifacts/contracts/Count.sol/Count.json';

function App() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [countContract, setCountContract] = useState(undefined);
  const [count, setCount] = useState(undefined);

  const contractAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3"; // Update with your contract address
  const countABI = count_abi.abi;

  const getWallet = async () => {
    if (window.ethereum) {
      setEthWallet(window.ethereum);
    }

    if (ethWallet) {
      const accounts = await ethWallet.request({ method: "eth_accounts" });
      handleAccount(accounts);
    }
  };

  const handleAccount = (accounts) => {
    if (accounts.length > 0) {
      setAccount(accounts[0]);
    } else {
      console.log("No account found");
    }
  };

  const connectAccount = async () => {
    if (!ethWallet) {
      alert('MetaMask wallet is required to connect');
      return;
    }

    const accounts = await ethWallet.request({ method: 'eth_requestAccounts' });
    handleAccount(accounts);
    getCountContract();
  };

  const getCountContract = () => {
    const provider = new ethers.providers.Web3Provider(ethWallet);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, countABI, signer);
    setCountContract(contract);
  };

  const getCount = async () => {
    if (countContract) {
      setCount((await countContract.count()).toNumber());
    }
  };

  const increaseCount = async () => {
    if (countContract) {
      const tx = await countContract.increaseCount();
      await tx.wait();
      getCount();
    }
  };

  const decreaseCount = async () => {
    if (countContract) {
      try {
        const tx = await countContract.decreaseCount();
        await tx.wait();
        getCount();
      } catch (error) {
        alert("Count Cannot Be Less Than 0");
      }
    }
  };

  const resetCount = async () => {
    if (countContract) {
      const tx = await countContract.resetCount();
      await tx.wait();
      getCount();
    }
  };

  const getBalance = async () => {
    if (countContract) {
      const balance = await countContract.getBalance();
      alert(`Contract Balance: ${ethers.utils.formatEther(balance)} ETH`);
    }
  };

  const Home = () => {
    if (!ethWallet) {
      return <h1>Please install MetaMask!</h1>;
    }

    if (!account) {
      return <button onClick={connectAccount}>Please connect your account!</button>;
    }

    if (count === undefined) {
      getCount();
    }

    return (
      <div>
        <p>Address: {account}</p>
        <br />
        <h1>Count: {count}</h1>
        <br />
        <button onClick={increaseCount}>Increase Count</button>
        <button onClick={decreaseCount}>Decrease Count</button>
        <button onClick={resetCount}>Reset Count</button>
        <button onClick={getBalance}>Get Contract Balance</button>
      </div>
    );
  };

  useEffect(() => {
    getWallet();
  }, []);

  return (
    <div className='container'>
      <style jsx>{`
        .container {
          height: 90vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background-color: #f0f2f5;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          margin-top: 20px;
        }

        .header {
          font-size: 2.5rem;
          margin-bottom: 30px;
          color: #333;
        }

        .account {
          font-size: 1.2rem;
          margin-bottom: 20px;
          color: #555;
        }

        .count-display {
          font-size: 3rem;
          margin-bottom: 30px;
          color: #007bff;
          text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
        }

        .buttons {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }

        .button {
          padding: 10px 20px;
          font-size: 1rem;
          color: #fff;
          background-color: #007bff;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        .button:hover {
          background-color: #0056b3;
        }

        .button:disabled {
          background-color: #ccc;
          cursor: not-allowed;
        }

        .connect-button {
          padding: 10px 20px;
          font-size: 1rem;
          color: #fff;
          background-color: #28a745;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        .connect-button:hover {
          background-color: #218838;
        }
      `}</style>
      <h1 className='header'>Welcome to THE COUNTER!</h1>
      <Home />
    </div>
  );
}

export default App;
