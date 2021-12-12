import { useGameContext } from 'src/contexts/GameContext';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import { getQuestionCacheKeys } from 'src/utils/cache-keys';
import { GETQuestions } from 'src/utils/types';
import { getRandomQuestionId } from 'src/utils/getRandomQuestionId';

export const useGetRandomQuestion = () => {
  const [questionId, setQuestionId] = useState<number>(null);
  const { setCorrectWords } = useGameContext();

  useEffect(() => {
    setQuestionId(getRandomQuestionId());
  }, []);

  const { data, isLoading, isSuccess } = useQuery(
    getQuestionCacheKeys(questionId),
    async () => {
      const { data: question } = await axios.get<GETQuestions[]>(`http://localhost:8000/questions?id=${questionId}`);

      if (question.length !== 1) throw Error('multiple records with the same id');

      setCorrectWords(question[0].good_words);
      return question[0];
    },
    {
      enabled: Boolean(questionId)
    }
  );

  return { data, isLoading, isSuccess };
};
