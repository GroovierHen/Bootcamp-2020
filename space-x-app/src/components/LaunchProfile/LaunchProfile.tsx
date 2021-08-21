import { useEffect, FC } from 'react';
import {
  VStack,
  SimpleGrid,
  Flex,
  Spinner,
  Heading,
  Text,
  Badge,
  Image,
} from '@chakra-ui/react';

import { useLaunchProfileQuery } from '../../generated/graphql';

interface Props {
  id: string;
}

const LaunchProfile: FC<Props> = ({ id }) => {
  const { data, error, loading, refetch } = useLaunchProfileQuery({
    variables: { id },
  });

  useEffect(() => {
    refetch({ id });
  }, [id, refetch]);

  if (error)
    return (
      <Text fontSize="2xl" colorScheme="red">
        Something went wrong
      </Text>
    );

  if (loading)
    return (
      <VStack
        flex="1"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Spinner size="xl" />
      </VStack>
    );

  if (data) {
    if (data.launch) {
      return (
        <VStack flex="1" px="8" spacing="4">
          <Flex align="baseline">
            <Heading as="h3" mr="1">
              Flight {data.launch.id}:
            </Heading>
            {data.launch.launch_success ? (
              <Badge colorScheme="green">Success</Badge>
            ) : (
              <Badge colorScheme="red">Failed</Badge>
            )}
          </Flex>
          <Heading as="h1" size="4xl">
            {data.launch.mission_name}
            {data.launch.rocket &&
              ` (${data.launch.rocket.rocket_name} | ${data.launch.rocket.rocket_type})`}
          </Heading>
          <Text fontSize="xl">{data.launch.details}</Text>
          {!!data.launch.links && !!data.launch.links.flickr_images && (
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
              {data.launch.links.flickr_images.map((image, i) => (
                <Image
                  src={image!}
                  srcSet={image!}
                  key={image}
                  alt={`${data.launch?.mission_name} ${i}`}
                />
              ))}
            </SimpleGrid>
          )}
        </VStack>
      );
    } else {
      return <Text fontSize="2xl">No launch data available</Text>;
    }
  } else {
    return <Text fontSize="2xl">No data available</Text>;
  }
};

export default LaunchProfile;
