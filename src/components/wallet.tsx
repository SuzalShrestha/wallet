import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
export function Wallet({
    wallet,
}: {
    wallet: { publicKey: string; privateKey: string };
}) {
    const [isEyeVisible, setIsEyeVisible] = useState<boolean>(false);
    return (
        <div className='flex flex-col border-[1px] border-gray-800 rounded-2xl gap-5 my-5'>
            <span className='text-4xl font-bold py-8 px-10'>Wallet 1</span>
            <div className='flex flex-col text-2xl gap-10 bg-[#181818] rounded-2xl px-10 py-8'>
                <div>
                    <div>Public Key</div>
                    <div>{wallet.publicKey}</div>
                </div>
                <div>
                    <div>Private</div>
                    <div className='flex justify-between items-center'>
                        <span>
                            {isEyeVisible
                                ? wallet.privateKey
                                : `${'•'.repeat(30)}`}
                        </span>
                        <div
                            className='hover:bg-[#2a2a2a] p-4 rounded-xl'
                            onClick={() => setIsEyeVisible((prev) => !prev)}
                        >
                            {isEyeVisible ? <Eye /> : <EyeOff />}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
