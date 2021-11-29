import { useState, useEffect } from "react";
import getBlitmapData from "../../../services/getBlitmapData";
import he from "he";
import ether from "../../../public/ether.png";
import { Box, Flex, P, Image } from "@ui";
import color from "color";

const CardFooter = ({ image, name, price, children, ...props }) => (
  <Box bg="#24222E">
    <Flex justifyContent="space-between" alignItems="center" pr={"20px"}>
      <Flex alignItems="center" flex={1}>
        <img
          src={image}
          style={{
            width: 50,
            height: 50,
            borderBottomLeftRadius: 10
          }}
        />
        <Box ml={3}>
          <P>{name}</P>
        </Box>
      </Flex>

      {children && (
        <Box
          py={1}
          px={3}
          border="1px solid rgba(255,255,255,0.2)"
          borderRadius="100px"
        >
          {children}
        </Box>
      )}

      <Flex alignItems="center" justifyContent="flex-end" flex={1}>
        {price > 0 && (
          <>
            <Image src={ether} width={18} height={14} />
            <P color="textPrimary" fontWeight="700" fontSize={16}>
              {price}
            </P>
          </>
        )}
      </Flex>
    </Flex>
  </Box>
);

const lighten = c => {
  let newColor = color(c);
  let mix = newColor.mix(color("white"), 0.05);

  let contrast = mix.contrast(color("black"));

  if (contrast > 8) {
    return mix.hex();
  } else {
    return lighten(mix.hex());
  }
};

const Blitmap = ({ item }) => {
  const [data, setData] = useState(null);
  const [primaryColor, setPrimaryColor] = useState(null);

  useEffect(() => {
    const getData = () => {
      let blitData = getBlitmapData(item.id);
      console.log(blitData);
      setData(blitData);
    };

    if (item && item.id) {
      getData();
    }
  }, [item && item.id]);

  useEffect(() => {
    const getPrimaryColor = () => {
      let firstColor = color(data.colors[0]);
      let contrast = firstColor.contrast(color("black"));

      if (contrast < 8) {
        setPrimaryColor(lighten(data.colors[0]));
      } else {
        setPrimaryColor(data.colors[0]);
      }
    };

    if (data) {
      getPrimaryColor();
    }
  }, [data]);

  return (
    <Box
      borderColor={primaryColor ? primaryColor : "black"}
      bg="#0E0D0B"
      overflow="hidden"
      borderWidth={5}
      borderRadius={20}
    >
      <Box p={"20px"}>
        <Flex justifyContent="space-between" mb={"5px"}>
          <P fontSize={18} fontWeight={900}>
            {data && data.name}
          </P>
          <P
            fontSize={18}
            fontWeight={900}
            color={primaryColor ? primaryColor : "black"}
          >
            #{data && data.id}
          </P>
        </Flex>
        <img src={item.image} />

        <Flex mt={2} mb={4}>
          {data &&
            data.slabs.map((slab, i) => {
              return (
                <P fontSize={24} color={data.colors[i]} mr={2}>
                  {he.decode(slab)}
                </P>
              );
            })}
        </Flex>
        <Flex justifyContent="space-between" alignItems="flex-end">
          <P fontSize={14}>
            {data && data.affinity.filter(i => i).join(" - ")}
          </P>

          <Flex>
            {data &&
              data.parents.map(parent => (
                <Box ml={2} key={parent}>
                  <img
                    alt="parent"
                    width={30}
                    src={`https://market.blitmap.com/blitmaps-32/${parent}.png`}
                  />
                </Box>
              ))}
          </Flex>
        </Flex>
      </Box>
      <CardFooter image="/blitmap-logo.png" price={item.price}></CardFooter>
    </Box>
  );
};

export default Blitmap;
