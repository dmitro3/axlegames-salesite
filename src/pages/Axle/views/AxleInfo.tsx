import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { brandingColors } from "../../../config/brandingColors";
import { useEtherBalance, useEthers } from "@usedapp/core";
import {
  Box,
  Button,
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

  const { activateBrowserWallet, isLoading } = useEthers();
  const { chainId } = useEthers();
  const etherBalance = useEtherBalance(address);

  function onBnbChange(e: any) {
    const bnb = Number(e.target.value);
    setBnb(bnb);
    setAxle(bnb * 8000);
  }

  function onAxleChange(e: any) {
    const axle = Number(e.target.value);
    setAxle(axle);
    setBnb(axle / 8000);
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
      Number(ethers.utils.formatEther(etherBalance || 0)).toFixed(2)
    );
    setBalance(b);
  }, [address, etherBalance]);

  const token = [
    {
      name: "Name",
      value: "Axle Games",
    },
    {
      name: "Ticker",
      value: "$AXLE",
    },
    {
      name: "Total supply",
      value: "500 million",
    },
    {
      name: "Type",
      value: "BEP-20",
    },
    {
      name: "Sale",
      value: "200 million",
    },
    {
      name: "Token Address",
      value: "0x942...f2E8A",
    },
  ];

  return (
    <Box fontFamily={`'Russo One', sans-serif`}>
      <Box display={"flex"} justifyContent="flex-end">
        <Box
          position="relative"
          display={"flex"}
          m={3}
          bg={brandingColors.fgColor}
          borderRadius="md"
          justifyContent={"center"}
          alignItems="center"
          columnGap={"1rem"}
          p={4}
          cursor={"pointer"}
          onClick={() => setOpenWallet(!openWallet)}
        >
          {openWallet ? (
            <Box
              onClick={() => setOpenWallet(!openWallet)}
              width={"100%"}
              bottom={"-185%"}
              zIndex={200}
              bg={brandingColors.primaryTwoTextColor}
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
                bg={brandingColors.fgColor}
                borderRadius="md"
                display={"flex"}
                justifyContent="center"
                flexDirection={"column"}
              >
                <Text color={brandingColors.primaryTwoTextColor}>
                  Your wallet balance
                </Text>
                <Text fontSize={"3xl"} color={brandingColors.primaryTextColor}>
                  {balance} BNB{" "}
                </Text>
              </Box>
              <Button mt={"1"} width={"100%"}>
                Disconnect
              </Button>
            </Box>
          ) : null}
          <Box bg={brandingColors.bgColor} p={2} borderRadius="3xl">
            <Image
              height={"32px"}
              width={"32px"}
              src={`https://axlegames.s3.ap-south-1.amazonaws.com/bnb.png`}
            />
          </Box>
          <Box>
            <Text color={brandingColors.primaryTextColor}>
              {!isLoading ? `${balance} BNB` : `...`}
            </Text>
            {address !== "" ? (
              <Flex textAlign={"center"} direction={"column"}>
                <Text
                  fontSize={"sm"}
                  color={brandingColors.primaryTwoTextColor}
                >
                  {address.substring(0, 6)}....
                  {address.substring(address.length - 6, address.length)}
                </Text>
              </Flex>
            ) : null}
          </Box>
        </Box>
      </Box>

      <Flex
        my={{ base: "4" }}
        mb={{ base: "8" }}
        direction={"column"}
        textAlign={"center"}
        fontWeight="bold"
      >
        <Text
          color={brandingColors.primaryTextColor}
          fontSize={{ base: "xl", lg: "3xl" }}
        >
          Introducing Axle Token
        </Text>
        <Text
          color={brandingColors.secondaryTextColor}
          fontSize={{ base: "lg", lg: "xl" }}
        >
          A web3 Gaming token
        </Text>
      </Flex>
      <Grid
        templateColumns={{ base: "1fr", lg: "1fr 1fr" }}
        alignItems={"center"}
        borderRadius="xl"
        fontFamily={`'Russo One', sans-serif`}
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
            bg={brandingColors.fgColor}
            borderRadius="md"
            p={{ base: "4" }}
            pt={{ base: "3" }}
            fontWeight="bold"
            width="100%"
          >
            <Box
              alignItems={"center"}
              display={"flex"}
              justifyContent="space-between"
            >
              <Text
                color={brandingColors.primaryTextColor}
                fontSize={{ base: "xl", xl: "3xl" }}
                textAlign="center"
                fontFamily={`'Russo One', sans-serif`}
              >
                Token Information
              </Text>
            </Box>
            <Divider my={4} />
            <Flex my={4} rowGap={".5rem"} direction={"column"}>
              {token.map((t, i) => (
                <Tag key={i} name={t.name} value={t.value} />
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
        >
          <Box
            top={"0"}
            left={"8%"}
            bg={brandingColors.fgColor}
            boxShadow="xl"
            pos={"absolute"}
            px={8}
            borderRadius="md"
          >
            <Text fontSize={"2xl"}>BUY $AXLE</Text>
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
              bg={brandingColors.fgColor}
              p={{ base: 4, lg: 8 }}
              borderRadius={"2vh 4vw"}
            >
              <Box
                display={"flex"}
                justifyContent="center"
                alignItems={"center"}
                flexDirection="column"
                rowGap={"1rem"}
              >
                <FormControl>
                  <FormLabel>BNB</FormLabel>
                  <Input
                    placeholder="value (BNB)"
                    onChange={onBnbChange}
                    max={1.99}
                    min={0.1}
                    type={"text"}
                    value={bnb}
                  ></Input>
                </FormControl>
                <FormControl>
                  <FormLabel>AXLE</FormLabel>
                  <Input
                    placeholder="value (AXLE)"
                    onChange={onAxleChange}
                    value={axle}
                    max={1.99}
                    min={0.1}
                    type={"text"}
                  ></Input>
                </FormControl>
                {!hasReferal ? (
                  <Text onClick={() => setHasReferral(!hasReferal)}>
                    Referral Address ?
                  </Text>
                ) : (
                  <FormControl>
                    <FormLabel>Referral</FormLabel>
                    <Input placeholder="Referral Address" type={"text"}></Input>
                  </FormControl>
                )}
                {address !== "" && axle !== undefined ? (
                  <Text
                    color={brandingColors.primaryTwoTextColor}
                  >{`you will receive ${axle * 0.25} bonus tokens`}</Text>
                ) : null}
                <Flex direction={"column"}>
                  <Text
                    fontWeight={"bold"}
                    align="center"
                    color={brandingColors.primaryTextColor}
                    fontSize="md"
                  >
                    Min 0.1 BNB | Max 2 BNB
                  </Text>
                </Flex>

                <Flex justifyContent={"center"}>
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
                </Flex>
              </Box>
            </Box>
          </Flex>

          <Box p={3} m={3} bg={brandingColors.fgColor} borderRadius="md">
            <Flex
              justifyContent={"space-evenly"}
              flexDirection={"row"}
              color={brandingColors.highLightColor}
            >
              <Flex columnGap={".5rem"} alignItems="center">
                <Text color={brandingColors.primaryTextColor} fontSize={"3xl"}>
                  {axleBalance}
                </Text>
                <Text>$AXLE in Wallet</Text>
              </Flex>
            </Flex>
          </Box>
        </Box>
      </Grid>
    </Box>
  );
};

export default AxleInfo;
