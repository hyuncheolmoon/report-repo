'use client';

import { Survey, Question, QuestionType } from '@/types';
import { generateUUID } from '@/utils';
import { create, StateCreator } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

const defaultSurvey = {
  id: '',
  subject: '',
  description: '',
  questions: [],
};

const defaultQuestion = {
  id: '',
  title: '',
  type: QuestionType.TEXTAREA,
  options: [],
  required: false,
};

type TempleteState = {
  templete: Survey;
  setTemplete: (templete: Survey) => void;
  createTemplete: () => void;
  changeSubject: (subject: string, description?: string) => void;
  addQuestion: () => Question;
  deleteQuestion: (id: string) => void;
  changeQuestion: (question: Question) => void;
  reset: () => void;
};

const templeteStoreInitializer: StateCreator<TempleteState> = (set, get) => ({
  templete: { ...defaultSurvey },
  setTemplete: (templete: Survey) => {
    set({
      templete: templete,
    });
  },
  reset: () => {
    set({
      templete: { ...defaultSurvey },
    });
  },
  createTemplete: () => {
    const newTemplete = { ...defaultSurvey, questions: [{ ...defaultQuestion, id: generateUUID() }] };
    set({
      templete: newTemplete,
    });
  },
  changeSubject: (subject: string, description?: string) => {
    const { templete } = get();
    set({
      templete: {
        ...templete,
        subject,
        description: description || '',
      },
    });
  },
  changeDescription: (description: string) => {
    const { templete } = get();
    set({
      templete: {
        ...templete,
        description,
      },
    });
  },
  addQuestion: () => {
    const { templete } = get();
    const newQuestion = { ...defaultQuestion, id: generateUUID() };
    set({
      templete: {
        ...templete,
        questions: [...templete.questions, newQuestion],
      },
    });
    return newQuestion;
  },
  deleteQuestion: (id: string) => {
    const { templete } = get();
    const newQuestions = templete.questions.filter((q) => q.id !== id);
    if (newQuestions.length === 0) {
      return;
    }
    set({
      templete: {
        ...templete,
        questions: newQuestions,
      },
    });
  },
  changeQuestion: (question: Question) => {
    const { templete } = get();
    const newQuestionss = templete.questions.map((q) => (q.id === question.id ? question : q));
    set({
      templete: {
        ...templete,
        questions: newQuestionss,
      },
    });
  },
});

export const useTempleteStore = create<TempleteState>()(subscribeWithSelector(templeteStoreInitializer));
