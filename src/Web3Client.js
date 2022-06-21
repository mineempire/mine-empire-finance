import Web3 from "web3";
import { dailyEnergyAddress, energyAddress } from "./contracts/Addresses";
import { dailyEnergyABI } from "./contracts/DailyEnergy";
import { energyABI } from "./contracts/Energy";

export const connect = async () => {
  await window.ethereum
    .request({ method: "eth_requestAccounts" })
    .then((accounts) => {
      console.log(accounts);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const isConnected = async () => {
  let ret;
  await window.ethereum
    .request({ method: "eth_accounts" })
    .then((accounts) => {
      if (accounts && accounts.length > 0) {
        ret = true;
      } else {
        ret = false;
      }
    })
    .catch((err) => {
      console.log(err);
    });
  return ret;
};

export const getDailyEnergyContract = () => {
  var web3 = new Web3(window.ethereum);
  const dailyEnergy = new web3.eth.Contract(dailyEnergyABI, dailyEnergyAddress);
  return dailyEnergy;
};

export const getEnergyContract = () => {
  var web3 = new Web3(window.ethereum);
  const dailyEnergy = new web3.eth.Contract(energyABI, energyAddress);
  return dailyEnergy;
};
