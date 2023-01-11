import {
  Box,
  Grid,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { brandingColors } from "../config/brandingColors";
import NeuButton from "../pages/Axle/component/NeuButton";
import BNB from "./bnb.png";
import CB from "./coinbase.svg";
import MM from "./metamask.svg";
import TWT from "./twt.svg";

interface Props {
  isOpen: boolean;
  close: Function;
}

const ConnectWalletModal = (props: Props) => {
  return (
    <Modal size={"lg"} isOpen={props.isOpen} onClose={() => props.close()}>
      <ModalOverlay />
      <ModalContent
        bg={brandingColors.bgColor}
        color={brandingColors.secondaryTextColor}
        fontFamily={"quicksand"}
        fontWeight={"bold"}
      >
        <ModalHeader>Connect Wallet</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box>
            <Text>Start by connecting with one of the wallets below.</Text>
            <Text>
              Be sure to store your private keys or seed pharses Securely.
            </Text>
            <Text>Never share them with anyone.</Text>
          </Box>
          <Grid
            justifyContent="center"
            alignItems={"center"}
            flexDirection="column"
            rowGap={"3rem"}
            p={4}
            gridTemplateColumns={"1fr 1fr"}
          >
            <Box
              display={"flex"}
              alignItems="center"
              justifyContent={"center"}
              flexDirection="column"
            >
              <Image width="12" src={MM} />
              <Text>Metamask</Text>
            </Box>
            <Box
              display={"flex"}
              alignItems="center"
              justifyContent={"center"}
              flexDirection="column"
            >
              <Image width="12" src={TWT} />
              <Text>Trust Wallet</Text>
            </Box>

            <Box
              display={"flex"}
              alignItems="center"
              justifyContent={"center"}
              flexDirection="column"
            >
              <Image width="12" src={BNB} />
              <Text>Binance Wallet</Text>
            </Box>
            <Box
              display={"flex"}
              alignItems="center"
              justifyContent={"center"}
              flexDirection="column"
            >
              <Image width="12" src={CB} />
              <Text>Coinbase Wallet</Text>
            </Box>
          </Grid>
        </ModalBody>

        <ModalFooter>
          <NeuButton
            bg={"#A34400"}
            shadow={"#FF7C1F"}
            onClick={() => props.close()}
            label="Close"
          ></NeuButton>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ConnectWalletModal;
