import { useEffect, useState } from 'react';
import { derivePath } from 'ed25519-hd-key';
import nacl from 'tweetnacl';
import { Keypair } from '@solana/web3.js';
import bs58 from 'bs58';
import { generateMnemonic, mnemonicToSeedSync } from 'bip39';
export function useGenerator() {
    const [wallets, setWallets] = useState([]);
    const [index, setIndex] = useState(0);
    const [mnemonic, setMnemonic] = useState('');
    const [path, setPath] = useState("m/44'/501'/0'/0'");
    const getMnemonic = () => {
        const mnemonic = generateMnemonic();
        return mnemonic;
    };
    const getKeys = () => {
        const mnemonic = getMnemonic();
        const seed = mnemonicToSeedSync(mnemonic);
        setMnemonic(mnemonic);
        const derivedPath = path.replace("/501'/0", `/501'/${index}`);
        setPath(derivedPath);
        const derivedSeed = derivePath(derivedPath, seed.toString('hex')).key;
        const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
        const publicKey = Keypair.fromSecretKey(secret).publicKey.toBase58();
        return {
            publicKey,
            privateKey: bs58.encode(secret),
        };
    };
    const generateWallet = () => {
        const { publicKey, privateKey } = getKeys();
        setIndex((prev) => prev + 1);
        setWallets((prev) => [...prev, { publicKey, privateKey }]);
        return { publicKey, privateKey };
    };
    useEffect(() => {
        generateWallet();
    }, []);
    return { wallets, mnemonic, path, generateWallet };
}
