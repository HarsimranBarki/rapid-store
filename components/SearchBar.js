import { Box, Flex, Text } from "@chakra-ui/layout";
import { Select } from "@chakra-ui/select";
import React from "react";

export const SearchBar = ({ categories }) => {
  console.log(categories);

  categories.map((cat) => {
    console.log(cat);
  });

  return (
    <Box width="container.xl" margin="auto">
      <Flex
        padding={3}
        border="1px solid"
        borderColor="gray.200"
        justifyContent="space-between"
      >
        <Box>
          <Text fontWeight="light" fontSize="xl">
            Brand
          </Text>
          <Select w="sm" variant="flushed" rounded="none">
            {categories.map((cat) => {
              return <option>{cat.name}</option>;
            })}
          </Select>
        </Box>
        <Box>
          <Text fontWeight="light" fontSize="xl">
            Price
          </Text>
          <Select w="sm" variant="flushed" rounded="none">
            {categories.map((cat) => {
              return <option>{cat.name}</option>;
            })}
          </Select>
        </Box>
        <Box>
          <Text fontWeight="light" fontSize="xl">
            Filter
          </Text>
          <Select w="sm" variant="flushed" rounded="none">
            {categories.map((cat) => {
              return <option>{cat.name}</option>;
            })}
          </Select>
        </Box>
      </Flex>
    </Box>
  );
};
