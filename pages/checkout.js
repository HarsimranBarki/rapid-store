import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@chakra-ui/breadcrumb";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { ArrowForwardIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Input } from "@chakra-ui/input";
import {
  Box,
  Divider,
  Flex,
  Grid,
  Heading,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/layout";
import { Select } from "@chakra-ui/select";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/tabs";
import React, { useEffect, useState } from "react";
import commerce from "@/lib/commerce";
import { useCheckoutDispatch, useCheckoutState } from "@/context/checkout";
import { useCartDispatch, useCartState } from "@/context/cart";
import { chakra } from "@chakra-ui/system";
import { Button } from "@chakra-ui/button";
import Link from "next/link";
import Shipping from "@/components/Shipping/Shipping";
import { Spinner } from "@chakra-ui/spinner";
import { useForm } from "react-hook-form";
import Payment from "@/components/Shipping/Payment";
import { AnimatePresence, motion } from "framer-motion";
import OrderTotal from "@/components/Shipping/OrderTotal";
import Success from "@/components/Shipping/Success";
import { useRouter } from "next/router";

function checkout() {
  const [countries, setCountries] = useState();
  const [subdivisions, setSubdivisions] = useState();
  const { line_items, subtotal, total_unique_items } = useCartState();
  const { getCart } = useCartDispatch();
  const [checkoutId, setCheckoutId] = useState();
  const [shippigOptions, setShippingOptions] = useState();
  const [checkoutToken, setCheckoutToken] = useState();
  const [currentStep, setCurrentStep] = useState("shipping");
  const [shippingData, setShippingData] = useState();
  const router = useRouter();

  if (currentStep == "success") {
    router.push("/success");
  }
  useEffect(() => {
    getCartInfo();
    fetchCountries(checkoutId);
    fetchSubdivisions(checkoutId, "AF");
    shippingOption(checkoutId, "AF");
  }, []);

  const fetchSubdivisions = async (countryCode) => {
    try {
      const res = await commerce.services.localeListSubdivisions(countryCode);
      console.log(res);
      let lol = Object.entries(res.subdivisions).map(reducer);
      setSubdivisions(res.html);
    } catch (err) {
      // noop
    }
  };
  const reducer = ([code, name]) => ({
    value: code,
    label: name,
  });
  const fetchCountries = async (checkoutId) => {
    try {
      const { countries } = await commerce.services.localeListCountries(
        checkoutId
      );
      let res = Object.entries(countries).map(reducer);
      setCountries(res);
    } catch (err) {
      // noop
    }
  };

  const shippingOption = async (checkoutId, country, region = null) => {
    try {
      const options = await commerce.checkout.getShippingOptions(checkoutId, {
        country: "US",
        region: "CA",
      });
      setShippingOptions(options);
    } catch (err) {}
  };

  const setShippingValue = (checkoutId, country, region = null) => {
    fetchSubdivisions(country);
    shippingOption(checkoutId, country, region);
  };

  const getCartInfo = async () => {
    const cart = await commerce.cart.retrieve();
    const res = await commerce.checkout.generateToken(cart.id, {
      type: "cart",
    });
    setCheckoutToken(res);
    setCheckoutId(res.id);
  };

  if (!checkoutId) {
    return (
      <Grid height="sm" placeItems="center">
        <Spinner />
      </Grid>
    );
  }

  return (
    <Box width="80vw" mx="auto" my={10}>
      <Flex justifyContent="space-between">
        <Box>
          <Heading textAlign="left">Checkout</Heading>
          <Box mt={10} w="xl">
            <Breadcrumb
              spacing="15px"
              fontSize="xl"
              separator={<ChevronRightIcon color="gray.500" />}
            >
              <BreadcrumbItem>
                <BreadcrumbLink
                  textColor={
                    currentStep !== "shipping" ? "gray.400" : "gray.900"
                  }
                  href="#"
                >
                  Shipping
                </BreadcrumbLink>
              </BreadcrumbItem>

              <BreadcrumbItem>
                <BreadcrumbLink
                  textColor={
                    currentStep !== "payment" ? "gray.400" : "gray.900"
                  }
                  href="#"
                >
                  Payment
                </BreadcrumbLink>
              </BreadcrumbItem>
            </Breadcrumb>
          </Box>
          <AnimatePresence>
            {currentStep == "shipping" && (
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{
                  x: 0,
                  opacity: 1,
                  transition: {
                    duration: 0.5,
                  },
                }}
                exit={{ x: 20, opacity: 0 }}
              >
                <Shipping
                  fetchSubdivisions={fetchSubdivisions}
                  countries={countries}
                  checkoutId={checkoutId}
                  subdivisions={subdivisions}
                  setShippingData={setShippingData}
                  setShippingValue={setShippingValue}
                  setCurrentStep={setCurrentStep}
                />
              </motion.div>
            )}
          </AnimatePresence>
          <AnimatePresence>
            {currentStep == "payment" && (
              <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{
                  x: 0,
                  opacity: 1,
                  transition: {
                    duration: 0.5,
                  },
                }}
                exit={{ x: -20, opacity: 0 }}
              >
                {" "}
                <Payment
                  shippingData={shippingData}
                  checkoutToken={checkoutToken}
                  setCurrentStep={setCurrentStep}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </Box>
        {currentStep == "shipping" && (
          <Box
            border="1px solid"
            borderColor="gray.200"
            height="100%"
            padding={5}
            borderTop="5px solid "
            borderTopColor="teal.600"
          >
            <Heading fontWeight="bold">Order Summary</Heading>
            <Divider my={3} />
            <OrderTotal />
          </Box>
        )}
      </Flex>

      {/*  */}
    </Box>
  );
}

export default checkout;
