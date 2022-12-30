import { Flex, Text } from "@chakra-ui/react";
import { brandingColors } from "../../../config/brandingColors";

const Tag = (props: any) => {
  return (
    <Flex
      direction={"row"}
      justifyContent="space-between"
      alignItems={"center"}
      columnGap={{ base: "3rem" }}
      fontSize={{ xl: "md" }}
      boxShadow={`-2px 2px 1px ${brandingColors.primaryTwoTextColor}`}
      p={2}
      borderRadius="lg"
    >
      <Text color={brandingColors.primaryTwoTextColor}>{props.name}</Text>
      <Text color={brandingColors.secondaryTextColor}>{props.value}</Text>
    </Flex>
  );
};

export default Tag;
