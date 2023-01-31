import { brandingColors } from "./config/brandingColors";
import { useEffect, useState, lazy } from "react";
import { ChakraProvider, theme, Flex, Box, Text } from "@chakra-ui/react";

import AOS from "aos";
import Marquee from "react-fast-marquee";

import "aos/dist/aos.css";
import { LinkIcon } from "@chakra-ui/icons";

const Token = lazy(() => import("./pages/Axle/views/Token"));
const Banner = lazy(() => import("./pages/Axle/dialog/Banner"));
const AxlePresale = lazy(() => import("./pages/Axle/views/AxleSale"));
const UtilityGrid = lazy(() => import("./pages/Axle/views/UtilityGrid"));
const WhitePaper = lazy(() => import("./pages/Axle/views/WhitePaper"));

export const App = () => {
  const [banner, setBanner] = useState(true);

  useEffect(() => {
    AOS.init({});
  }, []);
  return (
    <ChakraProvider theme={theme}>
      <Box
        bg={brandingColors.bgColor}
        backgroundImage={`https://axlegames.s3.ap-south-1.amazonaws.com/assets/bg/token_countdown_bg.png`}
        backgroundSize="contain"
      >
        <Marquee
          gradientWidth={0}
          speed={50}
          style={{
            background: brandingColors.newHighlightColor,
            fontFamily: `'quicksand', sans-serif`,
            color: brandingColors.secondaryTextColor,
            padding: ".5vh 0",
            fontWeight: "bold",
          }}
        >
          <Flex columnGap={"1rem"}>
            <Text>• Zeus sale is live now, Buy $AXLE and get +25% Bonus</Text>
            <Text>• Refer and Earn 5% Bonus $AXLE tokens</Text>
            <Text>• First 100 Buyers {`>`}= 1 BNB will get a Zeus NFT</Text>
            <Text>• Zeus sale is live now, Buy $AXLE and get +25% Bonus</Text>
            <Text>• Refer and Earn 5% Bonus $AXLE tokens</Text>
            <Text>• First 100 Buyers {`>`}= 1 BNB will get a Zeus NFT</Text>
          </Flex>
        </Marquee>
        <Banner close={() => setBanner(false)} isOpen={banner} size="xl" />
        <AxlePresale />
        <Flex
          direction={"column"}
          rowGap="1rem"
          fontFamily={"quicksand"}
          width={{
            base: "100%",
            md: "90%",
            lg: "92%",
            xl: "80%",
            "2xl": "65%",
          }}
          margin="auto"
        >
          <Token />
          <UtilityGrid />
          <WhitePaper />
          <a
            target={"_blank"}
            rel="noopener noreferrer"
            href="https://medium.com/@axlegames/axle-token-how-to-buy-3c523cd0888"
          >
            <Box
              px={6}
              py={2}
              bg={brandingColors.fgColor}
              fontFamily={`'Russo One', sans-serif`}
              color={brandingColors.primaryTwoTextColor}
              border={`2px groove ${brandingColors.primaryTwoTextColor}`}
              borderRadius="sm"
              position={"fixed"}
              bottom="4%"
              right={"4%"}
              cursor="pointer"
              _hover={{
                textDecoration: "underline",
              }}
              display={{ base: "none", lg: "flex" }}
              alignItems={"center"}
              columnGap={".25rem"}
            >
              <LinkIcon />
              <Text fontSize={{ base: "xs", md: "sm", lg: "md" }}>
                How To Buy?
              </Text>
            </Box>
          </a>
        </Flex>
      </Box>
    </ChakraProvider>
  );
};
