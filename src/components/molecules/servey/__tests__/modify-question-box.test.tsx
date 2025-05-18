import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ModifyQuestionBox from '../modify-question-box';
import { QuestionType } from '@/types';
import { useTempleteStore } from '@/stores/use-templete-store';
import { toast } from '@/utils';

const mockConfirm = jest.fn(() => Promise.resolve(true));
const mockDeleteQuestion = jest.fn();

jest.mock('@/stores/use-templete-store', () => ({
  useTempleteStore: jest.fn(),
}));

jest.mock('@/utils', () => ({
  toast: {
    error: jest.fn(),
  },
}));

jest.mock('@/contexts/confirm-context', () => ({
  ConfirmProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  useConfirmDialog: () => ({
    confirm: mockConfirm,
  }),
}));

describe('질문 추가 및 삭제(ModifyQuestionBox)', () => {
  const defaultQuestion = {
    id: '1',
    title: '테스트 질문',
    type: QuestionType.TEXTAREA,
    required: false,
    options: [{ id: '1', content: '옵션 1' }],
  };

  const renderComponent = (question = defaultQuestion) => {
    return render(<ModifyQuestionBox question={question} />);
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useTempleteStore as unknown as jest.Mock).mockReturnValue({
      templete: {
        questions: [defaultQuestion],
      },
      deleteQuestion: mockDeleteQuestion,
      changeQuestion: jest.fn(),
    });
  });

  describe('렌더링', () => {
    it('기본 입력 폼 출력', () => {
      renderComponent();

      expect(screen.getByTestId('question-title-1')).toBeInTheDocument();
      expect(screen.getByTestId('question-delete-1')).toBeInTheDocument();
    });

    it('데이터 출력', () => {
      renderComponent();
      const titleInput = screen.getByTestId('question-title-1').querySelector('input');

      expect(titleInput).toHaveValue('테스트 질문');
    });
  });

  it('내용 변경', async () => {
    renderComponent();
    const titleInput = screen.getByTestId('question-title-1').querySelector('input');

    if (!titleInput) throw new Error('Title input not found');

    await userEvent.clear(titleInput);
    await userEvent.type(titleInput, '새로운 질문 제목');

    expect(titleInput).toHaveValue('새로운 질문 제목');
  });

  describe('질문 삭제', () => {
    it('삭제', async () => {
      (useTempleteStore as unknown as jest.Mock).mockReturnValue({
        templete: {
          questions: [defaultQuestion, { ...defaultQuestion, id: '2', title: '두 번째 질문' }],
        },
        deleteQuestion: mockDeleteQuestion,
        changeQuestion: jest.fn(),
      });

      renderComponent();
      const deleteButton = screen.getByTestId('question-delete-1');

      await userEvent.click(deleteButton);

      expect(mockConfirm).toHaveBeenCalledWith('삭제하시겠습니까?');
      await waitFor(() => {
        expect(mockDeleteQuestion).toHaveBeenCalledWith('1');
      });
    });

    it('삭제 불가', async () => {
      renderComponent();
      const deleteButton = screen.getByTestId('question-delete-1');

      await userEvent.click(deleteButton);

      expect(toast.error).toHaveBeenCalledWith('한가지 이상의 질문이 필요합니다.');
      expect(mockDeleteQuestion).not.toHaveBeenCalled();
    });

    it('삭제 취소', async () => {
      mockConfirm.mockResolvedValueOnce(false);
      (useTempleteStore as unknown as jest.Mock).mockReturnValue({
        templete: {
          questions: [defaultQuestion, { ...defaultQuestion, id: '2', title: '두 번째 질문' }],
        },
        deleteQuestion: mockDeleteQuestion,
        changeQuestion: jest.fn(),
      });

      renderComponent();
      const deleteButton = screen.getByTestId('question-delete-1');

      await userEvent.click(deleteButton);

      expect(mockConfirm).toHaveBeenCalledWith('삭제하시겠습니까?');
      expect(mockDeleteQuestion).not.toHaveBeenCalled();
    });
  });
});
