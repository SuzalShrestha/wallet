import { useEffect, useState } from 'react';
import { derivePath } from 'ed25519-hd-key';
import nacl from 'tweetnacl';
import { Keypair } from '@solana/web3.js';
import bs58 from 'bs58';
import { toast } from 'sonner';
import { generateMnemonic, mnemonicToSeedSync, validateMnemonic } from 'bip39';
export function useGenerator() {
    const [wallets, setWallets] = useState([]);
    const [onClickGenerate, setonClickGenerate] = useState<boolean>(false);
    const [index, setIndex] = useState(0);
    const [mnemonic, setMnemonic] = useState<string | null>(null);
    const [path, setPath] = useState("m/44'/501'/0'/0'");
    const getMnemonic = () => {
        if (mnemonic) {
            return mnemonic;
        }
        const mnemonics = generateMnemonic();
        setMnemonic(mnemonics);
        return mnemonics;
    };
    const clickGenerate = () => {
        if (mnemonic) {
            if (validateMnemonic(mnemonic)) {
                setonClickGenerate(true);
            } else {
                toast.error('Invalid mnemonic');
            }
        } else {
            setonClickGenerate(true);
        }
    };
    const getKeys = () => {
        const mnemonic = getMnemonic();
        const seed = mnemonicToSeedSync(mnemonic);
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
    }, [onClickGenerate]);
    return {
        wallets,
        mnemonic,
        onClickGenerate,
        clickGenerate,
        setMnemonic,
    };
}
