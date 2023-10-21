import {
  createWeb3Modal,
  defaultWagmiConfig,
  useWeb3Modal,
  useWeb3ModalEvents,
  useWeb3ModalState,
  useWeb3ModalTheme,
} from "@web3modal/wagmi/react";
import { useState } from "react";
import { WagmiConfig } from "wagmi";
import { arbitrum, mainnet } from "wagmi/chains";

const projectId = "0cfb1fbdb2f8bce445b0c7668326aa70";
if (!projectId) {
  throw new Error("VITE_PROJECT_ID is not set");
}

// 2. Create wagmiConfig
const chains = [mainnet, arbitrum];
const wagmiConfig = defaultWagmiConfig({
  chains,
  projectId,
  metadata: {
    name: "Web3Modal React Example",
  },
});

// 3. Create modal
createWeb3Modal({
  wagmiConfig,
  projectId,
  chains,
  themeMode: "light",
  themeVariables: {
    "--w3m-color-mix": "#00BB7F",
    "--w3m-color-mix-strength": 20,
  },
});

export default function App() {
  const [btnState, setBtnState] = useState(false);
  // 4. Use modal hook
  const modal = useWeb3Modal();
  const { themeMode, setThemeMode } = useWeb3ModalTheme();

  return (
    <div className={`${btnState ? 'bg-gradient-to-bl from-violet-500 to-black' : 'bg-gray-400' } `}>
      <button
        onClick={() => {
          setBtnState(!btnState);
          setThemeMode(themeMode === "dark" ? "light" : "dark");
        }}
        className=" px-3 m-2 text-white transition duration-300 delay-150"
      >
        {btnState ? (
          // bulb
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
            />
          </svg>
        ) : (
          // moon
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
            />
          </svg>
        )}
      </button>
      <div className="p-2 flex flex-col min-h-screen items-center justify-center ">
        <WagmiConfig config={wagmiConfig}>
          <div className="bg:blur backdrop-blur bg-white/20 p-12 rounded-lg shadow-lg">
          <div className="flex gap-2 mt-3">
            <w3m-connect-button label="connect" size="md"/>
            <w3m-account-button />
          </div>
          <div className="flex gap-2 mt-3">
            <w3m-button label="connect" size="md"/>
            <w3m-network-button />
          </div>

          <div className="grid grid-cols-2  mt-3 gap-3">
            <button onClick={() => modal.open()} className="btn px-5 py-2">
              Connect 
            </button>
            <button
              onClick={() => modal.open({ view: "Networks" })}
              className="btn px-5 py-2 "
            >
              Network
            </button>
          </div>
          </div>
        </WagmiConfig>
      </div>
    </div>
  );
}
