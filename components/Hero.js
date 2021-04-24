import { Box, Flex, Heading, Text } from "@chakra-ui/layout";
import { chakra } from "@chakra-ui/system";
import React from "react";
import heroBg from 'public/hero.jpg'
import { motion } from "framer-motion";

function Hero() {
  const MotionText = motion(Text)
  const MotionHeading = motion(Heading)
  return (
    <Box   backgroundSize='cover' backgroundPosition='center' style={{
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5),rgba(0, 0, 0, 0.5)),url(${heroBg})`,
    }}>
      
      <Flex
        height={['sm', 'md', 'md']}
        alignItems="center"
        maxW="80vw"
        m="auto"
        justifyContent="center"
        textColor='white'
        flexWrap='wrap'
      >
        <Box zIndex='10'>
          <MotionHeading textAlign='center' fontSize={['5xl', '6xl', '7xl']} textColor="gray.100" fontWeight="bold"   initial={{ opacity: 0, y: -50 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: {
                delay: 0.25,
              },
            }}>
            Rapid Store
          </MotionHeading>
          <MotionText mt={2} textColor="gray.100"  textAlign='center' initial={{ opacity: 0, y: 50 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: {
                delay: 0.25,
              },
            }}
            exit={{ opacity: 0, x: -50 }}>
            Hottest Shoes Collection With {""}
            <chakra.span fontWeight="semiBold">
              Rapid 1 Day Delivery
            </chakra.span>
          </MotionText>
         
        </Box>
        
      </Flex>
     
    </Box>
  );
}

export default Hero;
