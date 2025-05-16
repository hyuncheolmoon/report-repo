'use client';

import { Question, QuestionType } from '@/types';
import { generateUUID } from '@/utils';
import { create, StateCreator } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

type BaseDate = {
  createdAt?: string;
  updatedAt?: string;
};

export type Templete = BaseDate & {
  id: string;
  subject: string;
  description?: string;
  questions: Question[];
};

const defaultQuestion = {
  id: '',
  title: '',
  type: QuestionType.TEXTAREA,
  options: [],
  text: '',
  required: false,
};

type TempleteState = {
  templete: Templete;
  setTemplete: (templete: Templete) => void;
  createTemplete: () => void;
  changeSubject: (subject: string, description?: string) => void;
  addQuestion: () => Question;
  deleteQuestion: (id: string) => void;
  changeQuestion: (question: Question) => void;
  reset: () => void;
};

const templeteStoreInitializer: StateCreator<TempleteState> = (set, get) => ({
  templete: {
    id: '',
    subject: '',
    description: '',
    questions: [],
  },
  setTemplete: (templete: Templete) => {
    console.log('add templete', templete);
    set({
      templete: templete,
    });
  },
  reset: () => {
    console.log('reset templete');
    set({
      templete: {
        id: '',
        subject: '',
        description: '',
        questions: [],
      },
    });
  },
  createTemplete: () => {
    const newTemplete = {
      id: '',
      subject: '',
      description: '',
      questions: [{ ...defaultQuestion, id: generateUUID() }],
    };
    set({
      templete: newTemplete,
    });
  },
  changeSubject: (subject: string, description?: string) => {
    const raw = get().templete;
    console.log(subject, description);
    set({
      templete: {
        ...raw,
        subject,
        description,
      },
    });
  },
  changeDescription: (description: string) => {
    const raw = get().templete;
    set({
      templete: {
        ...raw,
        description,
      },
    });
  },
  addQuestion: () => {
    const raw = get().templete;
    const newQuestion = { ...defaultQuestion, id: generateUUID() };
    set({
      templete: {
        ...raw,
        questions: [...raw.questions, newQuestion],
      },
    });
    return newQuestion;
  },
  deleteQuestion: (id: string) => {
    const raw = get().templete;
    const newQuestions = raw.questions.filter((q) => q.id !== id);
    set({
      templete: {
        ...raw,
        questions: newQuestions,
      },
    });
  },
  changeQuestion: (question: Question) => {
    const raw = get().templete;
    const newQuestionss = raw.questions.map((q) => (q.id === question.id ? question : q));
    set({
      templete: {
        ...raw,
        questions: newQuestionss,
      },
    });
  },
});

export const useTempleteStore = create<TempleteState>()(subscribeWithSelector(templeteStoreInitializer));
