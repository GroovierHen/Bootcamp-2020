import { useState, useEffect, useRef, useCallback, Fragment } from 'react';
import {
  useDisclosure,
  useUpdateEffect,
  useColorMode,
  useColorModeValue,
  Box,
  Flex,
  Spacer,
  Heading,
  IconButton,
  Drawer,
  DrawerContent,
  DrawerBody,
} from '@chakra-ui/react';
import { SunIcon, MoonIcon, HamburgerIcon } from '@chakra-ui/icons';
import { useViewportScroll } from 'framer-motion';

import LaunchList from './components/LaunchList/LaunchList';
import LaunchProfile from './components/LaunchProfile/LaunchProfile';

const App = () => {
  const mobileNav = useDisclosure();
  const { toggleColorMode } = useColorMode();
  const SwitchIcon = useColorModeValue(MoonIcon, SunIcon);
  const { scrollY } = useViewportScroll();

  const [id, setId] = useState('13');
  const [y, setY] = useState(0);
  const ref = useRef<HTMLHeadingElement>(null);
  const mobileNavBtnRef = useRef<HTMLButtonElement>(null);

  const { height = 0 } = ref.current?.getBoundingClientRect() ?? {};

  const handleIdChange = useCallback(
    (newId: string) => {
      setId(newId);
      mobileNav.onClose();
    },
    [mobileNav]
  );

  useUpdateEffect(() => {
    mobileNavBtnRef.current?.focus();
  }, [mobileNav.isOpen]);

  useEffect(() => {
    return scrollY.onChange(() => setY(scrollY.get()));
  }, [scrollY]);

  return (
    <Fragment>
      <Flex
        ref={ref}
        shadow={y > height ? 'sm' : undefined}
        transition="box-shadow 0.2s, background-color 0.2s"
        as="header"
        position="sticky"
        zIndex="3"
        top="0px"
        left="0px"
        right="0px"
        width="full"
        backgroundColor={useColorModeValue('white', 'gray.800')}
        p="4"
      >
        <Heading as="h2">Launches</Heading>
        <Spacer />
        <IconButton
          size="md"
          fontSize="lg"
          aria-label="Toggle Color Mode"
          variant="ghost"
          color="current"
          mr={{ base: '2', md: '0' }}
          icon={<SwitchIcon />}
          onClick={toggleColorMode}
        />
        <IconButton
          ref={mobileNavBtnRef}
          display={{ base: 'flex', md: 'none' }}
          aria-label="Open menu"
          fontSize="20px"
          color={useColorModeValue('gray.800', 'inherit')}
          variant="ghost"
          icon={<HamburgerIcon />}
          onClick={mobileNav.onOpen}
        />
      </Flex>
      <Flex as="main">
        <Box
          as="nav"
          pos="sticky"
          top="0"
          width="300px"
          height="calc(100vh - 8.125rem)"
          pr="8"
          pb="6"
          pl="6"
          pt="4"
          overflowY="auto"
          display={{ base: 'none', md: 'block' }}
        >
          <LaunchList id={id} handleIdChange={handleIdChange} />
        </Box>
        <LaunchProfile id={id} />
      </Flex>

      <Drawer isOpen={mobileNav.isOpen} onClose={mobileNav.onClose}>
        <DrawerContent>
          <DrawerBody>
            <LaunchList id={id} handleIdChange={handleIdChange} />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Fragment>
  );
};

export default App;
