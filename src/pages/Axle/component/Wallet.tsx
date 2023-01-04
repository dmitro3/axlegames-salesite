import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import { brandingColors } from "../../../config/brandingColors";
import NeuButton from "./NeuButton";

import Tilt from "react-parallax-tilt";

const socials = [
  `https://axlegames.s3.ap-south-1.amazonaws.com/assets/main/telegram.webp`,
  `https://axlegames.s3.ap-south-1.amazonaws.com/assets/main/twitter.webp`,
  `https://axlegames.s3.ap-south-1.amazonaws.com/assets/main/instagram.webp`,
  `https://axlegames.s3.ap-south-1.amazonaws.com/assets/main/discord.webp`,
  `https://axlegames.s3.ap-south-1.amazonaws.com/assets/main/medium.webp`,
];
interface Props {
  connectWallet: Function;
  openWallet: boolean;
  address: string;
  balance: any;
  isLoading: boolean;
  setOpenWallet: Function;
  disconnect: Function;
}

const Wallet = (props: Props) => {
  const DropDown = () => {
    return (
      <Box>
        {props.openWallet ? (
          <Box
            onClick={() => props.setOpenWallet(!props.openWallet)}
            width={"100%"}
            bottom={"-255%"}
            zIndex={200}
            bg={brandingColors.newHighlightColor}
            position="absolute"
            display={"flex"}
            flexDirection="column"
            alignItems={"center"}
            borderRadius="md"
            justifyContent="center"
            minH={"90px"}
            p={1}
          >
            <Box
              width={"100%"}
              height="90px"
              textAlign="center"
              backgroundImage={`linear-gradient(to bottom, #061e37, #06223e, #072544, #07294b, #082d52, #082d52, #082d52, #082d52, #07294b, #072544, #06223e, #061e37)`}
              borderRadius="md"
              display={"flex"}
              justifyContent="center"
              flexDirection={"column"}
            >
              <Text color={brandingColors.secondaryTextColor}>
                Your wallet balance
              </Text>
              <Text fontSize={"xl"} color={brandingColors.secondaryTextColor}>
                {props.balance} BNB{" "}
              </Text>
            </Box>
            <Button
              fontFamily={`'Russo One', sans-serif`}
              fontWeight={"bold"}
              _hover={{
                bg: brandingColors.fgColor,
              }}
              bg={brandingColors.bgColor}
              color={brandingColors.secondaryTextColor}
              mt={"1"}
              width={"100%"}
              onClick={() => props.disconnect()}
            >
              Disconnect
            </Button>
          </Box>
        ) : null}
      </Box>
    );
  };

  return (
    <Box columnGap={"2rem"} display={"flex"} minW="64px">
      <Flex
        my={3}
        display={{ base: "flex" }}
        rowGap={{ base: "1rem" }}
        alignItems={"center"}
        justifyContent={{ base: "center" }}
        flexDirection={{ base: "row" }}
        columnGap="1rem"
      >
        <Flex alignItems={"center"} columnGap={"1rem"}>
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
              label={`Pitch Deck`}
            ></NeuButton>
          </a>
        </Flex>
        <Flex>
          {socials.map((i, x) => (
            <Box cursor={"pointer"}>
              <Tilt>
                <Image
                  key={i}
                  data-aos={`zoom-in`}
                  height={{ base: "12" }}
                  width={{ base: "12" }}
                  src={i}
                />
              </Tilt>
            </Box>
          ))}
        </Flex>
      </Flex>
      {props.address !== "" ? (
        <Box
          position="relative"
          display={{ base: "none", md: "flex" }}
          bg={brandingColors.fgColor}
          my={4}
          borderRadius="md"
          columnGap={"1rem"}
          cursor={"pointer"}
          py={2}
          onClick={() => props.setOpenWallet(!props.openWallet)}
        >
          <DropDown />
          <Box display={"flex"} alignItems="center">
            <Image
              bg={brandingColors.bgColor}
              p={2}
              borderRadius="3xl"
              width={"42px"}
              src={`https://axlegames.s3.ap-south-1.amazonaws.com/bnb.png`}
            />
          </Box>

          <Box pr={4}>
            <Text fontSize={"md"} color={brandingColors.secondaryTextColor}>
              {!props.isLoading ? `${props.balance} BNB` : `...`}
            </Text>
            {props.address !== "" ? (
              <Flex
                color={brandingColors.secondaryTextColor}
                direction={"column"}
              >
                <Text fontSize={"xs"}>
                  {props.address.substring(0, 8)}....
                  {props.address.substring(
                    props.address.length - 8,
                    props.address.length
                  )}
                </Text>
              </Flex>
            ) : null}
          </Box>
        </Box>
      ) : (
        <Box m={5}>
          <NeuButton
            bg={"#A34400"}
            shadow={"#FF7C1F"}
            onClick={props.connectWallet}
            label="Connect Wallet"
          ></NeuButton>
        </Box>
      )}
    </Box>
  );
};

export default Wallet;
