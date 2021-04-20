import { Button } from "@chakra-ui/button";
import { Box, Container, Flex, Grid, Heading, Text } from "@chakra-ui/layout";
import React from "react";
import HeroImage from "public/hero.svg";
import Image from "next/image";
import { chakra } from "@chakra-ui/system";

function Hero() {
  return (
    <Box bg="teal.50">
      <Flex
        height="md"
        alignItems="center"
        maxW="container.xl"
        m="auto"
        justifyContent="space-between"
      >
        <Box>
          <Heading fontSize="7xl" textColor="gray.900" fontWeight="bold">
            Rapid Store
          </Heading>
          <Text mt={2} textColor="gray.800">
            Hottest Shpping Trends With {""}
            <chakra.span fontWeight="semiBold">
              Rapid 1 Day Delivery
            </chakra.span>
          </Text>
          <Button mt={10} variant="solid" colorScheme="teal">
            Shop Now
          </Button>
        </Box>
        <Box
          position="relative"
          height={500}
          width={500}
          rounded="lg"
          overflow="hidden"
        >
          <Image src={HeroImage} layout="fill" objectFit="cover" />
        </Box>
      </Flex>
    </Box>
  );
}

export default Hero;