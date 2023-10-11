import { Text } from '@chakra-ui/react';
import { formatDistanceToNow } from 'date-fns';

const ShowTime = ({ time }) => {
  return (
    <Text fontSize="sm" color="gray.light" width="36" textAlign="right">
      {formatDistanceToNow(new Date(time)).replace(/^about\s+/i, '')} ago
    </Text>
  );
};

export default ShowTime;
