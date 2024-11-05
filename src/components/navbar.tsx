import { Box } from 'lucide-react';

export default function Navbar() {
    return (
        <nav className='flex items-center py-4 gap-4'>
            <Box />
            <div className='flex items-center font-extrabold'>
                <span className='text-3xl'>Solana</span>
            </div>
        </nav>
    );
}
