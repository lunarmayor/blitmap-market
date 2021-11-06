import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import styled from "@emotion/styled";
import {
  FaEye,
  FaFilter,
  FaArrowDown,
  FaBars,
  FaStore,
  FaInfo,
  FaSort,
  FaTwitter,
  FaDiscord,
  FaEthereum,
  FaHome,
  FaSword
} from "react-icons/fa";
import {
  Flex,
  Box,
  Grid,
  Select,
  P,
  Image,
  Loader,
  Pane,
  H2,
  H1,
  RadioGroup
} from "@ui";
import { formatEther } from "@ethersproject/units";
import Header from "@ui/organisms/Header";
import CollectionStats from "@ui/organisms/CollectionStats";
import ItemSelector from "@ui/organisms/ItemSelector";
import NFT from "@ui/organisms/GenericNFT";
import loot from "../public/community.png";
import useInfiniteScroll from "react-infinite-scroll-hook";
import useExchangeRate from "@hooks/useExchangeRate";
import { formatMoney, shortenNumber } from "@utils";
import { useEtherBalance } from "@usedapp/core";
import useCollection from "@hooks/useCollection";

import { nameToContractMap } from "@hooks/useContractName";

import useItems from "../hooks/useItems";

const IconButton = ({ icon, ...props }) => (
  <Box
    p={3}
    borderRadius="default"
    borderColor="borderColorAlt"
    borderWidth={1}
    {...props}
  >
    {icon}
  </Box>
);

const Stat = styled(H2)`
  font-weight: 600;
  font-style: unset;
  color: rgba(255, 255, 255, 0.9);
  font-family: helvetica neue;
`;

const CollectionGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 24px;
  max-width: 920px;
  width: 100%;

  @media (max-width: 620px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 420px) {
    grid-template-columns: 1fr;
  }
`;

const StatGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  max-width: 920px;
  width: 100%;

  @media (max-width: 832px) {
    grid-template-columns: 1fr 1fr;
  }

  & > div {
    border-radius: 0px;
    border-right-width: 0px;
  }

  & > div:first-child {
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
  }

  & > div:last-child {
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    border-right-width: 2px;
  }
`;

const CollectionCard = ({ image, name, description }) => (
  <Flex
    height={"100%"}
    flexDirection="column"
    sx={{
      cursor: "pointer"
    }}
    border="1px solid rgba(255,255,255,0.20)"
  >
    <Box height={0} paddingBottom="100%" w={1} position="relative">
      <Box position="absolute" top={0} bottom={0} left={0} right={0}>
        <img
          src={image}
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            height: "100%",
            objectFit: "cover"
          }}
        />
      </Box>
    </Box>
    <Box bg="rgba(255,255,255,0.05)" p={3} flex={1}>
      <H2 fontSize={20} m={0}>
        {name}
      </H2>
      <P mt={1} color="textSecondary" fontSize={14}>
        {description}
      </P>
    </Box>
  </Flex>
);

