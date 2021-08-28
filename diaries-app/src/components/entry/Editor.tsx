import { FC, useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import Markdown from 'markdown-to-jsx';
import {
  Box,
  Input,
  Heading,
  Textarea,
  Button,
  IconButton,
} from '@chakra-ui/react';

import { RootState } from '../../rootReducer';
import { Entry, Diary } from '../../interfaces';
import { useAppDispatch } from '../../store';
import http from '../../services/api';
import { setCurrentlyEditing, setCanEdit } from './editorSlice';
import { updateDiary } from '../diary/diariesSlice';
import { updateEntry } from './entriesSlice';
import { showAlert } from '../../util';

const EditIcon = () => (
  <svg
    aria-hidden="true"
    focusable="false"
    data-prefix="far"
    data-icon="edit"
    role="img"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 576 512"
  >
    <path
      fill="currentColor"
      d="M402.3 344.9l32-32c5-5 13.7-1.5 13.7 5.7V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V112c0-26.5 21.5-48 48-48h273.5c7.1 0 10.7 8.6 5.7 13.7l-32 32c-1.5 1.5-3.5 2.3-5.7 2.3H48v352h352V350.5c0-2.1.8-4.1 2.3-5.6zm156.6-201.8L296.3 405.7l-90.4 10c-26.2 2.9-48.5-19.2-45.6-45.6l10-90.4L432.9 17.1c22.9-22.9 59.9-22.9 82.7 0l43.2 43.2c22.9 22.9 22.9 60 .1 82.8zM460.1 174L402 115.9 216.2 301.8l-7.3 65.3 65.3-7.3L460.1 174zm64.8-79.7l-43.2-43.2c-4.1-4.1-10.8-4.1-14.8 0L436 82l58.1 58.1 30.9-30.9c4-4.2 4-10.8-.1-14.9z"
    />
  </svg>
);

const Editor: FC = () => {
  const {
    currentlyEditing: entry,
    canEdit,
    activeDiaryId,
  } = useSelector((state: RootState) => state.editor);
  const dispatch = useAppDispatch();

  const [editedEntry, updateEditedEntry] = useState(entry);

  const saveEntry = useCallback(async () => {
    if (activeDiaryId === null) {
      return showAlert('Please select a diary.', 'warning');
    }

    if (entry === null) {
      http
        .post<Entry, { diary: Diary; entry: Entry }>(
          `/diaries/entry/${activeDiaryId}`,
          editedEntry
        )
        .then((data) => {
          if (data != null) {
            const { diary, entry: _entry } = data;

            dispatch(setCurrentlyEditing(_entry));
            dispatch(updateDiary(diary));
          }
        });
    } else {
      http
        .put<Entry, Entry>(`diaries/entry/${entry.id}`, editedEntry)
        .then((_entry) => {
          if (_entry != null) {
            dispatch(setCurrentlyEditing(_entry));
            dispatch(updateEntry(_entry));
          }
        });
    }

    dispatch(setCanEdit(false));
  }, [activeDiaryId, entry, editedEntry, dispatch]);

  useEffect(() => {
    updateEditedEntry(entry);
  }, [entry]);

  return (
    <>
      <Box
        as="header"
        p="4"
        display="flex"
        alignItems="baseline"
        borderBottom="1px"
        borderColor="gray.200"
      >
        {entry && !canEdit ? (
          <>
            <Heading textTransform="capitalize" mr="2">
              {entry.title}
            </Heading>
            <IconButton
              aria-label="Edit Entry"
              size="xs"
              variant="unstyled"
              icon={<EditIcon />}
              onClick={() => {
                if (entry != null) {
                  dispatch(setCanEdit(true));
                }
              }}
            />
          </>
        ) : (
          <Input
            size="sm"
            value={editedEntry?.title ?? ''}
            disabled={!canEdit}
            onChange={(e) => {
              if (editedEntry) {
                updateEditedEntry({
                  ...editedEntry,
                  title: e.target.value,
                });
              } else {
                updateEditedEntry({
                  title: e.target.value,
                  content: '',
                });
              }
            }}
          />
        )}
      </Box>
      <Box p="4">
        {entry && !canEdit ? (
          <Markdown>{entry.content}</Markdown>
        ) : (
          <>
            <Textarea
              resize="none"
              mb="4"
              disabled={!canEdit}
              placeholder="Supports markdown!"
              value={editedEntry?.content ?? ''}
              onChange={(e) => {
                if (editedEntry) {
                  updateEditedEntry({
                    ...editedEntry,
                    content: e.target.value,
                  });
                } else {
                  updateEditedEntry({
                    title: '',
                    content: e.target.value,
                  });
                }
              }}
            />
            <Button colorScheme="blue" onClick={saveEntry} disabled={!canEdit}>
              Save
            </Button>
          </>
        )}
      </Box>
    </>
  );
};

export default Editor;
