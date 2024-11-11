import { LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js';
import { connection } from './connection';
const airDrop = async (publicKey: string, amount: number) => {
    const airDropSignature = await connection.requestAirdrop(
        new PublicKey(publicKey),
        amount * LAMPORTS_PER_SOL
    );
    return await connection.confirmTransaction({ signature: airDropSignature });
};
export default airDrop;
