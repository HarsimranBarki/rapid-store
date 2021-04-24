import { Box, Flex, Text } from "@chakra-ui/layout";
import { Select } from "@chakra-ui/select";
import React from "react";

export const SearchBar = ({ categories }) => {
  return (
    <Box width="80vw" margin="auto">
      <Flex
        padding={3}
        border="1px solid"
        borderColor="gray.200"
        justifyContent="space-between"
        borderTop="5px solid "
        borderTopColor="teal.600"
      >
        <Box>
          <Text fontWeight="light" fontSize="xl">
            Brand
          </Text>
          <Select w="sm" variant="flushed" rounded="lg">
            {categories.map((cat) => {
              return <option>{cat.name}</option>;
            })}
          </Select>
        </Box>
        <Box>
          <Text fontWeight="light" fontSize="xl">
            Price
          </Text>
          <Select w="sm" variant="flushed" rounded="lg">
            {categories.map((cat) => {
              return <option>{cat.name}</option>;
            })}
          </Select>
        </Box>
        <Box>
          <Text fontWeight="light" fontSize="xl">
            Filter
          </Text>
          <Select w="sm" variant="flushed" rounded="lg">
            {categories.map((cat) => {
              return <option>{cat.name}</option>;
            })}
          </Select>
        </Box>
      </Flex>
    </Box>
  );
};
