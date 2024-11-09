import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Button } from './ui/button';
import { toast } from 'sonner';
export function Wallet({
    wallet,
    index,
}: {
    wallet: { publicKey: string; privateKey: string };
    index: number;
}) {
    const [isEyeVisible, setIsEyeVisible] = useState<boolean>(false);
    const copyToClipboard = (key: string) => {
        navigator.clipboard.writeText(key);
        toast.success('Copied to clipboard');
    };
    return (
        <div className='flex flex-col border-[1px] border-gray-800 rounded-2xl gap-5 my-5'>
            <span className='text-4xl font-bold py-8 px-10'>
                Wallet {index}
            </span>
            <div className='flex flex-col text-xl gap-10 bg-secondary rounded-2xl px-10 py-8'>
                <div>
                    <div>Public Key</div>
                    <div
                        className='text-primary/80 hover:text-primary hover:cursor-pointer'
                        onClick={() => copyToClipboard(wallet.publicKey)}
                    >
                        {wallet.publicKey}
                    </div>
                </div>
                <div>
                    <div>Private</div>
                    <div className='flex justify-between items-center '>
                        <span
                            onClick={() => copyToClipboard(wallet.privateKey)}
                            className='w-[75%] text-primary/80 hover:text-primary hover:cursor-pointer'
                        >
                            {isEyeVisible
                                ? wallet.privateKey
                                : `${'•'.repeat(wallet.privateKey.length)}`}
                        </span>
                        <Button
                            variant={'ghost'}
                            className='p-4 rounded-xl'
                            onClick={() => setIsEyeVisible((prev) => !prev)}
                        >
                            {isEyeVisible ? <Eye /> : <EyeOff />}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
