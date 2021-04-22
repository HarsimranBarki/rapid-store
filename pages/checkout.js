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

function checkout() {
  const [countries, setCountries] = useState();
  const [subdivisions, setSubdivisions] = useState();
  const { line_items, subtotal, total_unique_items } = useCartState();
  const { showCart } = useCartDispatch();

  const {
    generateToken,
    setCurrentStep,
    nextStepFrom,
    capture,
    setProcessing,
    setError: setCheckoutError,
  } = useCheckoutDispatch();

  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchSubdivisions = async (checkoutId, countryCode) => {
    try {
      const { subdivisions } = await commerce.services.localeListSubdivisions(
        countryCode
      );
      let res = Object.entries(subdivisions).map(reducer);
      setSubdivisions(res);
    } catch (err) {
      // noop
    }
  };
  const reducer = ([code, name]) => ({
    value: code,
    label: name,
  });
  const fetchCountries = async () => {
    try {
      const { countries } = await commerce.services.localeListCountries();
      let res = Object.entries(countries).map(reducer);
      setCountries(res);
    } catch (err) {
      // noop
    }
  };

  generateToken(showCart);

  return (
    <Box width="80vw" mx="auto" my={10}>
      <Flex justifyContent="space-between">
        <Box>
          {" "}
          <Heading textAlign="left">Checkout</Heading>
          <Box mt={10} w="xl">
            <Breadcrumb
              spacing="15px"
              fontSize="xl"
              separator={<ArrowForwardIcon color="gray.500" />}
            >
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Shipping</BreadcrumbLink>
              </BreadcrumbItem>

              <BreadcrumbItem>
                <BreadcrumbLink href="#">Payment</BreadcrumbLink>
              </BreadcrumbItem>
            </Breadcrumb>
            <VStack spacing={5} mt={5}>
              <HStack spacing={5} width="100%">
                <FormControl id="name">
                  <Input
                    type="text"
                    placeholder="First Name"
                    rounded="none"
                    variant="outline"
                  />
                </FormControl>
                <FormControl id="name">
                  <Input
                    type="text"
                    placeholder="Last Name"
                    rounded="none"
                    variant="outline"
                  />
                </FormControl>
              </HStack>
              <FormControl id="name">
                <Input
                  type="text"
                  placeholder="Address"
                  rounded="none"
                  variant="outline"
                />
              </FormControl>
              <FormControl id="name">
                <Input
                  variant="outline"
                  type="text"
                  placeholder="City"
                  rounded="none"
                />
              </FormControl>
              <HStack spacing={5} width="100%">
                {" "}
                <FormControl id="name">
                  <Select
                    variant="outline"
                    rounded="none"
                    onChange={(e) => fetchSubdivisions("as", e.target.value)}
                  >
                    {countries?.map((data, index) => {
                      return (
                        <option key={index} value={data.value}>
                          {data.label}
                        </option>
                      );
                    })}
                  </Select>
                </FormControl>
                <FormControl id="name">
                  <Select variant="outline" rounded="none">
                    {subdivisions?.map((data) => {
                      return <option value={data.value}>{data.label}</option>;
                    })}
                  </Select>
                </FormControl>
                <FormControl id="zip">
                  <Input
                    variant="outline"
                    type="text"
                    placeholder="Zip"
                    rounded="none"
                  />
                </FormControl>
              </HStack>
            </VStack>
          </Box>
        </Box>
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

          <VStack spacing={3} justifyContent="space-between" width="100%">
            {line_items?.map((product) => {
              return (
                <Flex
                  key={product.id}
                  width="100%"
                  fontWeight="normal"
                  fontSize="md"
                  justifyContent="space-between"
                >
                  <chakra.span textColor="gray.600" fontWeight="normal">
                    {product?.name}
                  </chakra.span>
                  <chakra.span>
                    {product?.price.formatted} x {product?.quantity}
                  </chakra.span>
                </Flex>
              );
            })}

            <Flex
              fontWeight="normal"
              width="100%"
              fontSize="md"
              justifyContent="space-between"
            >
              <chakra.span textColor="gray.600" fontWeight="normal">
                Total Items:
              </chakra.span>
              <chakra.span>{total_unique_items}</chakra.span>
            </Flex>
            <Flex
              fontWeight="normal"
              width="100%"
              fontSize="md"
              justifyContent="space-between"
            >
              <chakra.span textColor="gray.600" fontWeight="normal">
                Total Amount:
              </chakra.span>
              <chakra.span>{subtotal?.formatted_with_symbol}</chakra.span>
            </Flex>
          </VStack>
          <Link href="/checkout" passHref>
            <Button mt={5} colorScheme="teal" rounded="none" width="full">
              Pay Now
            </Button>
          </Link>
        </Box>
      </Flex>

      {/*  */}
    </Box>
  );
}

export default checkout;
