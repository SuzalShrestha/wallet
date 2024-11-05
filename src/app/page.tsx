import KeyGenerator from '@/components/keygenerator';
import Navbar from '@/components/navbar';
import { Toaster } from 'sonner';

export default function Home() {
    return (
        <main className='max-w-7xl mx-auto min-h-[90vh]'>
            <Toaster position='bottom-right' />
            <Navbar />
            <KeyGenerator />
        </main>
    );
}
