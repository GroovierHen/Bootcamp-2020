import { useState, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  useToast,
  Box,
  ButtonGroup,
  Button,
  Text,
  Editable,
  EditableInput,
  EditablePreview,
} from '@chakra-ui/react';

import { Diary } from '../../interfaces';
import { useAppDispatch } from '../../store';
import http from '../../services/api';
import { updateDiary } from './diariesSlice';
import {
  setCanEdit,
  setActiveDiaryId,
  setCurrentlyEditing,
} from '../entry/editorSlice';

interface Props {
  diary: Diary;
}

const DiaryTile: React.FC<Props> = (props) => {
  const dispatch = useAppDispatch();
  const toast = useToast();

  const [diary, setDiary] = useState(props.diary);

  const totalEntries = useMemo(
    () => props.diary?.entryIds?.length,
    [props.diary?.entryIds?.length]
  );

  const saveChanges = useCallback(() => {
    http.put<Diary, Diary>(`/diaries/${diary.id}`, diary).then((diary) => {
      if (diary) {
        dispatch(updateDiary(diary));

        toast({
          title: 'Saved!',
          status: 'success',
          duration: 4000,
        });
      }
    });
  }, [diary, toast, dispatch]);

  return (
    <Box py={4} borderBottom="1px" borderColor="gray.200">
      <Editable
        value={diary.title}
        onChange={(title) =>
          setDiary({
            ...diary,
            title,
          })
        }
        onSubmit={saveChanges}
      >
        <EditablePreview
          as="h2"
          fontWeight="bold"
          fontSize="lg"
          textTransform="capitalize"
        />
        <EditableInput />
      </Editable>
      <Text fontSize="sm" textColor="gray.600" mb={2}>
        {totalEntries ?? '0'} saved entries
      </Text>
      <ButtonGroup spacing="4">
        <Button
          fontSize="small"
          onClick={() => {
            dispatch(setCanEdit(true));
            dispatch(setActiveDiaryId(diary.id as string));
            dispatch(setCurrentlyEditing(null));
          }}
        >
          New Entry
        </Button>
        <Button as={Link} to={`diary/${diary.id}`} fontSize="small">
          View all →
        </Button>
      </ButtonGroup>
    </Box>
  );
};

export default DiaryTile;
