import React from "react";
import commerce from "@/lib/commerce";
import Head from "next/head";
import { Box, Flex, Heading, Text } from "@chakra-ui/layout";
import Image from "next/image";
import HTMLReactParser from "html-react-parser";
import { Button } from "@chakra-ui/button";
import { motion } from "framer-motion";
import { FiShoppingBag } from "react-icons/fi";
import VariantPicker from "@/components/VariantPicker";

export async function getStaticProps({ params }) {
  const { permalink } = params;

  const product = await commerce.products.retrieve(permalink, {
    type: "permalink",
  });

  return {
    props: {
      product,
    },
    revalidate: 60,
  };
}

export async function getStaticPaths() {
  const { data: products } = await commerce.products.list();

  return {
    paths: products.map(({ permalink }) => ({
      params: {
        permalink,
      },
    })),
    fallback: false,
  };
}

function Product({ product }) {
  const {
    variant_groups: variantGroups,
    assets,
    meta,
    related_products: relatedProducts,
  } = product;

  const initialVariants = React.useMemo(
    () =>
      variantGroups.reduce((all, { id, options }) => {
        const [firstOption] = options;

        return { ...all, [id]: firstOption.id };
      }, {}),
    [product.permalink]
  );

  console.log(product);
  return (
    <React.Fragment>
      <Head>
        <title>{product.name}</title>
      </Head>
      <Box py={10} bg="white" h="100vh">
        <Flex gridGap={10} justifyContent="center" py={10} width="100%">
          <Box
            position="relative"
            height={400}
            width={400}
            rounded="lg"
            overflow="hidden"
          >
            <Image src={product.media.source} layout="fill" objectFit="cover" />
          </Box>
          <motion.div
            className="py-6 md:py-12 sticky top-0"
            initial={{ opacity: 0, y: 50 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: {
                delay: 0.25,
              },
            }}
            exit={{ opacity: 0, y: -50 }}
          >
            <Flex
              direction="column"
              justifyContent="space-between"
              height="100%"
            >
              <Box>
                <Heading fontWeight="bold" fontSize="4xl">
                  {product.name}
                </Heading>

                <Text fontWeight="bold" fontSize="3xl" mt={0}>
                  {product.price.formatted_with_symbol}
                </Text>

                <VariantPicker
                  variantGroups={variantGroups}
                  defaultValues={initialVariants}
                />
                <Text
                  fontWeight="light"
                  textColor="gray.800"
                  fontSize="xl"
                  mt={0}
                >
                  {HTMLReactParser(product.description)}
                </Text>
              </Box>

              <Button leftIcon={<FiShoppingBag />} colorScheme="purple">
                Add to Bag
              </Button>
            </Flex>
          </motion.div>
        </Flex>
      </Box>
    </React.Fragment>
  );
}

export default Product;
