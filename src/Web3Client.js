import Web3 from "web3";
import {
  dailyEnergyAddress,
  energyAddress,
  mineEmpireDrillAddress,
} from "./contracts/Addresses";
import { dailyEnergyABI } from "./contracts/DailyEnergy";
import { energyABI } from "./contracts/Energy";
import { mineEmpireDrillABI } from "./contracts/MineEmpireDrill";

export const connectedAddress = async () => {
  var web3 = new Web3(window.ethereum);
  var acc = web3.eth.accounts;
  console.log(acc);
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

export const getSelectedAddress = async () => {
  let selectedAddress = "";
  let addr = window.ethereum.selectedAddress;
  let i = 0;
  while (selectedAddress == "" && i < 10) {
    addr = window.ethereum.selectedAddress;
    if (addr != null) {
      selectedAddress = addr;
    }
    i = i + 1;
    await sleep(100);
  }
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

export const getMineEmpireDrillContract = () => {
  var web3 = new Web3(window.ethereum);
  const mineEmpireDrillContract = new web3.eth.Contract(
    mineEmpireDrillABI,
    mineEmpireDrillAddress
  );
  return mineEmpireDrillContract;
};

export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
