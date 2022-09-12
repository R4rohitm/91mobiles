import {
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Stack,
  Text,
  useBreakpointValue,
  useColorModeValue,
  Spinner,
} from "@chakra-ui/react";
import * as React from "react";
// import { Logo } from "./Logo";
import { Link } from "react-router-dom";
import { PasswordField } from "./PasswordField";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Login = ({ refreshNav, setRefreshNav }) => {
  const [formData, setFormData] = useState();
  const [spinnerState, setSpinnerState] = useState(false);

  const navigate = useNavigate();

  const storedData = JSON.parse(localStorage.getItem("user"));

  const loginUser = async (user) => {
    setSpinnerState(true);
    try {
      let response = await fetch(
        `https://wtfassignment108.herokuapp.com/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(user),
        }
      );

      let data = await response.json();
      localStorage.setItem("user", JSON.stringify(data));
      if (data) {
        setSpinnerState(false);
        setRefreshNav(!refreshNav);
        navigate("/profile");
      }
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };

  //
  const handleChange = (e) => {
    const inputname = e.target.name;
    setFormData({ ...formData, [inputname]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    loginUser(formData);
  };

  useEffect(() => {
    if (storedData?.token) {
      navigate("/");
    }
    // eslint-disable-next-line
  }, []);

  return (
    <Container
      maxW="lg"
      py={{
        base: "12",
        md: "14",
      }}
      px={{
        base: "0",
        sm: "8",
      }}
    >
      <Stack spacing="8">
        <Stack spacing="6">
          <Stack
            spacing={{
              base: "2",
              md: "3",
            }}
            textAlign="center"
          >
            <Heading
              size={useBreakpointValue({
                base: "xs",
                md: "sm",
              })}
            >
              Log in to your account
            </Heading>
            <HStack spacing="1" justify="center">
              <Text color="muted">Don't have an account?</Text>
              <Link to="/signup">
                <Button variant="link" colorScheme="blue">
                  Sign up
                </Button>
              </Link>
            </HStack>
          </Stack>
        </Stack>
        <Box
          py={{
            base: "0",
            sm: "8",
          }}
          px={{
            base: "4",
            sm: "10",
          }}
          bg={useBreakpointValue({
            base: "transparent",
            sm: "bg-surface",
          })}
          boxShadow={{
            base: "none",
            sm: useColorModeValue("md", "md-dark"),
          }}
          borderRadius={{
            base: "none",
            sm: "xl",
          }}
        >
          <Stack spacing="6">
            <form onSubmit={handleSubmit}>
              <Stack spacing="5">
                <FormControl>
                  <FormLabel htmlFor="email" required>
                    Email
                  </FormLabel>
                  <Input
                    name="email"
                    type="email"
                    onChange={(e) => handleChange(e)}
                    placeholder="Email"
                  />
                  <PasswordField handlechange={handleChange} />
                </FormControl>
              </Stack>
              <HStack justify="space-between">
                <Checkbox defaultChecked>Remember me</Checkbox>
                <Button variant="link" colorScheme="blue" size="sm">
                  Forgot password?
                </Button>
              </HStack>
              <Stack spacing="6" mt="10">
                <Button type="submit" variant={"solid"} colorScheme="blue">
                  {spinnerState ? <Spinner /> : "Sign In"}
                </Button>
                <HStack>
                  <Divider />
                </HStack>
              </Stack>
            </form>
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
};
