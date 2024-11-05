import Footer from '@/components/footer';
import KeyGenerator from '@/components/keygenerator';
import Navbar from '@/components/navbar';

export default function Home() {
    return (
        <main className='max-w-7xl mx-auto'>
            <Navbar />
            <KeyGenerator />
            <Footer />
        </main>
    );
}
