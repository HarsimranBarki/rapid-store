import { Button } from "@chakra-ui/button";
import { FormControl } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { HStack, Stack, VStack } from "@chakra-ui/layout";
import { Select } from "@chakra-ui/select";
import HTMLReactParser from "html-react-parser";
import React from "react";

import { useForm } from "react-hook-form";

function Shipping({
  countries,
  subdivisions,
  setShippingData,
  checkoutId,
  setCurrentStep,
  setShippingValue,
}) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    setCurrentStep("payment");
    setShippingData(data);
  };
  return (
    <VStack spacing={5} mt={5} as="form" onSubmit={handleSubmit(onSubmit)} direction={['column','row']} w='100%' >
      <Stack spacing={5} width="100%" direction={['column','row']}>
        <FormControl id="name" w='100%'>
          <Input
            type="text"
            placeholder="First Name"
            rounded="lg"
            w='100%'
            variant="outline"
            {...register("firstName", { required: true })}
          />
        </FormControl>
        <FormControl id="name">
          <Input
            type="text"
            placeholder="Last Name"
            rounded="lg"
            variant="outline"
            {...register("lastName", { required: true })}
          />
        </FormControl>
      </Stack>
      <FormControl id="name">
        <Input
          type="email"
          placeholder="Email"
          rounded="lg"
          variant="outline"
          {...register("email", { required: true })}
        />
      </FormControl>
      <FormControl id="name">
        <Input
          type="text"
          placeholder="Address"
          rounded="lg"
          variant="outline"
          {...register("address", { required: true })}
        />
      </FormControl>
      <Stack spacing={5} width="100%" direction={['column','row']}>
        {" "}
        <FormControl id="name">
          <Input
            variant="outline"
            type="text"
            placeholder="City"
            {...register("city", { required: true })}
            rounded="lg"
          />
        </FormControl>
        <FormControl id="zip">
          <Input
            variant="outline"
            type="text"
            placeholder="Zip"
            {...register("zip", { required: true })}
            rounded="lg"
          />
        </FormControl>
      </Stack>

      <HStack spacing={5} width="100%">
        <FormControl id="name">
          <Select
            variant="outline"
            {...register("shippingCountry", { required: true })}
            rounded="lg"
            onChange={(e) => setShippingValue(checkoutId, e.target.value)}
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
          <Select
            variant="outline"
            rounded="lg"
            {...register("shippingDivision", { required: true })}
          >
            {HTMLReactParser(subdivisions)}
          </Select>
        </FormControl>
      </HStack>
      <Button
        width="100%"
        type="submit"
        mt={5}
        colorScheme="teal"
        rounded="lg"
      >
        Pay Now
      </Button>
    </VStack>
  );
}

export default Shipping;
