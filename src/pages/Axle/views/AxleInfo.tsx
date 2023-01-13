import { useEffect, useState } from "react";
import { brandingColors } from "../../../config/brandingColors";
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

import Web3Modal from "web3modal";

import NFT from "./NFT";
import NeuButton from "../component/NeuButton";
import AxleDialog from "../dialog/AxleDialog";
import Wallet from "../component/Wallet";
import TransactionSuccessDialog from "../dialog/TransactionSuccessDialog";

import { ethers } from "ethers";
import { ArrowDownIcon, CopyIcon } from "@chakra-ui/icons";
import CoinbaseWalletSDK from "@coinbase/wallet-sdk";
import WalletConnectProvider from "@walletconnect/web3-provider";

declare global {
  interface Window {
    ethereum: any;
  }
}

const AxleInfo = () => {
  const web3Modal = new Web3Modal({
    network: "rinkeby",
    theme: "dark",
    cacheProvider: false,
    providerOptions: {
      binancechainwallet: {
        package: true,
      },
      walletconnect: {
        package: WalletConnectProvider, // required
        options: {
          infuraId: process.env.INFURA_ID, // required
        },
      },
      coinbasewallet: {
        package: CoinbaseWalletSDK, // Required
        options: {
          appName: "COINBASE", // Required
          infuraId: process.env.INFURA_ID, // Required
        },
      },
    },
  });

  const [tokenContract, setTokenContract] = useState<any>();
  const [presaleContract, setPresaleContract] = useState<any>();
  const [provider, setProvider] = useState<any>();

  const disconnectWeb3Modal = async () => {
    await web3Modal.clearCachedProvider();
    window.location.reload();
  };

  function onBnbChange(e: any) {
    const bnb = Number(e.target.value);
    setBnb(bnb.toString());
    setAxle((bnb * 75000).toString());
  }

  const confirmRefAddress = async () => {
    const details = await presaleContract.addReferAddress(refAddress);
    console.log(details);
    alert(details);
  };

  const buyAxle = async () => {
    if (bnb < 0.2)
      return toast({
        title: "Warning",
        description: "Minimum 0.2 BNB",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });

    if (bnb >= 51)
      return toast({
        title: "Warning",
        description: "Maximum 50 BNB",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    const options = { value: ethers.utils.parseEther(bnb.toString()) };
    try {
      const { hash } = await presaleContract.buyToken(options);
      setHash(hash);
      setSuccess(true);
    } catch (err: any) {
      if (err) {
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
  };

  const connectWeb3Wallet = async () => {
    try {
      const web3Provider = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(web3Provider);
      const web3Accounts = await provider.listAccounts();
      setAddress(web3Accounts[0]);
      const network = await provider.getNetwork();
      console.log(network);
      let bnbBal: any = await provider.getBalance(web3Accounts[0]);
      bnbBal = Number(ethers.utils.formatEther(bnbBal));
      setBalance(bnbBal);
      const signer = provider.getSigner();
      const token = new ethers.Contract(
        TOKEN_CONTRACT_ADDRESS,
        axleTokenABI,
        signer
      );
      const presale = new ethers.Contract(
        PRESALE_CONTRACT_ADDRESS,
        axlePresaleABI,
        signer
      );
      setProvider(provider);
      setTokenContract(token);
      setPresaleContract(presale);
      let bal = await token.balanceOf(web3Accounts[0]);
      bal = ethers.utils.formatEther(bal);
      setAxleBalance(bal);
      localStorage.setItem("isWalletConnected", "true");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log(tokenContract);
    console.log(presaleContract);
    console.log(provider);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [bnb, setBnb] = useState<any>();
  const [axle, setAxle] = useState<any>(0);
  const [balance, setBalance] = useState(0);
  const [axleBalance, setAxleBalance] = useState<any>("0");
  const [success, setSuccess] = useState(false);
  const [hash, setHash] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [openWallet, setOpenWallet] = useState(false);

  const TOKEN_CONTRACT_ADDRESS = "0x7c56C79a454CBFaf63BAdb39f82555109a2A80Bf";
  const PRESALE_CONTRACT_ADDRESS = "0xeA29a0f11EaAF0f88DBf705b2b53A09767cDF305";

  const toast = useToast();

  const [refAddress, setRefAddress] = useState("");

  const updateReferralAddress = (address: string) => setRefAddress(address);

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
          disconnect={disconnectWeb3Modal}
          balance={balance}
          connectWallet={connectWeb3Wallet}
          isLoading={false}
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
              close={async () => {
                setSuccess(false);
              }}
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
          m={{ base: "0", md: "4" }}
          p={{ base: "0", md: "4" }}
          width="100%"
        >
          <NFT />
          <Box width="100%">
            <Box
              justifyContent={"center"}
              alignSelf="center"
              display={"flex"}
              flexDirection="column"
              color={brandingColors.primaryTextColor}
              backgroundImage={`linear-gradient(to bottom, #061e37, #06223e, #072544, #07294b, #082d52, #082d52, #082d52, #082d52, #07294b, #072544, #06223e, #061e37)`}
              p={4}
              borderTopRadius="xl"
              boxShadow={`0px 0px 6px ${brandingColors.newHighlightColor}`}
            >
              <Text
                fontFamily={`'Russo One', sans-serif`}
                pb={2}
                fontSize={"xl"}
              >
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
                      <Text
                        color={brandingColors.primaryTextColor}
                        fontSize="sm"
                      >
                        Min 0.2 BNB | Max 50 BNB
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
                          {`Balance : ` + axleBalance * 10 ** 9 + ` AXLE`}
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
                        outline={`1px solid ${brandingColors.bgColor}`}
                        bg={brandingColors.fgColor}
                        border={`none`}
                        type={"text"}
                        onChange={(s) => updateReferralAddress(s.target.value)}
                      ></Input>
                      {refAddress !== "" ? (
                        <NeuButton
                          bg={"#A34400"}
                          shadow={"#FF7C1F"}
                          onClick={() => confirmRefAddress()}
                          label="Add Referrer Address"
                          width="100%"
                        ></NeuButton>
                      ) : null}

                      {address === "" ? (
                        <NeuButton
                          bg={"#A34400"}
                          shadow={"#FF7C1F"}
                          onClick={() => connectWeb3Wallet()}
                          label="Connect Wallet"
                          width="100%"
                        ></NeuButton>
                      ) : (
                        <NeuButton
                          bg={"#A34400"}
                          shadow={"#FF7C1F"}
                          onClick={() => buyAxle()}
                          label="Buy Axle"
                          width="100%"
                        ></NeuButton>
                      )}
                    </Box>
                  </Box>
                </Box>
              </Flex>
            </Box>

            {address !== "" ? (
              <Box
                py={3}
                my={2}
                backgroundImage={`linear-gradient(to bottom, #061e37, #002956, #003376, #003b96, #1442b5)`}
                borderBottomRadius="xl"
                boxShadow={`2xl`}
              >
                <Text
                  color={brandingColors.primaryTextColor}
                  fontSize={{ base: "lg", lg: "2xl" }}
                  fontFamily={`'Russo One', sans-serif`}
                  textAlign={"center"}
                >
                  Your Referral Address
                </Text>
                <Text
                  color={brandingColors.secondaryTextColor}
                  fontFamily={`'Russo One', sans-serif`}
                  fontWeight={"normal"}
                  fontSize={{ base: "sm", lg: "md" }}
                  textAlign={"center"}
                >
                  {address}
                  <CopyIcon
                    mx={2}
                    cursor={"pointer"}
                    onClick={() => {
                      navigator.clipboard.writeText(address);
                      return toast({
                        title: "Copied",
                        description: address,
                        status: "success",
                        duration: 5000,
                        isClosable: true,
                        position: "top",
                      });
                    }}
                    color={brandingColors.secondaryTextColor}
                  />
                </Text>
              </Box>
            ) : null}
          </Box>
        </Box>
      </Grid>
    </Box>
  );
};

export default AxleInfo;

// tagline
