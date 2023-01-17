import Tag from "../component/Tag";
import creds from "../../../abi/creds";
import { brandingColors } from "../../../config/brandingColors";
import { Box, Flex, Text } from "@chakra-ui/react";

const TOKEN_CONTRACT_ADDRESS = creds.AXLE_CONTRACT;

const token = [
  {
    name: "Name",
    value: "Axle Games",
    token: false,
  },
  {
    name: "Ticker",
    value: "$AXLE",
    token: false,
  },
  {
    name: "Total supply",
    value: "1 billion",
    token: false,
  },
  {
    name: "Type",
    value: "BEP-20",
    token: false,
  },
  {
    name: "Token Address",
    value: `${TOKEN_CONTRACT_ADDRESS.substring(
      0,
      4
    )}....${TOKEN_CONTRACT_ADDRESS.substring(
      TOKEN_CONTRACT_ADDRESS.length - 5,
      TOKEN_CONTRACT_ADDRESS.length
    )}`,
    tokenValue: TOKEN_CONTRACT_ADDRESS,
    token: true,
  },
];

const sale = [
  {
    name: "Sale type",
    value: "Zeus",
    tokenValue: TOKEN_CONTRACT_ADDRESS,
  },
  {
    name: "Available for sale",
    value: "150 million",
    token: false,
  },
  {
    name: "Price",
    value: "1 BNB = 75,000 $AXLE",
    token: false,
  },
  {
    name: "Bonus",
    value: "25%",
    token: false,
  },
  {
    name: "Referral",
    value: "5%",
    token: false,
  },
];

const Token = () => {
  return (
    <Flex
      my={{ base: "16" }}
      direction={"row"}
      textAlign={"left"}
      fontWeight="bold"
    >
      <Flex
        direction="row"
        fontWeight="bold"
        width="100%"
        justifyContent="space-evenly"
        columnGap={"2rem"}
        flexDirection={{ base: "column", lg: "row" }}
        alignItems={"center"}
        rowGap="1rem"
        p={{ base: "2", lg: "4" }}
      >
        <Box width="100%">
          <Text
            color={brandingColors.primaryTextColor}
            fontSize={{ base: "xl", xl: "2xl" }}
            textAlign="center"
            data-aos={`zoom-in`}
            fontFamily={`'Russo One', sans-serif`}
          >
            Token Information
          </Text>
          <Flex
            backgroundImage={`linear-gradient(to right, #061e37, #002956, #003376, #003b96, #1442b5)`}
            my={4}
            rowGap={".5rem"}
            direction={"column"}
            py={{ base: "3" }}
            px={{ base: "3" }}
            boxShadow="xl"
            borderRadius="md"
            data-aos={`fade-left`}
          >
            {token.map((t, i) => (
              <Tag
                key={i}
                tokenValue={t.tokenValue}
                token={t.token}
                name={t.name}
                value={t.value}
              />
            ))}
          </Flex>
        </Box>
        <Box width="100%">
          <Text
            color={brandingColors.primaryTextColor}
            fontSize={{ base: "xl", xl: "2xl" }}
            textAlign="center"
            data-aos={`zoom-in`}
            fontFamily={`'Russo One', sans-serif`}
          >
            Current Sale Information
          </Text>
          <Flex
            backgroundImage={`linear-gradient(to left, #061e37, #002956, #003376, #003b96, #1442b5)`}
            my={4}
            rowGap={".5rem"}
            direction={"column"}
            py={{ base: "3" }}
            px={{ base: "3" }}
            boxShadow="xl"
            borderRadius="md"
            data-aos={`fade-right`}
          >
            {sale.map((t, i) => (
              <Tag
                key={i}
                tokenValue={t.tokenValue}
                token={t.token}
                name={t.name}
                value={t.value}
              />
            ))}
          </Flex>
        </Box>
      </Flex>
    </Flex>
  );
};

export default Token;
