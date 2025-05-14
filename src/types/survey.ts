enum QuestionType {
    TEXT = 'text',
    TEXTAREA = 'textarea',
    RADIO = 'radio',
    SELECT = 'select',
    CHECKBOX = 'checkbox',
}

interface QuestionOption {
    id: string;
    label: string;
    value?: string;
}

interface Question {
    type: QuestionType;
    id: string;
    title: string;
    options: Array<QuestionOption>;
    required: boolean;
}

export type { Question };