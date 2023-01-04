import { Box, Flex, Text, useToast } from "@chakra-ui/react";
import { brandingColors } from "../../../config/brandingColors";
import { CopyIcon } from "@chakra-ui/icons";

const Tag = (props: any) => {
  const toast = useToast();
  const copy = () => {
    navigator.clipboard.writeText(props.tokenValue);
    return toast({
      title: "Copied",
      description: props.tokenValue,
      status: "info",
      duration: 5000,
      isClosable: true,
      position: "top",
    });
  };
  return (
    <Box>
      {!props.token ? (
        <Flex
          direction={"row"}
          justifyContent="space-between"
          alignItems={"center"}
          columnGap={{ base: "1rem" }}
          fontSize={{ xl: "md" }}
          boxShadow={`-2px 2px 1px ${brandingColors.primaryTwoTextColor}`}
          p={2}
          borderRadius="lg"
        >
          <Text
            fontSize={{ base: "sm", md: "md" }}
            color={brandingColors.primaryTwoTextColor}
          >
            {props.name}
          </Text>
          <Text
            fontSize={{ base: "sm", md: "md" }}
            color={brandingColors.secondaryTextColor}
          >
            {props.value}
          </Text>
        </Flex>
      ) : (
        <Flex
          direction={"row"}
          justifyContent="space-between"
          alignItems={"center"}
          columnGap={{ base: "1rem" }}
          fontSize={{ xl: "md" }}
          boxShadow={`-2px 2px 1px ${brandingColors.primaryTwoTextColor}`}
          p={2}
          borderRadius="lg"
        >
          <Text color={brandingColors.primaryTwoTextColor}>{props.name}</Text>
          <Flex alignItems="center" columnGap={"1rem"}>
            <CopyIcon
              cursor={"pointer"}
              color={brandingColors.primaryTextColor}
              onClick={copy}
            />
            <Text color={brandingColors.secondaryTextColor}>{props.value}</Text>
          </Flex>
        </Flex>
      )}
    </Box>
  );
};

export default Tag;
