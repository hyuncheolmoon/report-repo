import { Question } from './question';

interface BaseDate {
  createdAt?: string;
  updatedAt?: string;
}

export interface Survey extends BaseDate {
  id: string;
  subject: string;
  description: string;
  questions: Question[];
}
