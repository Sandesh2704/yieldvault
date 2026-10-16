import { Connection, clusterApiUrl } from '@solana/web3.js'

const endpoint = clusterApiUrl('devnet')

export const connection = new Connection(endpoint, {
  commitment: 'confirmed',
})