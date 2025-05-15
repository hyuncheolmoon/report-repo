import { OptionItem, Question, QuestionType } from '@/types';
import { generateUUID } from '@/utils';
import { StateCreator } from 'zustand';
import { create } from 'zustand';




export type Templete = {
  id: string;
  subject: string;
  description?: string;
  questions: Question[];
}

const defaultQuestion = {
  id: '',
  title: '',
  type: QuestionType.TEXTAREA,
  options: [],
  text: '',
  required: false
}

const defaultOption = {
  id: '',
  content: '',
}


type TempleteState = {
  templete: Templete;
  set: (templete: Templete) => void;
  createTemplete: () => void;
  changeSubject: (subject: string) => void;
  changeDescription: (description: string) => void;
  addQuestion: () => void;
  deleteQuestion: (id: string) => void;
  changeQuestion: (question: Question) => void;
}


const templeteStoreInitializer: StateCreator<TempleteState> = (set, get) => ({
  templete: {
    id: '',
    subject: '',
    description: '',
    questions: [],
  },
  set: (templete: Templete) => {
    set({
      templete,
    });
  },
  createTemplete: () => {
    const newTemplete = {
      id: generateUUID(),
      subject: '',
      description: '',
      questions: [{ ...defaultQuestion, id: generateUUID() }],
    };
    set({
      templete: newTemplete,
    });
  },
  changeSubject: (subject: string) => {
    const raw = get().templete
    set({
      templete: {
        ...raw,
        subject,
      },
    });
  },
  changeDescription: (description: string) => {
    const raw = get().templete
    set({
      templete: {
        ...raw,
        description,
      },
    });
  },
  addQuestion: () => {
    const raw = get().templete
    set({
      templete: {
        ...raw,
        questions: [...get().templete.questions, { ...defaultQuestion, id: generateUUID() }],
      },
    });
  },
  deleteQuestion: (id: string) => {
    const raw = get().templete
    set({
      templete: {
        ...raw,
        questions: raw.questions.filter(q => q.id !== id),
      },
    });
  },
  changeQuestion: (question: Question) => {
    const raw = get().templete
    set({
      templete: {
        ...raw,
        questions: raw.questions.map(q => q.id === question.id ? question : q),
      },
    });
  },
});

export const useTempleteStore = create<TempleteState>(templeteStoreInitializer);
