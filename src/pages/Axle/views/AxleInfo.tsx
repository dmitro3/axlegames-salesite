import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { brandingColors } from "../../../config/brandingColors";
import { useEtherBalance, useEthers } from "@usedapp/core";
import {
  Box,
  Flex,
  Grid,
  Icon,
  Image,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";

import axleTokenABI from "../../../abi/AxleToken.json";
import axlePresaleABI from "../../../abi/AxlePresale.json";

import NeuButton from "../component/NeuButton";
import AxleDialog from "../dialog/AxleDialog";
import TransactionSuccessDialog from "../dialog/TransactionSuccessDialog";
import Wallet from "../component/Wallet";
import { ArrowDownIcon } from "@chakra-ui/icons";
import NFT from "./NFT";

declare global {
  interface Window {
    ethereum: any;
  }
}

const AxleInfo = () => {
  const [bnb, setBnb] = useState<any>();
  const [axle, setAxle] = useState<any>(0);
  const [address, setAddress] = useState<string>("");

  const [balance, setBalance] = useState(0);
  const [axleBalance, setAxleBalance] = useState<any>("0");

  const [success, setSuccess] = useState(false);
  const [hash, setHash] = useState<string>("");

  const [openWallet, setOpenWallet] = useState(false);

  let provider: any;
  try {
    provider = new ethers.providers.Web3Provider(
      window.ethereum,
      "any"
    ) as ethers.providers.Web3Provider;
    if (provider !== null || provider !== undefined) {
      provider.on("network", (newNetwork: any, oldNetwork: any) => {
        // When a Provider makes its initial connection, it emits a "network"
        // event with a null oldNetwork along with the newNetwork. So, if the
        // oldNetwork exists, it represents a changing network
        if (oldNetwork) {
          window.location.reload();
        }
      });
    }
  } catch (error) {
    provider =
      ethers.providers.getDefaultProvider() as ethers.providers.BaseProvider;
    console.log(error);
  }

  const { activateBrowserWallet, isLoading, deactivate } = useEthers();
  const { chainId } = useEthers();
  const etherBalance = useEtherBalance(address);

  const disconnect = () => {
    setAddress("");
    deactivate();
  };

  function onBnbChange(e: any) {
    const bnb = Number(e.target.value);
    setBnb(bnb.toString());
    setAxle((bnb * 8000).toString());
  }

  useEffect(() => {
    if (provider.antNetwork) {
      const isWalletConnected = localStorage.getItem("isWalletConnected");
      if (isWalletConnected === "true") connectWallet();
      window.ethereum.on("accountsChanged", (accounts: any) => {
        if (accounts[0] !== address) connectWallet();
        if (accounts.length === 0 || accounts[0] === "") {
          localStorage.removeItem("isWalletConnected");
          window.location.reload();
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const connectWallet = async () => {
    try {
      const signer = provider.getSigner();
      if (signer._address === null) {
        await window.ethereum.request({
          method: "eth_requestAccounts",
        });
      }
      const address = await signer.getAddress();
      const token = new ethers.Contract(
        TOKEN_CONTRACT_ADDRESS,
        axleTokenABI.abi,
        signer
      );
      if (token !== null) {
        const a: number =
          Number(ethers.utils.formatEther(await token.balanceOf(address))) || 0;
        setAddress(address);
        setAxleBalance(a);
        localStorage.setItem("isWalletConnected", "true");
      }
    } catch (error: any) {
      window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: "0x61",
            rpcUrls: ["https://data-seed-prebsc-1-s1.binance.org:8545"],
            chainName: "BSC Testnet",
            nativeCurrency: {
              symbol: "BNB",
              decimals: 18,
            },
            blockExplorerUrls: ["https://testnet.bscscan.com/"],
          },
        ],
      });
    }
  };

  const TOKEN_CONTRACT_ADDRESS = "0x0Fffe22810EA0BB3463D2b8afCEBCB7F462B95a1";
  const PRESALE_CONTRACT_ADDRESS = "0x5512b66bB0e6e80348092E2a030e2a2f1D7bf4fd";

  const toast = useToast();

  function buyAxle() {
    (async () => {
      if (address === "") activateBrowserWallet();
      if (chainId !== 97)
        return toast({
          title: "Warning",
          description: "Connect to BSC Testnet, chain id 97",
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: "top",
        });

      if (bnb < 0.1)
        return toast({
          title: "Warning",
          description: "Minimum 0.1 BNB",
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: "top",
        });

      if (bnb >= 1.99)
        return toast({
          title: "Warning",
          description: "Maximum 1.99 BNB",
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: "top",
        });

      const provider = new ethers.providers.Web3Provider(
        window.ethereum as ethers.providers.ExternalProvider
      );
      const signer = provider.getSigner();
      const presale = new ethers.Contract(
        PRESALE_CONTRACT_ADDRESS,
        axlePresaleABI.abi,
        signer
      );
      console.log(presale);
      const options = { value: ethers.utils.parseEther(bnb.toString()) };
      try {
        const { hash } = await presale.buyToken(options);
        setHash(hash);
        setSuccess(true);
      } catch (err: any) {
        if (err) {
          console.log(err);
          const message = err.data.message;
          return toast({
            title: "Error",
            description: message,
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "top",
          });
        }
      }
    })();
  }

  useEffect(() => {
    const b: number = Number(
      Number(ethers.utils.formatEther(etherBalance || 0))
    );
    setBalance(b);
  }, [address, etherBalance]);

  return (
    <Box fontFamily={"quicksand"} fontWeight={"bold"}>
      <Box
        alignItems={"center"}
        flexDirection={{ base: "column", md: "row" }}
        display={"flex"}
        justifyContent={{ base: "flex-start", md: "space-between" }}
        px={12}
        mb={4}
        mt={{ base: "4", md: "0" }}
      >
        <Image
          display={{ base: "none", md: "flex" }}
          maxW="100px"
          src={`https://axlegames.s3.ap-south-1.amazonaws.com/assets/logo.png`}
        />
        <Wallet
          address={address}
          disconnect={disconnect}
          balance={balance}
          connectWallet={connectWallet}
          isLoading={isLoading}
          openWallet={openWallet}
          setOpenWallet={setOpenWallet}
        />
      </Box>

      <Box
        display={{ base: "flex", md: "none" }}
        justifyContent="center"
        m={3}
        alignItems="center"
      >
        <Image
          maxW="100px"
          src={`https://axlegames.s3.ap-south-1.amazonaws.com/assets/logo.png`}
        />
      </Box>
      <Grid
        columnGap={"5rem"}
        templateColumns={{ base: "1fr" }}
        alignItems={"center"}
        borderRadius="xl"
        width={{
          base: "100%",
          md: "90%",
          xl: "75%",
          "2xl": "65%",
        }}
        margin="auto"
      >
        <AxleDialog
          close={() => setSuccess(false)}
          children={
            <TransactionSuccessDialog
              hash={hash}
              close={() => setSuccess(false)}
              fee={axle}
            />
          }
          isOpen={success}
          key={2}
          size={"lg"}
        />

        <Box
          display={"flex"}
          flexDirection={{ base: "column", lg: "row" }}
          justifyContent="center"
          alignItems={"center"}
          rowGap={"2rem"}
          columnGap="6rem"
          m={4}
          p={5}
          width="100%"
        >
          <NFT />
          <Box
            justifyContent={"center"}
            alignSelf="center"
            display={"flex"}
            flexDirection="column"
            color={brandingColors.primaryTextColor}
            backgroundImage={`linear-gradient(to bottom, #061e37, #06223e, #072544, #07294b, #082d52, #082d52, #082d52, #082d52, #07294b, #072544, #06223e, #061e37)`}
            p={4}
            borderRadius="xl"
            width="100%"
            boxShadow={`0px 0px 6px ${brandingColors.newHighlightColor}`}
          >
            <Text fontFamily={`'Russo One', sans-serif`} pb={2} fontSize={"xl"}>
              Buy AXLE
            </Text>
            <Flex
              alignItems={"center"}
              justifyContent={"center"}
              direction={"column"}
            >
              <Box width={"100%"} borderRadius="md">
                <Box
                  display={"flex"}
                  justifyContent="center"
                  alignItems={"center"}
                  flexDirection="column"
                  rowGap={".4rem"}
                >
                  <Box
                    backgroundImage={`linear-gradient(to bottom, #061e37, #072340, #072849, #082d52, #0a325c)`}
                    boxShadow={`0px 0px 4px ${brandingColors.newHighlightColor}`}
                    p={4}
                    borderRadius="md"
                    width={"100%"}
                  >
                    <Text>You Pay</Text>
                    <Flex
                      alignItems={"center"}
                      justifyContent={"space-between"}
                      columnGap="20%"
                      bg={brandingColors.bgColor}
                      p={4}
                      my={2}
                      borderRadius="md"
                    >
                      <Flex alignItems="center" columnGap={"2rem"}>
                        <Image
                          width={8}
                          src={`https://axlegames.s3.ap-south-1.amazonaws.com/bnb.png`}
                        />
                        <Text
                          color={brandingColors.secondaryTextColor}
                          fontWeight={"bold"}
                          fontSize="xl"
                        >
                          BNB
                        </Text>
                      </Flex>
                      <Flex
                        flexDirection={"column"}
                        justifyContent={"flex-end"}
                      >
                        <Text
                          color={brandingColors.secondaryTextColor}
                          fontSize={"xs"}
                          textAlign={"right"}
                        >
                          Amount
                        </Text>
                        <Input
                          fontWeight={"bold"}
                          color={brandingColors.primaryButtonColor}
                          placeholder="value (BNB)"
                          onChange={onBnbChange}
                          fontSize="lg"
                          type={"number"}
                          textAlign="right"
                          value={bnb}
                          border="none"
                          outline={"none"}
                          _focus={{
                            outline: "none",
                            border: "none",
                            shadow: "none",
                          }}
                        ></Input>
                      </Flex>
                    </Flex>
                    <Text color={brandingColors.primaryTextColor} fontSize="sm">
                      Min 0.1 BNB | Max 2 BNB
                    </Text>
                  </Box>
                  <Box
                    display={"flex"}
                    justifyContent={"center"}
                    position={"relative"}
                  >
                    <Icon
                      bg={brandingColors.bgColor}
                      boxShadow={`0px 0px 12px ${brandingColors.fgColor}`}
                      borderRadius="10vh"
                      top={-4}
                      width={8}
                      height={8}
                      position={"absolute"}
                      as={ArrowDownIcon}
                    ></Icon>
                  </Box>

                  <Box
                    backgroundImage={`linear-gradient(to top, #061e37, #072340, #072849, #082d52, #0a325c)`}
                    boxShadow={`0px 0px 4px ${brandingColors.newHighlightColor}`}
                    p={4}
                    borderRadius="md"
                    width={"100%"}
                  >
                    <Flex justifyContent={"space-between"}>
                      <Text>You Secure</Text>
                      <Text
                        color={brandingColors.secondaryTextColor}
                        fontSize={"sm"}
                      >
                        {`Balance : ` + axleBalance + ` AXLE`}
                      </Text>
                    </Flex>
                    <Flex
                      alignItems={"center"}
                      justifyContent={"space-between"}
                      columnGap="20%"
                      bg={brandingColors.bgColor}
                      p={4}
                      my={2}
                      borderRadius="md"
                    >
                      <Flex alignItems="center" columnGap={"2rem"}>
                        <Image
                          width={10}
                          src={`https://axlegames.s3.ap-south-1.amazonaws.com/assets/icon.png`}
                        />
                        <Text
                          color={brandingColors.secondaryTextColor}
                          fontWeight={"bold"}
                          fontSize="xl"
                        >
                          AXLE
                        </Text>
                      </Flex>
                      <Flex
                        flexDirection={"column"}
                        justifyContent={"flex-end"}
                      >
                        <Text
                          color={brandingColors.primaryButtonColor}
                          textAlign={"right"}
                          fontSize="lg"
                        >
                          {axle}
                        </Text>
                      </Flex>
                    </Flex>
                    {address !== "" && axle !== undefined ? (
                      <Text
                        color={brandingColors.secondaryTwoTextColor}
                        fontSize="sm"
                        textAlign={"center"}
                      >
                        {`Bonus: +${axle * 0.25} AXLE`}
                      </Text>
                    ) : null}
                  </Box>
                  <Box
                    display={"flex"}
                    flexDirection="column"
                    width={"100%"}
                    rowGap="1rem"
                    pt={4}
                  >
                    <Input
                      fontWeight={"bold"}
                      placeholder="Referral Address (optional)"
                      outline={`2px groove ${brandingColors.newHighlightColor}`}
                      border={`none`}
                      type={"text"}
                    ></Input>
                    {address === "" ? (
                      <NeuButton
                        bg={"#A34400"}
                        shadow={"#FF7C1F"}
                        onClick={connectWallet}
                        label="Connect Wallet"
                        width="100%"
                      ></NeuButton>
                    ) : (
                      <NeuButton
                        bg={"#A34400"}
                        shadow={"#FF7C1F"}
                        onClick={buyAxle}
                        label="Buy Axle"
                        width="100%"
                      ></NeuButton>
                    )}
                  </Box>
                </Box>
              </Box>
            </Flex>
          </Box>
        </Box>
      </Grid>
    </Box>
  );
};

export default AxleInfo;

// tagline
