import { FC, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { Stack, Box, Button } from '@chakra-ui/react';

import { RootState } from '../../rootReducer';
import { Entry } from '../../interfaces';
import { useAppDispatch } from '../../store';
import http from '../../services/api';
import { setEntries } from '../entry/entriesSlice';
import { setCurrentlyEditing, setCanEdit } from '../entry/editorSlice';

const DiaryEntriesList: FC = () => {
  const dispatch = useAppDispatch();
  const { entries } = useSelector((state: RootState) => state);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      http
        .get<null, { entries: Entry[] }>(`/diaries/entries/${id}`)
        .then(({ entries: _entries }) => {
          if (_entries) {
            const sortByLastUpdated = _entries.sort((a, b) => {
              return dayjs(b.updatedAt).unix() - dayjs(a.updatedAt).unix();
            });
            dispatch(setEntries(sortByLastUpdated));
          }
        });
    }
  }, [id, dispatch]);

  return (
    <>
      <Button isFullWidth as={Link} to="/">
        ← Go Back
      </Button>
      <Stack as="ul" mt="4" pl="4">
        {entries.map((entry) => (
          <Box
            as="li"
            key={entry.id}
            onClick={() => {
              dispatch(setCurrentlyEditing(entry));
              dispatch(setCanEdit(true));
            }}
          >
            {entry.title}
          </Box>
        ))}
      </Stack>
    </>
  );
};

export default DiaryEntriesList;
