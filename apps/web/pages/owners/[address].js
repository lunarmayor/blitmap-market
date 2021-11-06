import { useEffect, useState } from "react";
import { Flex, Box, P, Grid, Select } from "@ui";
import Link from "next/link";
import { useRouter } from "next/router";
import NFT from "@ui/organisms/NFTs/Loot";
import Owner from "@ui/organisms/Owner";
import Header from "@ui/organisms/Header";
import SynthLootNFT from "@ui/organisms/SynthLootNFT";

import GenesisItem from "@ui/organisms/NFTs/Genesis";
import MLootItem from "@ui/organisms/NFTs/mLoot";
import LootItem from "@ui/organisms/NFTs/Loot";
import GenericNFT from "@ui/organisms/GenericNFT";
import { GenericGrid } from "../collections/[contract]";

import { FaEye } from "react-icons/fa";

import useWallet from "@hooks/useWallet";
import useAddressTokens from "@hooks/useAddressTokens";

const Adventurer = ({}) => {
  const router = useRouter();
  const { address } = router.query;

  const [lens, setLens] = useState("characters");

  const tokens = useAddressTokens(address);

  const wallet = useWallet(address);
  const bagsHeld = tokens.length + 1;

  return (
    <Flex flex={1} flexDirection="column" bg="black">
      <Header />
      <Flex justifyContent="space-between" p={3} pb={2}>
        <Box mb={3}>
          <Owner address={address || ""} name={wallet.shortName || ""} large />
        </Box>
      </Flex>
      <Box p={3} pt={0}>
        <Grid>
          {tokens.map(loot => {
            let Item = GenericNFT;

            return (
              <Link href={`/collections/${loot.contract}/${loot.id}`}>
                <a>
                  <Item item={loot} />
                </a>
              </Link>
            );
          })}
        </Grid>
      </Box>
    </Flex>
  );
};

export default Adventurer;
