'use client';
import { Button } from './ui/button';
import { Input } from './ui/input';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { generateMnemonic, mnemonicToSeedSync } from 'bip39';
import { derivePath } from 'ed25519-hd-key';
import nacl from 'tweetnacl';
import { Keypair } from '@solana/web3.js';
import bs58 from 'bs58';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import { toast } from 'sonner';
import { Copy, Eye, EyeOff } from 'lucide-react';
import { Wallet } from './wallet';
export default function KeyGenerator() {
    const [wallets, setWallets] = useState<any[]>([]);
    const [accountIndex, setAccountIndex] = useState<number>(0);
    const paths = [
        {
            label: 'Solana',
            path: `m/44'/501'/0'/0'`,
        },
    ];
    const [mnemonic, setMnemonic] = useState<string>('');
    const [path, setPath] = useState<string>('');
    const [isGenerated, setIsGenerated] = useState<boolean>(false);
    const getMnemonic = () => {
        const mnemonic = generateMnemonic();
        setMnemonic(mnemonic);
    };
    const copyToClipboard = () => {
        navigator.clipboard.writeText(mnemonic);
        toast.success('Copied to clipboard');
    };
    const getKeys = () => {
        const seed = mnemonicToSeedSync(mnemonic);
        const derivedSeed = derivePath(paths[0].path, seed.toString('hex')).key;
        const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
        const publicKey = Keypair.fromSecretKey(secret).publicKey.toBase58();
        const wallet = {
            publicKey,
            privateKey: bs58.encode(secret),
        };
        setWallets((prev) => [...prev, wallet]);
    };
    useEffect(() => {
        getMnemonic();
        getKeys();
        setPath(paths[0].path);
    }, [isGenerated]);
    return (
        <div>
            {!isGenerated && (
                <motion.div
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className='flex flex-col gap-4 m-4 py-10'
                >
                    <div className='flex flex-col gap-2 my-5 '>
                        <h1 className='text-5xl font-bold'>
                            Secret Recovery Phrase
                        </h1>
                        <span className='text-lg font-bold text-gray-300'>
                            Save these words in a secure location
                        </span>
                    </div>
                    <div className='flex gap-5'>
                        <Input
                            className='py-6 px-5 text-md'
                            type='password'
                            placeholder='Enter your secret phrase (or leave blank to generate)'
                        />
                        <Button
                            className='py-6 px-10'
                            onClick={() => setIsGenerated((prev) => !prev)}
                        >
                            Generate Wallet
                        </Button>
                    </div>
                </motion.div>
            )}
            {isGenerated && (
                <>
                    <motion.div
                        initial={{ opacity: 0, y: 100 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className='flex flex-col gap-4 m-4 py-10'
                    >
                        <div className='flex flex-col gap-2 my-5 '>
                            <Accordion type='single' collapsible>
                                <AccordionItem value='item-1'>
                                    <AccordionTrigger className='hover:no-underline'>
                                        <h1 className='text-5xl font-bold'>
                                            Your secret
                                        </h1>
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        <span
                                            className=' grid grid-cols-4'
                                            onClick={() => copyToClipboard()}
                                        >
                                            {mnemonic
                                                .split(' ')
                                                .map((word, i) => (
                                                    <Button
                                                        variant={'ghost'}
                                                        key={i}
                                                        className='p-2 border-1 text-xl font-bold text-gray-300 flex justify-start items-center m-2 p-7 gap-3 rounded-lg'
                                                    >
                                                        {word}
                                                    </Button>
                                                ))}
                                            <div className='flex text-xl gap-5 m-2'>
                                                <Copy /> Click anywhere to copy
                                            </div>
                                        </span>
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </div>
                    </motion.div>
                    <motion.div>
                        <div className='flex justify-between p-4'>
                            <span className='text-5xl font-bold'>
                                Solana Wallet
                            </span>
                            <div className='flex gap-3'>
                                <Button className='py-6 px-4 font-semibold'>
                                    Add Wallet
                                </Button>
                                <Button
                                    className='py-6 px-4 font-semibold'
                                    variant={'destructive'}
                                >
                                    Clear Wallets
                                </Button>
                            </div>
                        </div>
                        <Wallet />
                        <Wallet />
                    </motion.div>
                </>
            )}
        </div>
    );
}
