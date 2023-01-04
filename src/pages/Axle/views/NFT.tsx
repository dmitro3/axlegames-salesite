import { Box, Text } from "@chakra-ui/react";
import { brandingColors } from "../../../config/brandingColors";

const NFT = () => {
  const text1 = [`Z`, `E`, `U`, `S`, `-`];
  const text2 = [`S`, `A`, `L`, `E`];
  return (
    <Box
      color={brandingColors.primaryTextColor}
      p={4}
      display={"flex"}
      justifyContent={{ base: "center", md: "flex-start" }}
    >
      <Box data-aos={`fade-left`}>
        <Box
          justifyContent={"space-between"}
          display="flex"
          flexDirection="row"
        >
          <Box
            display={"flex"}
            justifyContent={"center"}
            flexDirection="column"
            backgroundImage={`linear-gradient(to top, #061e37, #002956, #003376, #003b96, #1442b5)`}
            backdropFilter={`blur(20px)`}
            borderRadius="md"
          >
            {text1.map((t, i) => (
              <Text
                textAlign="center"
                px={4}
                borderTopRadius={i === 0 ? "sm" : "0"}
                borderBottomRadius={i === text1.length - 1 ? "sm" : "0"}
                color={brandingColors.primaryButtonColor}
                fontSize="2xl"
                fontFamily={`'Russo One', sans-serif`}
                key={i}
                textShadow={`
				1px 1px 1px ${brandingColors.primaryTextColor}
				`}
              >
                {t !== "-" ? t : "‎"}
              </Text>
            ))}

            {text2.map((t, i) => (
              <Text
                textAlign="center"
                px={4}
                borderTopRadius={i === 0 ? "sm" : "0"}
                borderBottomRadius={i === text2.length - 1 ? "sm" : "0"}
                color={brandingColors.primaryButtonColor}
                fontSize="2xl"
                fontFamily={`'Russo One', sans-serif`}
                key={i}
                pt={i === 0 ? 4 : 0}
                pb={i === text2.length - 1 ? 4 : 0}
                textShadow={`
				1px 1px 1px ${brandingColors.primaryTextColor}
				`}
              >
                {t !== "-" ? t : "‎"}
              </Text>
            ))}
          </Box>
          <Box>
            <video
              muted
              loop
              width={"580px"}
              src={`https://axlegames.s3.ap-south-1.amazonaws.com/zeus.mp4`}
              autoPlay
            ></video>
          </Box>
        </Box>
        <Box
          py={3}
          my={2}
          backgroundImage={`linear-gradient(to bottom, #061e37, #002956, #003376, #003b96, #1442b5)`}
          borderBottomRadius="xl"
          boxShadow={`2xl`}
        >
          <Text
            color={brandingColors.primaryTextColor}
            fontSize={{ base: "lg", lg: "2xl" }}
            fontFamily={`'Russo One', sans-serif`}
            textAlign={"center"}
          >
            {`Header`}
          </Text>
          <Text
            color={brandingColors.secondaryTextColor}
            fontFamily={`'Russo One', sans-serif`}
            fontWeight={"normal"}
            fontSize={{ base: "sm", lg: "md" }}
            textAlign={"center"}
          >
            {`Sub`}
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

export default NFT;
