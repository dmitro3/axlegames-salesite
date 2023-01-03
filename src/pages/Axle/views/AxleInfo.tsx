import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { brandingColors } from "../../../config/brandingColors";
import { useEtherBalance, useEthers } from "@usedapp/core";
import {
  Box,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  Image,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";

import axleTokenABI from "../../../abi/AxleToken.json";
import axlePresaleABI from "../../../abi/TokenPresale.json";

import Tag from "../component/Tag";
import NeuButton from "../component/NeuButton";
import AxleDialog from "../dialog/AxleDialog";
import TransactionSuccessDialog from "../dialog/TransactionSuccessDialog";
import Wallet from "../component/Wallet";

declare global {
  interface Window {
    ethereum: any;
  }
}

const AxleInfo = () => {
  const [bnb, setBnb] = useState<any>();
  const [axle, setAxle] = useState<any>();
  const [hasReferal, setHasReferral] = useState(false);
  const [address, setAddress] = useState<string>("");

  const [balance, setBalance] = useState(0);
  const [axleBalance, setAxleBalance] = useState(0);

  const [success, setSuccess] = useState(false);
  const [hash, setHash] = useState<string>("");

  const [openWallet, setOpenWallet] = useState(false);

  const provider = new ethers.providers.Web3Provider(window.ethereum, "any");

  provider.on("network", (newNetwork, oldNetwork) => {
    // When a Provider makes its initial connection, it emits a "network"
    // event with a null oldNetwork along with the newNetwork. So, if the
    // oldNetwork exists, it represents a changing network
    if (oldNetwork) {
      window.location.reload();
    }
  });

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

  function onAxleChange(e: any) {
    const axle = Number(e.target.value);
    setAxle(axle.toString());
    setBnb((axle / 8000).toString());
  }

  useEffect(() => {
    const isWalletConnected = localStorage.getItem("isWalletConnected");
    if (isWalletConnected === "true") connectWallet();
    window.ethereum.on("accountsChanged", (accounts: any) => {
      if (accounts[0] !== address) connectWallet();
      if (accounts.length === 0 || accounts[0] === "") {
        localStorage.removeItem("isWalletConnected");
        window.location.reload();
      }
    });
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

  const TOKEN_CONTRACT_ADDRESS = "0x9FE1eb84F87d83Ad87A532aD3ce034037039913B";
  const PRESALE_CONTRACT_ADDRESS = "0x39D371fdCaabAAc1a2a052acb2F36c5D19a2cD1f";

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
      const options = { value: ethers.utils.parseEther(bnb.toString()) };
      try {
        const { hash } = await presale.deposit(options);
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
    })();
  }

  useEffect(() => {
    const b: number = Number(
      Number(ethers.utils.formatEther(etherBalance || 0))
    );
    setBalance(b);
  }, [address, etherBalance]);

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
      value: "0x942...f2E8A",
      tokenValue: TOKEN_CONTRACT_ADDRESS,
      token: true,
    },
  ];

  const sale = [
    {
      name: "Sale",
      value: "600 million",
      token: false,
      tokenValue: TOKEN_CONTRACT_ADDRESS,
    },
    {
      name: "Zeus Sale",
      value: "15%",
      token: false,
    },
    {
      name: "Poseidon Sale",
      value: "25%",
      token: false,
    },
    {
      name: "Hades Sale",
      value: "10%",
      token: false,
    },
    {
      name: "Referral & Bonus",
      value: "10%",
      token: false,
    },
  ];

  return (
    <Box fontWeight={"bold"}>
      <Box
        alignItems={"center"}
        flexDirection={{ base: "column", md: "row" }}
        display={"flex"}
        justifyContent="space-between"
        mt={12}
      >
        <Image
          maxW="180px"
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
      <Grid
        columnGap={"5rem"}
        templateColumns={{ base: "1fr", lg: "1fr 1fr" }}
        alignItems={"center"}
        borderRadius="xl"
        mt={12}
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

        <Flex
          my={{ base: "8" }}
          px={{ base: "4" }}
          direction={"row"}
          textAlign={"left"}
          fontWeight="bold"
        >
          <Flex
            direction="column"
            bg={brandingColors.bgColor}
            boxShadow={`5px 5px 13px #05192d, -5px -5px 13px #072341`}
            borderRadius="md"
            py={{ base: "8" }}
            px={{ base: "4" }}
            fontWeight="bold"
            width="100%"
            justifyContent="center"
          >
            <Text
              color={brandingColors.primaryTextColor}
              fontSize={{ base: "xl", xl: "2xl" }}
              textAlign="center"
            >
              Token Information
            </Text>
            <Divider my={4} />
            <Flex my={4} rowGap={".5rem"} direction={"column"}>
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

            <Text
              color={brandingColors.primaryTextColor}
              fontSize={{ base: "xl", xl: "2xl" }}
              textAlign="center"
              mt={4}
            >
              Current Sale Information
            </Text>
            <Divider my={4} />
            <Flex my={4} rowGap={".5rem"} direction={"column"}>
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
          </Flex>
        </Flex>

        <Box
          justifyContent={"center"}
          alignSelf="center"
          display={"flex"}
          flexDirection="column"
          color={brandingColors.primaryTextColor}
          p={4}
          pos="relative"
          py={{ base: "8" }}
        >
          <Box
            top={"4"}
            left={"8%"}
            boxShadow={`5px 5px 13px #05192d, -5px -5px 13px #072341`}
            pos={"absolute"}
            px={8}
            borderRadius="md"
            bg={brandingColors.bgColor}
          >
            <Text fontSize={"2xl"}>Buy $AXLE</Text>
          </Box>
          <Flex
            display={success ? "none" : "flex"}
            alignItems={"center"}
            justifyContent={"center"}
            direction={"column"}
            rowGap="1rem"
          >
            <Box
              width={"100%"}
              bg={brandingColors.bgColor}
              boxShadow={`5px 5px 13px #05192d, -5px -5px 13px #072341`}
              p={{ base: 4, lg: 8 }}
              borderRadius={"2vh 4vw"}
              pt={8}
            >
              <Box
                display={"flex"}
                justifyContent="center"
                alignItems={"center"}
                flexDirection="column"
                rowGap={"1rem"}
              >
                <FormControl
                  display={"grid"}
                  gridTemplateColumns="1fr 4fr"
                  alignItems="center"
                  columnGap={"2rem"}
                >
                  <FormLabel fontWeight={"bold"}>BNB</FormLabel>
                  <Box>
                    <Text
                      px={2}
                      py={1}
                      fontSize={"x-small"}
                      color={brandingColors.primaryTextColor}
                    >
                      Min 0.1 BNB | Max 2 BNB
                    </Text>
                    <Input
                      fontWeight={"bold"}
                      placeholder="value (BNB)"
                      onChange={onBnbChange}
                      type={"number"}
                      value={bnb}
                    ></Input>
                  </Box>
                </FormControl>
                <FormControl
                  display={"grid"}
                  gridTemplateColumns="1fr 4fr"
                  alignItems="center"
                  columnGap={"2rem"}
                >
                  <FormLabel fontWeight={"bold"}>AXLE</FormLabel>
                  <Input
                    fontWeight={"bold"}
                    placeholder="value (AXLE)"
                    onChange={onAxleChange}
                    value={axle}
                    type={"number"}
                  ></Input>
                </FormControl>
                {!hasReferal ? null : (
                  <FormControl
                    display={"grid"}
                    gridTemplateColumns="1fr 4fr"
                    alignItems="center"
                    columnGap={"2rem"}
                  >
                    <FormLabel fontWeight={"bold"}>
                      <Text>Referral</Text>
                      <Text fontSize={"xx-small"}>(Optional)</Text>
                    </FormLabel>
                    <Input
                      fontWeight={"bold"}
                      placeholder="Referral Address"
                      type={"text"}
                    ></Input>
                  </FormControl>
                )}
                <Box>
                  {!hasReferal ? (
                    <Text
                      color={brandingColors.secondaryTextColor}
                      fontSize="sm"
                      cursor={"pointer"}
                      onClick={() => setHasReferral(!hasReferal)}
                    >
                      Have Referral Address?
                    </Text>
                  ) : null}
                  {address !== "" && axle !== undefined ? (
                    <Text
                      fontSize={"sm"}
                      color={brandingColors.secondaryTwoTextColor}
                    >{`you will receive ${axle * 0.25} bonus tokens`}</Text>
                  ) : null}
                </Box>
                {address === "" ? (
                  <NeuButton
                    bg={"#A34400"}
                    shadow={"#FF7C1F"}
                    onClick={connectWallet}
                    label="Connect Wallet"
                  ></NeuButton>
                ) : (
                  <NeuButton
                    bg={"#A34400"}
                    shadow={"#FF7C1F"}
                    onClick={buyAxle}
                    label="Buy Axle"
                  ></NeuButton>
                )}
              </Box>
            </Box>
          </Flex>

          <Box
            p={3}
            m={3}
            bg={brandingColors.bgColor}
            boxShadow={`5px 5px 13px #05192d, -5px -5px 13px #072341`}
            borderRadius="md"
          >
            <Text
              color={brandingColors.secondaryTextColor}
              textAlign={"center"}
            >
              {axleBalance} $AXLE in Wallet
            </Text>
          </Box>
        </Box>
      </Grid>
    </Box>
  );
};

export default AxleInfo;
