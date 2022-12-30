import { ChakraProvider, theme, Flex, Box } from "@chakra-ui/react";
import AxleInfo from "./pages/Axle/views/AxleInfo";
import UtilityGrid from "./pages/Axle/views/UtilityGrid";
import WhitePaper from "./pages/Axle/views/WhitePaper";

export const App = () => (
  <ChakraProvider theme={theme}>
    <Box
      backgroundImage={`linear-gradient(to bottom, #061e37, #06223e, #072544, #07294b, #082d52, #082d52, #082d52, #082d52, #07294b, #072544, #06223e, #061e37)`}
    >
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
