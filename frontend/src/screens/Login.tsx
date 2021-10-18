import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Box, Flex, Heading, Spacer, Text } from "@chakra-ui/layout";
import { ChangeEvent, FormEvent, useState } from "react";
import { Redirect } from "react-router";
import { login, useAuth } from "../state/UserContext";

export const Login = () => {
  const {
    dispatch,
    state: { auth, error, loading },
  } = useAuth();
  const [userName, setUserName] = useState("");

  if (auth) return <Redirect to="/" />;

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await login(dispatch, userName);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };

  return (
    <Flex p={5} h="100vh" justifyContent="center" alignItems="center">
      <Box
        bg="AppWorkspace"
        shadow="md"
        p={5}
        borderRadius="md"
        w={400}
        minH={220}
      >
        <Heading mb={4}>Login</Heading>
        <form onSubmit={onSubmit}>
          <FormControl id="userName" mb={2} isRequired>
            <FormLabel>Username</FormLabel>
            <Input
              placeholder="Type in your username here"
              type="text"
              value={userName}
              onChange={handleChange}
            />

            {!!error && (
              <Text mt="2" mb="2" color="red.500">
                Something went wrong, please try again
              </Text>
            )}
          </FormControl>
          <Flex>
            <Spacer />
            <Button colorScheme="teal" type="submit" isLoading={loading}>
              Login
            </Button>
          </Flex>
        </form>
      </Box>
    </Flex>
  );
};