const Home = () => {
  const [lens, setLens] = useState("characters");
  const [isSticky, setIsSticky] = useState(false);
  const itemsRef = useRef(null);
  const exchangeRate = useExchangeRate();
  const treasury = useEtherBalance(
    "0x8cFDF9E9f7EA8c0871025318407A6f1Fbc5d5a18"
  );

  const [item, setItem] = useState(null);
  const { items, loading, fetchMore, moreLeft } = useItems({
    collection: "boredapeyachtclub"
  });
  const collection = useCollection("boredapeyachtclub");

  return (
    <Flex flex={1} flexDirection="column" bg="background">
      <Header />
      <Box position="relative">
        <Flex
          bg="primary"
          p={4}
          pt={[4, 5]}
          pb={"100px"}
          flexDirection="column"
          alignItems="center"
        >
          <Box maxWidth={920} width={["100%", "100%", "100%", "920px"]}>
            <Flex>
              <img
                style={{
                  backgroundColor: "rgba(0,0,0,0.05)",
                  padding: 8,
                  borderRadius: "50%"
                }}
                src="/byaclogotransparent.png"
                width={100}
              />
              <H1
                ml={4}
                fontFamily="body"
                fontSize={[16, 32]}
                fontWeight={900}
                maxWidth="640px"
                color="black"
                sx={{
                  fontStyle: "italic",
                  textTransform: "uppercase"
                }}
              >
                Welcome to the <br />
                Ape Exchange
              </H1>
            </Flex>
            <P
              mt={3}
              fontSize={[14, 18]}
              color="rgba(0,0,0,0.8)"
              maxWidth="640px"
            >
              A BAYC community marketplace with 0% marketplace fees and
              community royalties. Join the club.
            </P>
          </Box>
        </Flex>{" "}
        <Flex
          p={3}
          alignItems="center"
          flexDirection="column"
          pb={5}
          position="absolute"
          left={0}
          right={0}
          top="calc(100% - 80px)"
        >
          <StatGrid>
            <Pane bg="black">
              <a href="https://www.royaltydao.com/">
                <Box p={3}>
                  <P
                    fontWeight={900}
                    fontStyle={"italic"}
                    mb={1}
                    color="textSecondary"
                  >
                    Treasury
                  </P>
                  <Stat>
                    Ξ
                    {treasury
                      ? shortenNumber(Number(formatEther(treasury || 0)))
                      : 0}
                  </Stat>
                  <P mt={-1} color="primary">
                    {treasury
                      ? formatMoney(formatEther(treasury) * exchangeRate)
                      : 0}
                  </P>
                </Box>
              </a>
            </Pane>
            <Pane bg="black" display={["none", "none", "block", "block"]}>
              <a href="https://www.royaltydao.com/">
                <Box p={3}>
                  <P
                    fontWeight={900}
                    fontStyle={"italic"}
                    mb={1}
                    color="textSecondary"
                  >
                    Open Proposals
                  </P>
                  <Stat>0</Stat>
                  <P mt={-1} color="primary">
                    0 closed
                  </P>
                </Box>
              </a>
            </Pane>
            <Pane bg="black">
              <Link href="/collections/loot">
                <a>
                  <Box p={3}>
                    <P
                      fontWeight={900}
                      fontStyle={"italic"}
                      mb={1}
                      color="textSecondary"
                    >
                      BAYC Floor
                    </P>
                    <Stat>
                      Ξ{collection ? shortenNumber(collection.floor || 0) : 0}
                    </Stat>
                    <P mt={-1} color="primary">
                      {collection
                        ? formatMoney(collection.floor * exchangeRate)
                        : 0}
                    </P>
                  </Box>
                </a>
              </Link>
            </Pane>
          </StatGrid>
        </Flex>
      </Box>
      <Flex
        p={3}
        alignItems="center"
        flexDirection="column"
        pb={5}
        pt={"100px"}
      >
        <H2 my={4} color="textSecondary" fontSize={24}>
          BAYC Collections
        </H2>
        <CollectionGrid>
          <Link href="/collections/boredapeyachtclub">
            <a>
              <CollectionCard
                image="/apeCollectionImage.png"
                padding
                name={"Bored Ape Yacht Club"}
                description="a collection of 10,000 unique Bored Ape NFTs— unique digital collectibles living on the Ethereum blockchain."
              />
            </a>
          </Link>
          <Link href="/collections/mutant-ape-yacht-club">
            <a>
              <CollectionCard
                image="https://lh3.googleusercontent.com/lHexKRMpw-aoSyB1WdFBff5yfANLReFxHzt1DOj_sg7mS14yARpuvYcUtsyyx-Nkpk6WTcUPFoG53VnLJezYi8hAs0OxNZwlw6Y-dmI=s0"
                name={"Mutant Ape Yacht Club"}
                description={
                  "A collection of up to 20,000 Mutant Apes that can only be created by exposing an existing Bored Ape to a vial of MUTANT SERUM"
                }
              />
            </a>
          </Link>
          <Link href="/collections/bored-ape-kennel-club">
            <a>
              <CollectionCard
                image="https://lh3.googleusercontent.com/l1wZXP2hHFUQ3turU5VQ9PpgVVasyQ79-ChvCgjoU5xKkBA50OGoJqKZeMOR-qLrzqwIfd1HpYmiv23JWm0EZ14owiPYaufqzmj1=s0"
                name={"Bored Ape Kennel Club"}
                description={
                  "It gets lonely in the swamp sometimes. That's why every ape should have a four-legged companion."
                }
              />
            </a>
          </Link>
        </CollectionGrid>
      </Flex>
      <Box p={[3, 4]} alignItems="center" flexDirection="column">
        <H2 mb={3} color="textSecondary" fontSize={24}>
          Entry Apes
        </H2>

        <Grid>
          {items.map(bag => (
            <Link href={`/collections/${bag.contract}/${bag.id}`} key={bag.id}>
              <a>
                <NFT item={bag} />
              </a>
            </Link>
          ))}
        </Grid>
        <Link href="/collections/boredapeyachtclub">
          <a>
            <P mt={3}>See All</P>
          </a>
        </Link>
      </Box>
    </Flex>
  );
};

export default Home;
