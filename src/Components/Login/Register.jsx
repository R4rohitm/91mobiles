import {
  Box,
  Button,
  Container,
  Divider,
  FormControl,
  FormHelperText,
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
import { useState } from "react";
import { PasswordField } from "./PasswordField";
import { useNavigate } from "react-router-dom";

export const Register = () => {
  const [formData, setFormData] = useState();
  const [spinnerState, setSpinnerState] = useState(false);

  const navigate = useNavigate();

  const registerUser = async (user) => {
    setSpinnerState(true);
    try {
      let response = await fetch(
        `https://wtfassignment108.herokuapp.com/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(user),
        }
      );

      let data = await response.json();
      if (data) {
        setSpinnerState(false);
        navigate("/login");
      }
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };

  // Handle Form Data
  const handleChange = (e) => {
    const inputname = e.target.name;
    setFormData({ ...formData, [inputname]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    registerUser(formData);
  };

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
              Create a new account
            </Heading>
            <HStack spacing="1" justify="center">
              <Text color="muted">Already have an account?</Text>
              <Link to="/login">
                <Button variant="link" colorScheme="blue">
                  Sign In
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
            <Stack spacing="5">
              <form onSubmit={handleSubmit}>
                <FormControl>
                  <FormLabel htmlFor="first_name">First Name</FormLabel>
                  <Input
                    name="first_name"
                    type="text"
                    placeholder="First Name"
                    required
                    onChange={(e) => handleChange(e)}
                  />
                  <FormLabel htmlFor="last_name">Last Name</FormLabel>
                  <Input
                    name="last_name"
                    type="text"
                    placeholder="Last Name"
                    required
                    isRequired="true"
                    onChange={(e) => handleChange(e)}
                  />
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <Input
                    name="email"
                    type="email"
                    placeholder="Email"
                    required
                    onChange={(e) => handleChange(e)}
                  />
                  <FormLabel htmlFor="mobile">Mobile Number</FormLabel>
                  <Input
                    name="mobile"
                    type="number"
                    placeholder="Mobile Number"
                    required
                    maxLength="10"
                    onChange={(e) => handleChange(e)}
                  />
                  <PasswordField handlechange={handleChange} />
                  <FormHelperText textAlign="left">
                    Enter an unique password.
                  </FormHelperText>
                  <Stack spacing="6" mt="10">
                    <Button type="submit" variant={"solid"} colorScheme="blue">
                      {spinnerState ? <Spinner /> : "Sign Up"}
                    </Button>
                    <HStack>
                      <Divider />
                    </HStack>
                  </Stack>
                </FormControl>
              </form>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
};
