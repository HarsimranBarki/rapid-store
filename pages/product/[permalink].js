import RelatedProducts from "@/components/RelatedProducts";
import VariantPicker from "@/components/VariantPicker";
import { useCartDispatch } from "@/context/cart";
import commerce from "@/lib/commerce";
import { Button } from "@chakra-ui/button";
import { Badge, Box, Divider, Flex, Grid, Text } from "@chakra-ui/layout";
import { chakra } from "@chakra-ui/system";
import { useToast } from "@chakra-ui/toast";
import { motion } from "framer-motion";
import HTMLReactParser from "html-react-parser";
import Head from "next/head";
import Image from "next/image";
import React, { useState } from "react";
import { FiShoppingBag } from "react-icons/fi";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import "swiper/swiper-bundle.css";
import { useMediaQuery } from "react-responsive";

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

const Product = ({ product }) => {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  const toast = useToast();
  const { setCart } = useCartDispatch();
  const [loading, setLoading] = useState(false);

  const {
    variant_groups: variantGroups,
    assets,
    meta,
    related_products: relatedProducts,
  } = product;
  const images = assets.filter(({ is_image }) => is_image);

  const initialVariants = React.useMemo(
    () =>
      variantGroups.reduce((all, { id, options }) => {
        const [firstOption] = options;

        return { ...all, [id]: firstOption.id };
      }, {}),
    [product.permalink]
  );

  const [selectedVariants, setSelectedVariants] = React.useState(
    initialVariants
  );
  SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);
  React.useEffect(() => {
    setSelectedVariants(initialVariants);
  }, [product.permalink]);

  const handleVariantChange = ({ target: { id, value } }) =>
    setSelectedVariants({
      ...selectedVariants,
      [id]: value,
    });

  const addToCart = () => {
    setLoading(true);
    commerce.cart
      .add(product.id, 1, selectedVariants)
      .then(({ cart }) => {
        setCart(cart);
        return cart;
      })
      .then(({ subtotal }) => {
        setLoading(false);
        toast({
          title: `${product.name} is now in your cart.`,
          description: ` Your subtotal is now ${subtotal.formatted_with_symbol}`,
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      })
      .catch(() => {
        setLoading(false);
        toast({
          title: "Please try again",
          description: `Something happend try again`,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      });
  };
  const MotionGrid = motion(Grid);
  const MotionBox = motion(Box);
  const MotionText = motion(Text);
  return (
    <motion.div
      exit={{ opacity: 0 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <Head>
        <title>{product.name}</title>
      </Head>
      <Box py={10} bg="white" width="80vw" margin="auto">
        <MotionText
          fontWeight="bold"
          fontSize="4xl"
          initial={{ opacity: 0, y: -50 }}
          animate={{
            opacity: 1,
            y: 0,
            transition: {
              delay: 0.25,
            },
          }}
          exit={{ opacity: 0, x: -50 }}
        >
          {product.name}
        </MotionText>
        <MotionText
          initial={{ opacity: 0, y: -50 }}
          animate={{
            opacity: 1,
            y: 0,
            transition: {
              delay: 0.3,
            },
          }}
          exit={{ opacity: 0, x: -50 }}
          textColor="gray.500"
          mt={-1}
        >
          <chakra.span textColor="black">
            {product.is.sold_out ? (
              <Badge colorScheme="red">Sold Out</Badge>
            ) : (
              <Badge colorScheme="green">In Stock</Badge>
            )}
          </chakra.span>
        </MotionText>
        <Flex
          gridGap={10}
          justifyContent="flex-start"
          py={10}
          width="100%"
          flexWrap='wrap'
         
        >
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{
              opacity: 1,
              x: 0,
              transition: {
                delay: 0.25,
              },
            }}
            exit={{ opacity: 0, x: -50 }}
          >
            <Swiper
              spaceBetween={10}
              slidesPerView={isTabletOrMobile ? 1 : 3}
              style={{ marginLeft: "0" }}
              effect="fade"
            >
              {product.assets.map((media) => {
                return (
                  <SwiperSlide style={{ height: "300px", width: "300px" }}>
                    <MotionBox
                      rounded="lg"
                      overflow="hidden"
                      bg="gray.200"
                      position="relative"
                      height="full"
                      width="300px"
                      overflow="hidden"
                      whileHover={{
                        scale: 1.01,
                      }}
                    >
                      <Image src={media.url} layout="fill" objectFit="cover" />{" "}
                    </MotionBox>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </motion.div>

          <motion.div
            className="py-6 md:py-12 sticky top-0"
            initial={{ opacity: 0, x: 50 }}
            style={{ width: "100%" }}
            animate={{
              opacity: 1,
              x: 0,
              transition: {
                delay: 0.25,
              },
            }}
            exit={{ opacity: 0, x: -50 }}
          >
            <Flex
              direction="column"
              justifyContent="space-between"
              height="100%"
              width='100%'
            >
              <Box>
                
                <Box>
                  <Text fontWeight="bold" fontSize="4xl" textColor="black">
                    {product.price.formatted_with_symbol}
                  </Text>

                  <VariantPicker
                    variantGroups={variantGroups}
                    defaultValues={initialVariants}
                    onChange={handleVariantChange}
                  />
                  <Box
                    fontWeight="normal"
                    textColor="gray.800"
                    fontSize="md"
                    ml={5}
                    mt={5}
                  >
                    {HTMLReactParser(product.description)}
                  </Box>
                </Box>
                <Button
                  mt={5}
                  w="xs"
                  onClick={addToCart}
                  leftIcon={<FiShoppingBag />}
                  colorScheme="teal"
                  isLoading={loading}
                  textColor="gray.100"
                  rounded="lg"
                >
                  Add to Bag
                </Button>
              
              </Box>
            
            </Flex>
          </motion.div>
        </Flex>
        <Divider my={5} />
        <Box bg="white">
          <RelatedProducts products={relatedProducts} />
        </Box>
      </Box>
    </motion.div>
  );
};

export default Product;
