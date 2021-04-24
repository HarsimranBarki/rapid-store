import { Box, Flex, Heading, Text } from "@chakra-ui/layout";
import { chakra } from "@chakra-ui/system";
import React from "react";

function Hero() {
  return (
    <Box bg='teal.50'>
      
      <Flex
        height="xs"
        alignItems="center"
        maxW="80vw"
        m="auto"
        justifyContent="center"
        flexWrap='wrap'
      >
        <Box zIndex='10'>
          <Heading fontSize={['5xl', '6xl', '7xl']} textColor="gray.900" fontWeight="bold" >
            Rapid Store
          </Heading>
          <Text mt={2} textColor="gray.800">
            Hottest Shoes Collection With {""}
            <chakra.span fontWeight="semiBold">
              Rapid 1 Day Delivery
            </chakra.span>
          </Text>
         
        </Box>
        
      </Flex>
     
    </Box>
  );
}

export default Hero;
