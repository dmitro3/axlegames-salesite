import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { brandingColors } from "../../../config/brandingColors";
import NeuButton from "../component/NeuButton";

const TransactionSuccessDialog = (props: any) => {
  return (
    <Box display={"flex"} py={16} px={0} flexDirection="column" rowGap={"1rem"}>
      <Flex
        direction={"column"}
        justifyContent="center"
        rowGap={"1rem"}
        alignItems={"center"}
      >
        <Image
          width={"50%"}
          src={`https://axlegames.s3.ap-south-1.amazonaws.com/assets/gamein/checked.webp`}
        />
        <Text fontSize={"xl"}>Welcome to AXLE family!</Text>{" "}
        <Text fontSize={"md"}> You purchased {props.fee} AXLE</Text>
        <a
          href={`https://testnet.bscscan.com/tx/` + props.hash}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Box
            cursor={"pointer"}
            transition={`100ms all ease-in`}
            textAlign="center"
          >
            <Text
              as="u"
              fontSize={"md"}
              color={brandingColors.primaryTextColor}
              textUnderlineOffset={"unset"}
            >
              check transaction on blockchain
            </Text>
          </Box>
        </a>
      </Flex>
      <Box mt={3}></Box>
      <Flex justifyContent={"center"}>
        <NeuButton
          bg={"#A34400"}
          shadow={"#FF7C1F"}
          onClick={props.close}
          label="Buy More"
        ></NeuButton>
      </Flex>
    </Box>
  );
};
export default TransactionSuccessDialog;
