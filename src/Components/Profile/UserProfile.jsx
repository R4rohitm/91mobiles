import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  Avatar,
  AvatarBadge,
  IconButton,
  Center,
  CloseButton,
  Spinner,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { SmallCloseIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function UserProfile({ refreshNav, setRefreshNav }) {
  const [formData, setFormData] = useState();
  const [spinnerState, setSpinnerState] = useState(false);
  const [alertState, setAlertState] = useState(false);
  const navigate = useNavigate();

  const storedData = JSON.parse(localStorage.getItem("user"));
  // console.log(storedData);
  let token;
  if (storedData && storedData.token) {
    token = storedData.token;
  }

  const updateUser = async (user) => {
    try {
      setSpinnerState(true);
      let response = await fetch(
        `https://wtfassignment108.herokuapp.com/register/edit`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(user),
        }
      );

      let data = await response.json();
      console.log(data);
      const { first_name, last_name, email, mobile } = data;
      localStorage.setItem(
        "user",
        JSON.stringify({ first_name, last_name, email, mobile, token })
      );
      if (data) {
        setAlertState(true);
        setSpinnerState(false);

        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleChange = (e) => {
    const inputname = e.target.name;
    setFormData({ ...formData, [inputname]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    updateUser(formData);
  };

  useEffect(() => {
    setFormData(storedData);

    if (!storedData && !storedData?.token) {
      navigate("/login");
    }
    // eslint-disable-next-line
  }, [refreshNav]);
  return (
    <>
      {storedData ? (
        <form onSubmit={handleSubmit}>
          <Flex
            minH={"80vh"}
            align={"center"}
            justify={"center"}
            // eslint-disable-next-line react-hooks/rules-of-hooks
            bg={useColorModeValue("gray.50", "gray.800")}
          >
            <Stack
              spacing={4}
              w={"full"}
              maxW={"md"}
              // eslint-disable-next-line react-hooks/rules-of-hooks
              bg={useColorModeValue("white", "gray.700")}
              rounded={"xl"}
              boxShadow={"lg"}
              p={6}
              my={12}
            >
              <Flex justify="space-between">
                <Heading lineHeight={1.1} fontSize={{ base: "xl", sm: "2xl" }}>
                  User Profile Edit
                </Heading>
                <CloseButton
                  onClick={() => {
                    navigate("/");
                  }}
                />
              </Flex>
              {alertState ? (
                <Alert status="success">
                  <AlertIcon />
                  Profile Updated Successfully!
                </Alert>
              ) : null}
              <FormControl id="userName">
                <FormLabel>User Icon</FormLabel>
                <Stack direction={["column", "row"]} spacing={6}>
                  <Center>
                    <Avatar size="xl">
                      <AvatarBadge
                        as={IconButton}
                        size="sm"
                        rounded="full"
                        top="-10px"
                        colorScheme="red"
                        aria-label="remove Image"
                        icon={<SmallCloseIcon />}
                      />
                    </Avatar>
                  </Center>
                  <Center w="full">
                    <Button w="full" disabled>
                      Change Icon
                    </Button>
                  </Center>
                </Stack>
              </FormControl>
              <FormControl isRequired>
                <FormLabel>First name</FormLabel>
                <Input
                  name="first_name"
                  placeholder="First Name"
                  _placeholder={{ color: "gray.500" }}
                  type="text"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  defaultValue={storedData ? storedData.first_name : null}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Last name</FormLabel>
                <Input
                  name="last_name"
                  placeholder="Last Name"
                  _placeholder={{ color: "gray.500" }}
                  type="text"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  defaultValue={storedData ? storedData.last_name : null}
                />
              </FormControl>
              <FormControl id="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <Input
                  name="email"
                  placeholder="your-email@example.com"
                  _placeholder={{ color: "gray.500" }}
                  type="email"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  defaultValue={storedData ? storedData.email : null}
                />
              </FormControl>
              <FormControl id="mobile" isRequired>
                <FormLabel>Mobile Number</FormLabel>
                <Input
                  name="mobile"
                  placeholder="1234567890"
                  _placeholder={{ color: "gray.500" }}
                  type="number"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  defaultValue={storedData ? storedData.mobile : null}
                />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <Input
                  name="password"
                  placeholder="password"
                  _placeholder={{ color: "gray.500" }}
                  type="password"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
              </FormControl>
              <Stack spacing={6} direction={["column", "row"]}>
                <Button
                  bg={"red.400"}
                  color={"white"}
                  w="full"
                  _hover={{
                    bg: "red.500",
                  }}
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  Cancel
                </Button>
                <Button
                  bg={"blue.400"}
                  color={"white"}
                  w="full"
                  _hover={{
                    bg: "blue.500",
                  }}
                  type="submit"
                >
                  {spinnerState ? <Spinner /> : "Submit"}
                </Button>
              </Stack>
            </Stack>
          </Flex>
        </form>
      ) : null}
    </>
  );
}
