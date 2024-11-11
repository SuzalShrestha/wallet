import { createMint } from '@solana/spl-token';
import { connection } from './connection';
export const mint = async (payer, mintAuthority) => {
    const mintToken = await createMint(
        connection,
        payer,
        mintAuthority,
        null,
        9
    );
    console.log('Mint:', mintToken.toBase58());
    return mintToken;
};
