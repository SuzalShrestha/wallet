'use client';
import { Box, Moon, Sun } from 'lucide-react';
import { Switch } from './ui/switch';
import { useTheme } from 'next-themes';

export default function Navbar() {
    const { theme, setTheme } = useTheme();
    return (
        <nav className='flex items-center justify-between py-4 gap-4 my-2'>
            <div className='flex items-center  font-extrabold  gap-2'>
                <Box />
                <span className='text-3xl'>Solana</span>
            </div>
            <div className='flex items-center'>
                <div className='flex gap-2'>
                    <Sun />
                    <Switch
                        onCheckedChange={() =>
                            setTheme(theme === 'dark' ? 'light' : 'dark')
                        }
                    />
                    <Moon />
                </div>
            </div>
        </nav>
    );
}
