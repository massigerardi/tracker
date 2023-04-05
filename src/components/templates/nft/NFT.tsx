import {Box, HStack, Image, SimpleGrid, useColorModeValue, VStack} from "@chakra-ui/react";
import {useEvmNFTMetadata} from "@moralisweb3/next";
import {getEllipsisTxt} from "../../../utils/format";
import {resolveIPFS} from "../../../utils/resolveIPFS";

interface Metadata {
  image?: string,
  name?: string,
  description?: string
}

const NFT = ({address, chain, tokenId}: { address: string, chain: number | undefined, tokenId: string }) => {
  const bgColor = useColorModeValue('none', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const descBgColor = useColorModeValue('gray.100', 'gray.600');

  const {data} = useEvmNFTMetadata({
    address,
    tokenId,
    chain,
  });
  const meta = data?.metadata as Metadata;

  return (
    <HStack>
      <Box width="100%" height="100%" bgColor={bgColor} padding={3} borderRadius="xl" borderWidth="1px"
           borderColor={borderColor}>
        <Box overflow={'hidden'} borderRadius="xl">
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
        <SimpleGrid columns={2} spacing={4} bgColor={descBgColor} padding={2.5} borderRadius="xl" marginTop={2}>
          <Box>
            <Box as="h4" noOfLines={1} fontWeight="medium" fontSize="sm">
              Symbol
            </Box>
            <Box as="h4" noOfLines={1} fontSize="sm">
              {data?.symbol}
            </Box>
          </Box>
          <Box>
            <Box as="h4" noOfLines={1} fontWeight="medium" fontSize="sm">
              Amount
            </Box>
            <Box as="h4" noOfLines={1} fontSize="sm">
              {data?.amount}
            </Box>
          </Box>
          <Box>
            <Box as="h4" noOfLines={1} fontWeight="medium" fontSize="sm">
              Chain
            </Box>
            <Box as="h4" noOfLines={1} fontSize="sm">
              {chain}
            </Box>
          </Box>
          <Box>
            <Box as="h4" noOfLines={1} fontWeight="medium" fontSize="sm">
              Address
            </Box>
            <Box as="h4" noOfLines={1} fontSize="sm" title={address}>
              {getEllipsisTxt(address)}
            </Box>
          </Box>
          <Box>
            <Box as="h4" noOfLines={1} fontWeight="medium" fontSize="sm">
              Token Id
            </Box>
            <Box as="h4" noOfLines={1} fontSize="sm">
              {getEllipsisTxt(tokenId)}
            </Box>
          </Box>
        </SimpleGrid>
      </Box>
      <VStack width="100%" height="100%">
        <Box width="100%" height="100%" bgColor={bgColor} padding={5} borderRadius="xl" borderWidth="1px"
             borderColor={borderColor}>
          <Box mt="1" fontWeight="semibold" as="h4" marginBottom={10} noOfLines={2} marginTop={2}>
            {meta?.name}
          </Box>
          <Box mt="1" noOfLines={20} marginTop={2}>
            {meta?.description}
          </Box>
        </Box>
      </VStack>
    </HStack>
  );

};

export default NFT;