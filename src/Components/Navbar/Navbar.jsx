import {
  Avatar,
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
import { useEffect } from "react";
import { FiMenu } from "react-icons/fi";
import { Link } from "react-router-dom";
// import { Logo } from "./Logo";

export const Navbar = ({ refreshNav, setRefreshNav }) => {
  const data = JSON.parse(localStorage.getItem("user"));
  let token;
  if (data) {
    token = data.token;
  }

  const handleLogout = () => {
    localStorage.removeItem("user");
    setRefreshNav(!refreshNav);
  };
  const isDesktop = useBreakpointValue({
    base: false,
    md: true,
    lg: true,
  });

  useEffect(() => {}, [refreshNav]);
  return (
    <Box
      as="section"
      pb={{
        base: "10",
        md: "10",
      }}
      w="100%"
    >
      <Box
        as="nav"
        bg="bg-surface"
        boxShadow={useColorModeValue("sm", "sm-dark")}
      >
        <Container
          w="full"
          py={{
            base: "4",
            lg: "2",
          }}
        >
          <HStack spacing="10" justify="space-between">
            <Box>
              <Link to="/">
                <Image
                  src="https://play-lh.googleusercontent.com/YjO3MoN7jv4_OLJGzR4tiekDuJD5Hu-U7D5JTKPz_KdLb2dirsVt3KTKBe2gZpRFtR8"
                  alt="logo"
                  h="40px"
                  w="40px"
                />
              </Link>
            </Box>
            <Box>
              {isDesktop ? (
                <Flex justify="space-between" flex="1">
                  <HStack spacing="5">
                    {!token ? (
                      <>
                        <Link to="/login">
                          <Button variant="ghost" colorScheme="blue">
                            Sign in
                          </Button>
                        </Link>
                        <Link to="/signup">
                          <Button variant="solid" colorScheme="blue">
                            Sign up
                          </Button>
                        </Link>
                      </>
                    ) : (
                      <>
                        <Link to="/profile">
                          <Avatar
                            cursor="pointer"
                            bg="brand.500"
                            size="lg"
                            src="https://horizon-ui.com/components/static/media/avatar.0943c821944146790f7ca3035508f323.svg"
                          />
                        </Link>
                        <Button
                          onClick={handleLogout}
                          variant="solid"
                          colorScheme="blue"
                        >
                          Sign Out
                        </Button>
                      </>
                    )}
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
