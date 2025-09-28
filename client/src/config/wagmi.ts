import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { sepolia } from "viem/chains";

export const config = getDefaultConfig({
    appName: 'NoForma',
    projectId: 'YOUR_PROJECT_ID', // Get this from WalletConnect Cloud
    chains: [
        sepolia
    ],
    ssr: false,
});