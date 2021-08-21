import { FC } from 'react';
import { useColorModeValue, Box, Spinner, Stack, Text } from '@chakra-ui/react';

import { useLaunchListQuery } from '../../generated/graphql';

interface Props {
  id: string;
  handleIdChange: (id: string) => void;
}

const LaunchList: FC<Props> = ({ id, handleIdChange }) => {
  const { data, error, loading } = useLaunchListQuery();
  const linkColor = useColorModeValue('gray.700', 'whiteAlpha.900');
  const _activeLinkBgColor = useColorModeValue(
    'teal.50',
    'rgba(48, 140, 122, 0.3)'
  );
  const _activeLinkColor = useColorModeValue('teal.700', 'teal.200');

  if (error)
    return (
      <Text fontSize="2xl" colorScheme="red">
        Something went wrong
      </Text>
    );

  if (loading)
    return (
      <Box
        minHeight="full"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Spinner size="xl" />
      </Box>
    );

  return (
    <Stack as="ul">
      {data &&
        data.launches &&
        data.launches.map(
          (launch, i) =>
            launch && (
              <Box
                aria-current={launch.id === id ? 'page' : undefined}
                key={i}
                as="li"
                userSelect="none"
                display="flex"
                alignItems="center"
                lineHeight="1.5rem"
                px="3"
                py="1"
                rounded="md"
                fontSize="sm"
                fontWeight="500"
                color={linkColor}
                transition="all 0.2s"
                cursor="pointer"
                _activeLink={{
                  bg: _activeLinkBgColor,
                  color: _activeLinkColor,
                  fontWeight: '600',
                }}
                onClick={() => handleIdChange(launch.id!)}
              >
                {launch.mission_name} ({launch.launch_year})
              </Box>
            )
        )}
    </Stack>
  );
};

export default LaunchList;
