import { Button } from "@chakra-ui/button";
import { Flex, Heading, Text } from "@chakra-ui/layout";
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/menu";
import { User } from "../api/user";
import { PersonSVG } from "./PersonSvg";
import { WalletSVG } from "./WalletSvg";

type HeaderProps = {
  user: User | null;
  logout: () => void;
};

export const Header = ({ user, logout }: HeaderProps) => (
  <Flex mb="4" w="100%" alignItems="center" justifyContent="space-between">
    <Heading color="white">Benefits</Heading>

    <Menu>
      <MenuButton as={Button}>
        <Flex flexDirection="row" alignItems="center">
          <PersonSVG />
          <Text ml="1">{user!.user_id}</Text>
          <WalletSVG ml="1" />
          <Text ml="1">{user!.data.balance}FP</Text>
        </Flex>
      </MenuButton>
      <MenuList>
        <MenuItem onClick={logout}>Sign out</MenuItem>
      </MenuList>
    </Menu>
  </Flex>
);
