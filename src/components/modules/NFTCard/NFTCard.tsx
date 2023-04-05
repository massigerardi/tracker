import {Box, HStack, Image, Link, useColorModeValue} from '@chakra-ui/react';
import {EvmNft} from '@moralisweb3/common-evm-utils';
import {Eth} from '@web3uikit/icons';
import axios from "axios";
import {FC, useEffect, useState} from 'react';
import {resolveIPFS} from 'utils/resolveIPFS';

export interface NFTCardParams {
  key: number;
  nft: EvmNft;
}

interface Metadata { image?: string, name?: string, description?: string}

const grabMetadata = async (tokenUri: string | undefined, metadata: Metadata): Promise<Metadata> => {
  if (metadata && metadata.image || !tokenUri) {return metadata;}
  return axios.get(tokenUri).then((response) => response.data as Metadata).catch(() => metadata);
}

const NFTCard: FC<NFTCardParams> = ({ nft: { tokenAddress, tokenId, amount, name, symbol, tokenUri, metadata } }) => {
  const bgColor = useColorModeValue('none', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const [meta, setMeta] = useState<Metadata>()
  useEffect(() => {
    grabMetadata(tokenUri, metadata as Metadata).then((response) => setMeta(response));
  }, []);
  const path = `/nft/${tokenAddress.lowercase}/${tokenId}`;
  console.log(tokenAddress.lowercase)
  return (
    <Link href={path}>
    <Box maxWidth="315px" bgColor={bgColor} padding={3} borderRadius="xl" borderWidth="1px" borderColor={borderColor}>
      <Box maxHeight="260px" overflow={'hidden'} borderRadius="xl">
        <Image
          src={resolveIPFS(meta?.image)}
          alt={'nft'}
          minH="260px"
          minW="260px"
          boxSize="100%"
          objectFit="fill"
          fallbackSrc="https://via.placeholder.com/260"
        />
      </Box>
      <Box mt="1" fontWeight="semibold" as="h4" noOfLines={1} marginTop={2}>
        {name} {symbol}
      </Box>
      <HStack alignItems={'center'}>
        <Box as="h4" noOfLines={1} fontWeight="medium" fontSize="smaller">
          Amount: {amount}
        </Box>
        <Eth fontSize="20px" />
      </HStack>
    </Box>
    </Link>
  );
};

export default NFTCard;
