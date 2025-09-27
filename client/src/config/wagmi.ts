import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { hederaTestnet } from "viem/chains";

export const config = getDefaultConfig({
    appName: 'NoForma',
    projectId: 'YOUR_PROJECT_ID', // Get this from WalletConnect Cloud
    chains: [
        hederaTestnet
    ],
    ssr: false,
});