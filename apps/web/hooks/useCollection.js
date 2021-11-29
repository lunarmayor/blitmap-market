import { useState, useEffect } from "react";
import api from "@api";
import GenesisItem from "@ui/organisms/NFTs/Genesis";
import MLootItem from "@ui/organisms/NFTs/mLoot";
import LootItem from "@ui/organisms/NFTs/Loot";
import Blitmap from "@ui/organisms/NFTs/Blitmap";
import { gweiToEth } from "@utils";

export const customCollectionData = {
  // genesis
  genesisadventurer: {
    cover:
      "https://lh3.googleusercontent.com/_oDa2m5z64Qf8RXbQFylP7MaDRwUXbJAchbDIFQqlVA8mdZ0feG4JHcMQwrYa7jTesY98RITIAfeAIGgHenvuMuU3zHmM15sRfTfQIE=h600",
    image: "/genesisCollectionLogo-medium.png",
    Item: GenesisItem,
    loot: true,
    royalty: 0.025,

    royaltyRecipient: {
      name: "Royalty",
      description: "Royalty goes to Genesis community treasury and founders",
      link: "https://genesisproject.xyz/"
    },
    discord: "https://discord.com/invite/YUYyPSuwfU",
    twitter: "https://twitter.com/genesisloot",
    home: "https://genesisproject.xyz",
    etherscan:
      "https://etherscan.io/token/0x8db687aceb92c66f013e1d614137238cc698fedb#writeProxyContract"
  },
  // mLoot
  "more-loot": {
    cover: "/community.png",

    image: "/mLootCollectionLogo-medium.png",
    Item: MLootItem,
    loot: true,
    hasItemSearch: true,
    royalty: 0,
    royaltyRecipient: {},
    discord: "https://discord.com/invite/KuYyKXam9G",
    twitter: "https://twitter.com/lootproject",
    home: "https://lootproject.com",
    etherscan:
      "https://etherscan.io/address/0x869ad3dfb0f9acb9094ba85228008981be6dbdde"
  },

  // Loot
  loot: {
    cover: "/community.png",

    image: "/lootCollectionLogo-medium.png",
    Item: LootItem,
    loot: true,
    hasItemSearch: true,
    royalty: 0.05,

    royaltyRecipient: {
      name: "Community Tresury",
      description:
        "Community controlled treasury for funding projects in the lootosphere.",
      link: "https://royaltydao.loot.exchange",
      address:
        process.env.NEXT_PUBLIC_CHAIN_ID == 4
          ? "0x8e71a0d2CC9c48173D9a9b7d90D6036093212aFa"
          : "0x8cFDF9E9f7EA8c0871025318407A6f1Fbc5d5a18"
    },
    discord: "https://discord.com/invite/KuYyKXam9G",
    twitter: "https://twitter.com/lootproject",
    home: "https://lootproject.com",
    etherscan:
      "https://etherscan.io/address/0xff9c1b15b16263c61d017ee9f65c50e4ae0113d7"
  },

  // Loot
  boredapeyachtclub: {
    image: "/byaclogotransparent.png",
    cover:
      "https://lh3.googleusercontent.com/i5dYZRkVCUK97bfprQ3WXyrT9BnLSZtVKGJlKQ919uaUB0sxbngVCioaiyu9r6snqfi2aaTyIvv6DHm4m2R3y7hMajbsv14pSZK8mhs=h600",
    royalty: 0.025,

    royaltyRecipient: {
      name: "Bored Ape Creators"
    },
    discord: "https://discord.com/invite/KuYyKXam9G",
    twitter: "https://twitter.com/lootproject",
    home: "https://lootproject.com",
    etherscan:
      "https://etherscan.io/address/0xff9c1b15b16263c61d017ee9f65c50e4ae0113d7"
  },
  // Loot
  "mutant-ape-yacht-club": {
    //image: "/byaclogotransparent.png",
    cover:
      "https://lh3.googleusercontent.com/i5dYZRkVCUK97bfprQ3WXyrT9BnLSZtVKGJlKQ919uaUB0sxbngVCioaiyu9r6snqfi2aaTyIvv6DHm4m2R3y7hMajbsv14pSZK8mhs=h600",
    royalty: 0.025,

    royaltyRecipient: {
      name: "Bored Ape Creators"
    },
    discord: "https://discord.com/invite/KuYyKXam9G",
    twitter: "https://twitter.com/lootproject",
    home: "https://lootproject.com",
    etherscan:
      "https://etherscan.io/address/0xff9c1b15b16263c61d017ee9f65c50e4ae0113d7"
  },
  "bored-ape-kennel-club": {
    //image: "/byaclogotransparent.png",
    cover:
      "https://lh3.googleusercontent.com/i5dYZRkVCUK97bfprQ3WXyrT9BnLSZtVKGJlKQ919uaUB0sxbngVCioaiyu9r6snqfi2aaTyIvv6DHm4m2R3y7hMajbsv14pSZK8mhs=h600",
    royalty: 0.025,

    royaltyRecipient: {
      name: "Bored Ape Creators"
    },
    discord: "https://discord.com/invite/KuYyKXam9G",
    twitter: "https://twitter.com/lootproject",
    home: "https://lootproject.com",
    etherscan:
      "https://etherscan.io/address/0xff9c1b15b16263c61d017ee9f65c50e4ae0113d7"
  },
  "bored-ape-chemistry-club": {
    //image: "/byaclogotransparent.png",
    cover:
      "https://lh3.googleusercontent.com/i5dYZRkVCUK97bfprQ3WXyrT9BnLSZtVKGJlKQ919uaUB0sxbngVCioaiyu9r6snqfi2aaTyIvv6DHm4m2R3y7hMajbsv14pSZK8mhs=h600",
    royalty: 0.025,

    royaltyRecipient: {
      name: "Bored Ape Creators"
    },
    discord: "https://discord.com/invite/KuYyKXam9G",
    twitter: "https://twitter.com/lootproject",
    home: "https://lootproject.com",
    etherscan:
      "https://etherscan.io/address/0xff9c1b15b16263c61d017ee9f65c50e4ae0113d7"
  },
  blitmap: {
    cover:
      "https://lh3.googleusercontent.com/Q_Yb9MG3cNPelLduHcoQ0G5_6YESh_HjZfVUBeritA3Daj0nYR-kulNhqPcH-I2R8FGTg22e-DJbSuAuQ9G6HWa92RPYCNHyNaRL=h400",

    discord: "https://discord.gg/blitmap",
    twitter: "https://twitter.com/blitmap",
    Item: Blitmap,
    home: "https://blitmap.com",
    etherscan:
      "https://etherscan.io/address/0x8d04a8c79cEB0889Bdd12acdF3Fa9D207eD3Ff63",
    royalty: 0,

    royaltyRecipient: {
      name: ""
    }
  },

  "the-blitnauts": {
    cover: "/blitnautbackground.png",
    image: "/blitnaut-small.png",

    discord: "https://discord.gg/blitmap",
    twitter: "https://twitter.com/blitmap",
    home: "https://blitmap.com",
    etherscan:
      "https://etherscan.io/address/0x448f3219cf2a23b0527a7a0158e7264b87f635db",
    royalty: 0,

    royaltyRecipient: {
      name: ""
    }
  }
};

const nameToContractMap = {};
const useCollection = id => {
  const [collection, setCollection] = useState(null);

  useEffect(() => {
    const fetchCollection = async () => {
      let result = await api(id, "");

      setCollection({
        ...result.collection,
        floor: gweiToEth(result.collection.floor_price),
        count: result.collection.token_count,
        royalty: 0,
        ...customCollectionData[id]
      });
    };

    if (id) {
      fetchCollection();
    }
  }, [id]);

  return collection;
};

export default useCollection;
