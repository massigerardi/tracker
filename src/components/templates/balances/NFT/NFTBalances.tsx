import {Box, Grid} from '@chakra-ui/react';
import {useEvmWalletNFTs} from '@moralisweb3/next';
import {NFTCard} from 'components/modules';
import {useSession} from 'next-auth/react';
import {useEffect} from 'react';
import {useNetwork} from 'wagmi';

const NFTBalances = () => {
  const { data } = useSession();
  const { chain } = useNetwork();
  const { data: nfts } = useEvmWalletNFTs({
    address: data?.user?.address,
    chain: chain?.id,
    limit: 100
  });

  useEffect(() => console.log('nfts: ', nfts), [nfts]);

  return (
    <>
      {nfts?.length ? (
        <Grid templateColumns="repeat(auto-fit, minmax(280px, 1fr))" gap={6}>
          {nfts.map((nft, key) => (
            <NFTCard nft={nft} key={key} />
          ))}
        </Grid>
      ) : (
        <Box>Looks Like you do not have any NFTs</Box>
      )}
    </>
  );
};

export default NFTBalances;
