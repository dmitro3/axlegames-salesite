import { ChakraProvider, theme, Flex } from "@chakra-ui/react";
import { brandingColors } from "./config/brandingColors";
import AxleInfo from "./pages/Axle/views/AxleInfo";
import UtilityGrid from "./pages/Axle/views/UtilityGrid";
import WhitePaper from "./pages/Axle/views/WhitePaper";

export const App = () => (
  <ChakraProvider theme={theme}>
    <Flex
      direction={"column"}
      rowGap="1rem"
      fontFamily={"quicksand"}
      bg={brandingColors.bgColor}
    >
      <AxleInfo />
      <UtilityGrid />
      <WhitePaper />
    </Flex>
  </ChakraProvider>
);
