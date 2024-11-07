'use client';
import { Button } from './ui/button';
import { Input } from './ui/input';
import React from 'react';
import { motion } from 'framer-motion';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import { toast } from 'sonner';
import { Copy } from 'lucide-react';
import { Wallet } from './wallet';
import { useGenerator } from '@/app/hooks/useGenerator';
export default function KeyGenerator() {
    const { wallets, mnemonic, onClickGenerate, clickGenerate, setMnemonic } =
        useGenerator();
    const copyToClipboard = () => {
        navigator.clipboard.writeText(mnemonic);
        toast.success('Copied to clipboard');
    };
    return (
        <div>
            {!onClickGenerate && (
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
                            value={mnemonic}
                            onChange={(e) => setMnemonic(e.target.value)}
                            type='password'
                            placeholder='Enter your secret phrase (or leave blank to generate)'
                        />
                        <Button
                            className='py-6 px-10'
                            onClick={() => clickGenerate()}
                        >
                            Generate Wallet
                        </Button>
                    </div>
                </motion.div>
            )}
            {onClickGenerate && (
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
                        {wallets.map((wallet, i) => (
                            <Wallet key={i} wallet={wallet} />
                        ))}
                    </motion.div>
                </>
            )}
        </div>
    );
}
