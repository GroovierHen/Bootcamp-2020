import { Flex, Box } from '@chakra-ui/react';

import Diaries from '../diary/Diaries';
import Editor from '../entry/Editor';

const Home: React.FC = () => {
  return (
    <Flex height="100vh" flexWrap="wrap">
      <Box
        p={4}
        borderRight="1px"
        borderColor="gray.200"
        overflowY="scroll"
        width="100%"
        maxWidth="64"
      >
        <Diaries />
      </Box>
      <Box flex="1">
        <Editor />
      </Box>
    </Flex>
  );
};

export default Home;
