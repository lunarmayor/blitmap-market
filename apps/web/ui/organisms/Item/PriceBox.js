import { H3, Flex, Box, H2, Image, P, Button, Pane } from "@ui";
import Link from "next/link";
import styled from "@emotion/styled";
import Source from "@ui/organisms/Source";
import Owner from "@ui/organisms/Owner";
import { FaInfoCircle } from "react-icons/fa";
import { Helpers } from "@lootexchange/sdk";
import eth from "../../../ethers";
import ether from "../../../public/ether.png";

const Container = ({ ...props }) => (
  <Box p={[3, 3, 4]} pt={[0, 0, 0]} {...props} />
);

const BuyButton = styled(Button)`
  transition: background-color 300ms ease-in-out, color 250ms ease-in-out;
  background: rgba(127, 255, 168, 1);
  color: black;

  &:hover {
    background: rgba(147, 255, 180, 1);
  }
`;

const Price = ({ price }) => (
  <>
    <H3 color="#ffffffc2" mb={2} fontSize={14}>
      Current Price
    </H3>
    <Flex mb={3}>
      <Box width={30} height={30} mr={2}>
        <Image src={ether} width={30} height={30} objectFit="contain" />
      </Box>
      <H2 fontSize={24}>{price}</H2>
    </Flex>
  </>
);

const PriceBox = ({ item, owner, collection = {} }) => {
  const { isForSale, source } = item;
  const isOwn = owner.isOwnItem;

  if (!isOwn && !isForSale) {
    return null;
  }

  let collectionId = item.contract;

  const getCallToAction = () => {
    if (!isOwn && isForSale) {
      return (
        <Link
          href={`/collections/${collectionId}/${item.id}/purchase`}
          passHref
        >
          <BuyButton bg="#ffffff69" color="white">
            Buy Now
          </BuyButton>
        </Link>
      );
    }

    if (isOwn && isForSale && source === "LootExchange") {
      return (
        <Flex>
          <Link
            href={`/collections/${collectionId}/${item.id}/sell?initialPrice=${item.price}`}
            passHref
          >
            <BuyButton bg="#ffffff69" color="white" mr={2}>
              Lower Price
            </BuyButton>
          </Link>
          <BuyButton
            bg="#ffffff69"
            color="white"
            ml={2}
            onClick={async () => {
              if (item.sellOrder) {
                if (!eth.signer) {
                  await eth.connect();
                } else {
                  await Helpers.Wyvern.cancel(eth.signer, item.sellOrder);
                }
              }
            }}
          >
            Cancel Listing
          </BuyButton>
        </Flex>
      );
    }

    if (isOwn && !isForSale) {
      return (
        <>
          <Link href={`/collections/${collectionId}/${item.id}/sell`} passHref>
            <BuyButton bg="#ffffff69" color="white" mr={2}>
              Sell
            </BuyButton>
          </Link>
        </>
      );
    }

    if (isOwn && isForSale && source !== "Loot Exchange") {
      return (
        <>
          <Link
            href={`/collections/${collectionId}/${item.id}/sell?initialPrice=${item.price}`}
            passHref
          >
            <BuyButton bg="#ffffff69" color="white" mr={2}>
              Relist on Loot Exchange
            </BuyButton>
          </Link>
          <Flex mt={3}>
            <Box mr={3}>
              <FaInfoCircle />
            </Box>
            <P fontSize={12} lineHeight={1.9} mt={-1}>
              You bag is listed on open sea. If you relist and someone buys your
              bag from Loot exchange, you&apos;ll pay 0% in transaction fees!
            </P>
          </Flex>
        </>
      );
    }

    return false;
  };

  return (
    <Container>
      {!(owner.isOwnItem && !item.isForSale) && <Price price={item.price} />}
      {getCallToAction()}
    </Container>
  );
};

const BuyBox = ({ item, owner, collection }) => (
  <Pane mb={4} display="flex" flexDirection="column" bg={"rgb(22 22 22)"}>
    <Box p={[3, 3, 4]} flex={1} position="relative">
      <Flex justifyContent="space-between">
        <H2 mb={2}>{item.name}</H2>
      </Flex>

      <Link href={`/owners/${item.owner}`}>
        <a>
          <Owner
            large
            name={owner.shortName}
            address={item.owner}
            avatar={owner.ownerAvatar}
          />
        </a>
      </Link>
    </Box>

    <PriceBox item={item} owner={owner} collection={collection} />
  </Pane>
);

export default BuyBox;
