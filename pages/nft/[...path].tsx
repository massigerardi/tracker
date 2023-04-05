import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import {useNetwork} from "wagmi";
import {Default} from "../../src/components/layouts/Default";
import {NFT} from "../../src/components/templates/nft";

const nft = () => {
  const router = useRouter()
  const { chain } = useNetwork();
  const [address, setAddress] = useState<string>("")
  const [tokenId, setTokenId] = useState<string>("")
  useEffect(() => {
    if (!router.isReady) {return;}
    const [ pathAddress, pathTokenId] = router.query.path as string[];
    setAddress(pathAddress);
    setTokenId(pathTokenId);
  }, [router.isReady]);

  return (
    <Default pageName="NFT">
      <NFT chain={chain?.id} tokenId={tokenId} address={address}/>
    </Default>
  );

}

export default nft;