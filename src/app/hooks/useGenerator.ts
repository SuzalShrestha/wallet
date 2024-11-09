import { useState } from 'react';
import { derivePath } from 'ed25519-hd-key';
import nacl from 'tweetnacl';
import { Keypair } from '@solana/web3.js';
import bs58 from 'bs58';
import { generateMnemonic, mnemonicToSeedSync } from 'bip39';
type TWallet = { publicKey: string; privateKey: string };
export function useGenerator() {
    const [wallets, setWallets] = useState<TWallet[]>([]);
    const [onClickGenerate, setonClickGenerate] = useState<boolean>(false);
    const [mnemonic, setMnemonic] = useState<string>('');
    // const [path, setPath] = useState("m/44'/501'/0'/0'"); //use this variable for other coinss
    const [index, setIndex] = useState(-1);
    const increasePath = () => {
        const paths = `m/44'/501'/${index + 1}'/0'`;
        setIndex((prev) => prev + 1);
        return paths;
    };
    const getMnemonic = () => {
        if (mnemonic !== '') {
            return mnemonic;
        }
        const mnemonics = generateMnemonic();
        setMnemonic(mnemonics);
        return mnemonics;
    };
    const clearWallets = () => {
        setWallets([]);
        setIndex(-1);
    };
    const getKeys = () => {
        setonClickGenerate(true);
        const mnemonics = getMnemonic();
        const seed = mnemonicToSeedSync(mnemonics);
        const newPath = increasePath();
        const derivedSeed = derivePath(newPath, seed.toString('hex')).key;
        const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
        const publicKey = Keypair.fromSecretKey(secret).publicKey.toBase58();
        return {
            publicKey,
            privateKey: bs58.encode(secret),
        };
    };
    const generateWallet = () => {
        const { publicKey, privateKey } = getKeys();
        setWallets((prev) => [...prev, { publicKey, privateKey }]);
        return { publicKey, privateKey };
    };
    return {
        wallets,
        mnemonic,
        onClickGenerate,
        setMnemonic,
        generateWallet,
        clearWallets,
    };
}
