import { ChakraProvider, theme, Flex, Box } from "@chakra-ui/react";
import { brandingColors } from "./config/brandingColors";
import AxleInfo from "./pages/Axle/views/AxleInfo";
import UtilityGrid from "./pages/Axle/views/UtilityGrid";
import WhitePaper from "./pages/Axle/views/WhitePaper";

export const App = () => (
  <ChakraProvider theme={theme}>
    <Box bg={brandingColors.bgColor}>
      <Flex
        direction={"column"}
        rowGap="1rem"
        fontFamily={"quicksand"}
        width={{ base: "100%", md: "90%", lg: "92%", xl: "80%", "2xl": "75%" }}
        margin="auto"
      >
        <AxleInfo />
        <UtilityGrid />
        <WhitePaper />
      </Flex>
    </Box>
  </ChakraProvider>
);
