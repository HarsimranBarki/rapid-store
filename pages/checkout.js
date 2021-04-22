import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@chakra-ui/breadcrumb";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { ArrowForwardIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Input } from "@chakra-ui/input";
import { Box, Flex, Heading, HStack, Text, VStack } from "@chakra-ui/layout";
import { Select } from "@chakra-ui/select";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/tabs";
import React, { useEffect, useState } from "react";
import commerce from "@/lib/commerce";
import { useCheckoutDispatch } from "@/context/checkout";

function checkout() {
  const [countries, setCountries] = useState();
  const [subdivisions, setSubdivisions] = useState();
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
    generateToken();
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

  return (
    <Box width="80vw" mx="auto" my={10}>
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

          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink href="#">Contact</BreadcrumbLink>
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
  );
}

export default checkout;
