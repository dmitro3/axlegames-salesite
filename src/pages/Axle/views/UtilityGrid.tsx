import { Box, Flex, Grid, GridItem, Image, Text } from "@chakra-ui/react";

import { brandingColors } from "../../../config/brandingColors";

const data = [
  {
    img: `https://axlegames.s3.ap-south-1.amazonaws.com/assets/gamein/compete.png`,
    title: "Compete",
    content: "Play web3 skill games with friends on Axle and win $AXLE tokens",
  },
  {
    img: `https://axlegames.s3.ap-south-1.amazonaws.com/assets/gamein/chargeup.png`,
    title: "ChargeUp",
    content: "Use $AXLE tokens to power up and boost your rewards",
  },
  {
    img: `https://axlegames.s3.ap-south-1.amazonaws.com/assets/gamein/compound.png`,
    title: "Compound",
    content: "Stake $AXLE and earn compound interest with a decent APY",
  },
  {
    img: `https://axlegames.s3.ap-south-1.amazonaws.com/assets/gamein/collect.png`,
    title: "Collect",
    content: "Purchase or win AXLE game NFT rewards by playing games",
  },
];

const UtilityGrid = () => {
  return (
    <Box>
      <Text
        textAlign={"center"}
        fontWeight="bold"
        fontSize={"3xl"}
        color={brandingColors.primaryTextColor}
        fontFamily={`'Russo One', sans-serif`}
        py={{ base: "8" }}
      >
        Utilities
      </Text>
      <Grid
        templateColumns={{ base: "1fr", "2xl": "1fr 1fr" }}
        justifyContent="center"
        alignItems={"center"}
        width={{ md: "80%", xl: "70%" }}
        margin={{ base: "4", md: "auto" }}
        rowGap="1rem"
        columnGap={"1rem"}
      >
        {data.map((d, i) => (
          <GridItem display={"flex"} justifyContent="center" key={i}>
            <Box
              p={{ base: "8" }}
              width={"100%"}
              bg={brandingColors.fgColor}
              borderRadius="md"
              shadow={"lg"}
              fontWeight="bold"
              fontFamily={`'Russo One', sans-serif`}
              display={"flex"}
              flexDirection="row"
              alignItems={"center"}
              columnGap="1rem"
            >
              <Image width={{ base: "24" }} src={d.img} />
              <Flex direction={"column"}>
                <Text fontSize={"xl"} color={brandingColors.primaryTextColor}>
                  {d.title}
                </Text>
                <Text
                  fontSize={"md"}
                  fontWeight="bold"
                  color={brandingColors.secondaryTextColor}
                >
                  {d.content}
                </Text>
              </Flex>
            </Box>
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
};

export default UtilityGrid;
