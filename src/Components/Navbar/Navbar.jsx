import {
  Box,
  Button,
  Container,
  Flex,
  HStack,
  IconButton,
  Image,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
import * as React from "react";
import { FiMenu } from "react-icons/fi";
import { Link } from "react-router-dom";
// import { Logo } from "./Logo";

export const Navbar = () => {
  const isDesktop = useBreakpointValue({
    base: false,
    lg: true,
  });
  return (
    <Box
      as="section"
      pb={{
        base: "12",
        md: "24",
      }}
    >
      <Box
        as="nav"
        bg="bg-surface"
        boxShadow={useColorModeValue("sm", "sm-dark")}
      >
        <Container
          py={{
            base: "4",
            lg: "5",
          }}
        >
          <HStack spacing="10" justify="space-between">
            <Box>
              <Image
                src="https://play-lh.googleusercontent.com/YjO3MoN7jv4_OLJGzR4tiekDuJD5Hu-U7D5JTKPz_KdLb2dirsVt3KTKBe2gZpRFtR8"
                alt="logo"
                h="40px"
                w="40px"
              />
            </Box>
            <Box>
              {isDesktop ? (
                <Flex justify="space-between" flex="1">
                  <HStack spacing="3">
                    <Link to="/login">
                      <Button variant="ghost" colorScheme="blue">
                        Sign in
                      </Button>
                    </Link>
                    <Button variant="solid" colorScheme="blue">
                      Sign up
                    </Button>
                  </HStack>
                </Flex>
              ) : (
                <IconButton
                  variant="ghost"
                  icon={<FiMenu fontSize="1.25rem" />}
                  aria-label="Open Menu"
                />
              )}
            </Box>
          </HStack>
        </Container>
      </Box>
    </Box>
  );
};
