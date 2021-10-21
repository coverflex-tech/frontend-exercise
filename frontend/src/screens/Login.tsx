import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Box, Flex, Heading, Spacer } from "@chakra-ui/layout";
import { ChangeEvent, FormEvent, useState } from "react";
import { Redirect } from "react-router";
import ErrorText from "../components/ErrorText";
import { useAppState } from "../state/StateContext";
import { getUser as login } from "../state/userActions";

export const Login = () => {
  const {
    dispatch,
    state: { authenticated, authError, loadingAuth },
  } = useAppState();

  const [userName, setUserName] = useState("");

  if (authenticated) return <Redirect to="/" />;

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

            <ErrorText
              mt="2"
              mb="2"
              visible={!!authError}
              errorMessage="Something went wrong, please try again"
            />
          </FormControl>
          <Flex>
            <Spacer />
            <Button colorScheme="teal" type="submit" isLoading={loadingAuth}>
              Login
            </Button>
          </Flex>
        </form>
      </Box>
    </Flex>
  );
};
