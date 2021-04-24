import OrderTotal from "@/components/Shipping/OrderTotal";
import Payment from "@/components/Shipping/Payment";
import Shipping from "@/components/Shipping/Shipping";
import Success from "@/components/Shipping/Success";
import { useCartDispatch, useCartState } from "@/context/cart";
import commerce from "@/lib/commerce";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink
} from "@chakra-ui/breadcrumb";
import { ChevronRightIcon } from "@chakra-ui/icons";
import {
  Box,
  Divider,
  Flex,
  Grid,
  Heading
} from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/spinner";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";


function checkout() {
  const [countries, setCountries] = useState();
  const [orderRecipe, setOrderRescipt] = useState();
  const [subdivisions, setSubdivisions] = useState();
  const { line_items, subtotal, total_unique_items } = useCartState();
  const { getCart } = useCartDispatch();
  const [checkoutId, setCheckoutId] = useState();
  const [shippigOptions, setShippingOptions] = useState();
  const [checkoutToken, setCheckoutToken] = useState();
  const [currentStep, setCurrentStep] = useState("shipping");
  const [shippingData, setShippingData] = useState();
  const router = useRouter();

  useEffect(() => {
    getCartInfo();
    fetchCountries(checkoutId);
    fetchSubdivisions(checkoutId, "AF");
    shippingOption(checkoutId, "AF");
  }, []);

  const fetchSubdivisions = async (countryCode) => {
    try {
      const res = await commerce.services.localeListSubdivisions(countryCode);
 
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
      <Box minHeight='100vh'> <Grid height="sm" placeItems="center">
      <Spinner />
    </Grid></Box>
     
    );
  }

  return (
    <Box  w={['100vw','90vw','85vw']} margin='auto' my={10} minH='100vh' padding={[5,5,0]}>
      <Flex justifyContent="space-between" flexWrap='wrap' gridGap={10} >
        <Box width={['full','lg','lg']}>
          <Heading textAlign="left">Checkout</Heading>
          <Box mt={10} >
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
                w='100%'
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
                  setOrderRescipt={setOrderRescipt}
                />
              </motion.div>
            )}
          </AnimatePresence>
          <AnimatePresence>
            {currentStep == "success" && (
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
                <Success order={orderRecipe}/>
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
           width={['full','lg','lg']}
            borderTopColor="teal.600"
          >
            <Heading fontWeight="bold">Order Summary</Heading>
            <Divider my={3} />
            <OrderTotal />
          </Box>
        )}

       
      </Flex>

      
    </Box>
  );
}

export default checkout;
