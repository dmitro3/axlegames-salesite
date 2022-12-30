import { Box, Text } from "@chakra-ui/react";
import { brandingColors } from "../config/brandingColors";

const ComingSoon = () => {
  return (
    <Box
      rowGap={"2rem"}
      display={"flex"}
      flexDirection="column"
      alignItems={"center"}
      justifyContent="center"
      alignSelf={"center"}
      bg={brandingColors.bgColor}
      height="100vh"
    >
      <Box
        py={4}
        px={8}
        display={"flex"}
        flexDirection="column"
        alignItems={"center"}
        fontFamily={"'Press Start 2P', cursive"}
        fontSize={{ base: "xl", md: "5xl", lg: "7xl" }}
        color={brandingColors.primaryTwoTextColor}
        justifyContent="center"
        mt={12}
        bg={brandingColors.ternaryButtonColor}
        borderRadius={"xl"}
      >
        <Text>Coming Soon</Text>
      </Box>

      <Text
        fontFamily={"quicksand"}
        fontWeight="bold"
        fontSize={{ base: "md", md: "xl", lg: "3xl" }}
        color={brandingColors.primaryTextColor}
        textAlign="center"
        px={2}
      >
        We are preparing something exciting & amazing for you.
      </Text>
    </Box>
  );
};

export default ComingSoon;
