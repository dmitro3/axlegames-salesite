import { Box, Flex, Image, Text } from "@chakra-ui/react";

import { brandingColors } from "../../../config/brandingColors";
import NeuButton from "../component/NeuButton";

const socials = [
  `https://axlegames.s3.ap-south-1.amazonaws.com/assets/main/telegram.webp`,
  `https://axlegames.s3.ap-south-1.amazonaws.com/assets/main/twitter.webp`,
  `https://axlegames.s3.ap-south-1.amazonaws.com/assets/main/instagram.webp`,
  `https://axlegames.s3.ap-south-1.amazonaws.com/assets/main/discord.webp`,
];

const WhitePaper = (props: any) => {
  return (
    <Box
      display={"flex"}
      flexDirection="column"
      rowGap={"8rem"}
      color={brandingColors.secondaryTextColor}
      p={{ base: "4" }}
      fontWeight="bold"
    >
      <Flex
        alignItems={"center"}
        columnGap={"2rem"}
        rowGap={"1rem"}
        direction={{ base: "column", xl: "row" }}
      >
        <Box borderRadius="xl">
          <Image
            width={{ base: "32", lg: "64" }}
            src={`https://axlegames.s3.ap-south-1.amazonaws.com/assets/gamein/whitepaper.png`}
            m={4}
            data-aos={`fade-left`}
          />
        </Box>
        <Flex
          data-aos={`fade-right`}
          p={4}
          borderRadius="xl"
          rowGap={".5rem"}
          direction={"column"}
        >
          <Text
            fontFamily={`'Russo One', sans-serif`}
            color={brandingColors.primaryTextColor}
            fontSize={"3xl"}
          >
            A well-designed Deflationary token model
          </Text>
          <Text>
            Axle games tokenomics is designed to create solid, reliable and
            attractive ways for users to benefit from the platform.
          </Text>
          <Box mt={3}>
            <a
              target="_blank"
              rel="noopener noreferrer"
              style={{ width: "100%" }}
              href="https://axlegames.s3.ap-south-1.amazonaws.com/AxleGames_EconomicsPaper.pdf"
            >
              <NeuButton
                onClick={() => {}}
                bg={"#A34400"}
                shadow={"#FF7C1F"}
                label={`Economics Paper`}
              ></NeuButton>
            </a>
          </Box>
        </Flex>
      </Flex>
      <Flex
        display={{ base: "flex" }}
        rowGap={{ base: "1rem" }}
        alignItems={"center"}
        flexDirection={{ base: "row" }}
        justifyContent={{ base: "center" }}
      >
        {socials.map((i, x) => (
          <Image
            key={i}
            data-aos={`zoom-in`}
            height={{ base: "12", lg: "20" }}
            width={{ base: "12", lg: "20" }}
            _hover={{
              transform: "scale(1.1)",
              transition: "all 200ms ease-in",
              cursor: "pointer",
            }}
            src={i}
          />
        ))}
      </Flex>
    </Box>
  );
};

export default WhitePaper;
