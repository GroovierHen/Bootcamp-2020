import { useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import dayjs from 'dayjs';
import {
  useDisclosure,
  useToast,
  HStack,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  FormErrorMessage,
  RadioGroup,
  Input,
  Radio,
} from '@chakra-ui/react';

import { RootState } from '../../rootReducer';
import { User, Diary } from '../../interfaces';
import DiaryTile from './DiaryTile';
import DiaryEntriesList from './DiaryEntriesList';
import { useAppDispatch } from '../../store';
import http from '../../services/api';
import { addDiary } from './diariesSlice';
import { setUser } from '../auth/userSlice';

type DiaryData = { title: string; type: string };

const Diaries: React.FC = () => {
  const dispatch = useAppDispatch();
  const diaries = useSelector((state: RootState) => state.diaries);
  const user = useSelector((state: RootState) => state.user);
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DiaryData>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const fetchDiaries = useCallback(async () => {
    if (user) {
      http.get<null, Diary[]>(`diaries/${user.id}`).then((data) => {
        if (data && data.length > 0) {
          const sortedByUpdatedAt = data.sort((a, b) => {
            return dayjs(b.updatedAt).unix() - dayjs(a.updatedAt).unix();
          });

          dispatch(addDiary(sortedByUpdatedAt));
        }
      });
    }
  }, [user, dispatch]);

  const onCreateDiary = useCallback(
    async ({ title, type }: DiaryData) => {
      const { diary, user: _user } = await http.post<
        Partial<Diary>,
        { diary: Diary; user: User }
      >('/diaries/', {
        title,
        type,
        userId: user?.id,
      });

      if (diary && user) {
        dispatch(addDiary([diary] as Diary[]));
        dispatch(addDiary([diary] as Diary[]));
        dispatch(setUser(_user));

        onClose();

        toast({
          title: 'Diary created.',
          status: 'success',
          duration: 4000,
        });
      }
    },

    [user, toast, onClose, dispatch]
  );

  useEffect(() => {
    fetchDiaries();
  }, [fetchDiaries]);

  return (
    <>
      <Routes>
        <Route path="/diary/:id" element={<DiaryEntriesList />} />

        <Route
          path="/"
          element={
            <>
              <Button isFullWidth onClick={onOpen}>
                Create New
              </Button>
              {diaries.map((diary, idx) => (
                <DiaryTile key={idx} diary={diary} />
              ))}
            </>
          }
        />
      </Routes>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={handleSubmit(onCreateDiary)}>
            <ModalHeader>Create your Diary</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl isInvalid={!!errors.title}>
                <FormLabel>Diary Title</FormLabel>
                <Input
                  {...register('title', { required: 'Title Required!' })}
                />
                <FormErrorMessage>{errors.title?.message}</FormErrorMessage>
              </FormControl>

              <FormControl as="fieldset" mt={4}>
                <FormLabel as="legend">Private or public diary?</FormLabel>
                <Controller
                  name="type"
                  defaultValue="private"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <RadioGroup value={value} onChange={onChange}>
                      <HStack>
                        <Radio value="private">Private</Radio>
                        <Radio value="public">Public</Radio>
                      </HStack>
                    </RadioGroup>
                  )}
                />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button type="submit" colorScheme="blue" mr={3}>
                Save
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Diaries;
