import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { App } from "./App";
import reportWebVitals from "./reportWebVitals";
import * as serviceWorker from "./serviceWorker";

import { Config, DAppProvider, DEFAULT_SUPPORTED_CHAINS } from "@usedapp/core";

import { Chain } from "@usedapp/core";

export const TutorialChain: Chain = {
  chainId: 97,
  chainName: "BSC Testnet",
  isTestChain: true,
  isLocalChain: false,
  multicallAddress: "0x6e5BB1a5Ad6F68A8D7D6A5e47750eC15773d6042",
  getExplorerAddressLink: (address: string) =>
    `https://testnet.bscscan.com/address/${address}`,
  getExplorerTransactionLink: (transactionHash: string) =>
    `https://testnet.bscscan.com/tx/${transactionHash}`,
  rpcUrl: "https://data-seed-prebsc-1-s1.binance.org:8545",
  blockExplorerUrl: "https://testnet.bscscan.com",
  nativeCurrency: {
    name: "BNB",
    symbol: "BNB",
    decimals: 18,
  },
};
const config: Config = {
  readOnlyChainId: TutorialChain.chainId,
  readOnlyUrls: {
    [TutorialChain.chainId]: "https://data-seed-prebsc-1-s1.binance.org:8545",
  },
  networks: [...DEFAULT_SUPPORTED_CHAINS, TutorialChain],
};

const container = document.getElementById("root");
if (!container) throw new Error("Failed to find the root element");
const root = ReactDOM.createRoot(container);

root.render(
  <React.StrictMode>
    <DAppProvider config={config}>
      <App />
    </DAppProvider>
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
