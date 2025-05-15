export enum QuestionType {
    TEXTAREA = 'TEXTAREA',
    DROPDOWN = 'DROPDOWN',
    CHECKBOX = 'CHECKBOX',
}

export enum QuestionTypeLabel {
    TEXTAREA = '텍스트',
    DROPDOWN = '드롭박스',
    CHECKBOX = '체크박스',
}


export interface Question<T extends unknown> {
    id: string;
    type: QuestionType;
    title?: string;
    text?: string;
    options: T[];
    required: boolean;
}
