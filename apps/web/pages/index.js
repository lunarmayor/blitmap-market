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
import NFT from "@ui/organisms/NFTs/Blitmap";
import loot from "../public/community.png";
import useInfiniteScroll from "react-infinite-scroll-hook";
import useExchangeRate from "@hooks/useExchangeRate";
import { formatMoney, shortenNumber } from "@utils";
import { useEtherBalance } from "@usedapp/core";
import useCollection from "@hooks/useCollection";

import dynamic from "next/dynamic";
import { StarField } from "starfield-react";

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
  line-height: 1;
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

const CollectionCard = ({ image, name, description, future }) => (
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
      {future && (
        <Box
          position="absolute"
          top={10}
          left={10}
          p={2}
          px={3}
          borderRadius="20px"
          bg="rgba(0,0,0,0.6)"
        >
          <P fontSize={10}>Future Expansion</P>
        </Box>
      )}
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
  //  const treasury = useEtherBalance(
  //   "0x8cFDF9E9f7EA8c0871025318407A6f1Fbc5d5a18"
  //);

  const [item, setItem] = useState(null);
  const { items, loading, fetchMore, moreLeft } = useItems({
    collection: "blitmap"
  });
  const collection = useCollection("blitmap");
  console.log(collection);
  const blitnauts = useCollection("the-blitnauts");

  return (
    <Flex flex={1} flexDirection="column" bg="background">
      <Header />
      <Box position="relative">
        <Box
          position="absolute"
          top={0}
          bottom={0}
          right={0}
          left="0"
          overflow="hidden"
        >
          <StarField
            starSize={2}
            starRatio={1000}
            width={2500}
            fps={60}
            speed={1}
            starStyle={() => {
              if (Math.random() > 0.5) {
                return "rgba(127, 255, 168, 0.8)";
              }
              return "rgba(255, 255, 255, 0.8)";
            }}
            noBackground={true}
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: "50%",
              transform: "translateX(-50%)"
            }}
          />
        </Box>
        <Flex
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
                  marginLeft: -10,
                  marginTop: -10,
                  width: 100,
                  height: 100
                  //backgroundColor: "rgba(0,0,0,0.05)"
                }}
                src="/blitmap-logo.png"
              />
              <H1
                ml={4}
                fontFamily="body"
                fontSize={[30, 32]}
                fontWeight={900}
                maxWidth="640px"
              >
                Welcome to the <br />
                Blitmap Market
              </H1>
            </Flex>
            <P
              mt={3}
              fontSize={[16, 18]}
              color="rgba(255,255,255,0.8)"
              maxWidth="640px"
            >
              A Blitmap community marketplace with 0% marketplace fees and
              community royalties. Join the universe.
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
              <Link href="/collections/blitmap">
                <a>
                  <Box p={3}>
                    <Flex alignItems="center" mb={3}>
                      <img
                        src="/blitmap-logo.png"
                        style={{
                          width: 30,
                          padding: 5,
                          height: 30,
                          border: "1px solid rgba(255,255,255,0.3)",
                          borderRadius: "50%"
                        }}
                      />
                      <P fontSize={14} ml={2}>
                        Blitmap
                      </P>
                    </Flex>
                    <Flex alignItems="center" mt={2}>
                      <Box>
                        <img
                          src="/ether.png"
                          style={{ width: 30, marginLeft: -2 }}
                        />
                      </Box>
                      <Stat>
                        {collection ? shortenNumber(collection.floor || 0) : 0}
                      </Stat>
                    </Flex>
                    <P mb={0} mt={2} color="textSecondary" fontSize={14}>
                      Entry Price
                    </P>
                  </Box>
                </a>
              </Link>
            </Pane>
            <Pane bg="black">
              <Link href="/collections/blitmap">
                <a>
                  <Box p={3}>
                    <Flex alignItems="center" mb={3}>
                      <img
                        src="/blitmap-logo.png"
                        style={{
                          width: 30,
                          padding: 5,
                          height: 30,
                          border: "1px solid rgba(255,255,255,0.3)",
                          borderRadius: "50%"
                        }}
                      />
                      <P fontSize={14} ml={2}>
                        Blitmap
                      </P>
                    </Flex>
                    <Flex alignItems="center" mt={2}>
                      <Box>
                        <img
                          src="/ether.png"
                          style={{ width: 30, marginLeft: -2 }}
                        />
                      </Box>
                      <Stat>
                        {collection ? shortenNumber(collection.floor || 0) : 0}
                      </Stat>
                    </Flex>
                    <P mb={0} mt={2} color="textSecondary" fontSize={14}>
                      Highest Offer
                    </P>
                  </Box>
                </a>
              </Link>
            </Pane>
            <Pane bg="black">
              <Link href="/collections/blitmap">
                <a>
                  <Box p={3}>
                    <Flex alignItems="center" mb={3}>
                      <img
                        src="/blitnaut.png"
                        style={{
                          width: 30,
                          height: 30,
                          border: "1px solid rgba(255,255,255,0.3)",
                          borderRadius: "50%"
                        }}
                      />
                      <P fontSize={14} ml={2}>
                        The Blitnauts
                      </P>
                    </Flex>

                    <Flex alignItems="center" mt={2}>
                      <Box>
                        <img
                          src="/ether.png"
                          style={{ width: 30, marginLeft: -2 }}
                        />
                      </Box>
                      <Stat>
                        {blitnauts ? shortenNumber(blitnauts.floor || 0) : 0}
                      </Stat>
                    </Flex>
                    <P mb={0} mt={2} color="textSecondary" fontSize={14}>
                      Entry Price
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
          Blitmap Collections
        </H2>
        <CollectionGrid>
          <Link href="/collections/blitmap">
            <a>
              <CollectionCard
                image="/rose.png"
                padding
                name={"Blitmap"}
                description="Blitmap is a community crafted sci-fantasy universe. All data is completely on chain."
              />
            </a>
          </Link>
          <Link href="/collections/the-blitnauts">
            <a>
              <CollectionCard
                image="/blitnaut.png"
                name={"The Blitnauts"}
                description="A faction of sentient robots sworn to locate and protect the Blitmaps, and the heroes of our world."
              />
            </a>
          </Link>

          <CollectionCard
            image="/enemies.png"
            name={"Enemies Expansion"}
            future={true}
            description={"the Rivals of the Blitnauts."}
          />
        </CollectionGrid>
      </Flex>
      <Box p={[3, 4]} alignItems="center" flexDirection="column">
        <H2 mb={3} color="textSecondary" fontSize={24}>
          Entry Blitmaps
        </H2>

        <Grid>
          {items
            .filter(item => !!item.price)
            .map(bag => (
              <Link
                href={`/collections/${bag.contract}/${bag.id}`}
                key={bag.id}
              >
                <a>
                  <NFT item={bag} />
                </a>
              </Link>
            ))}
        </Grid>
        <Link href="/collections/blitmap">
          <a>
            <P mt={3}>See All</P>
          </a>
        </Link>
      </Box>
    </Flex>
  );
};

export default Home;
