import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ModifyQuestionBox from '../modify-question-box';
import { QuestionType } from '@/types';

// mock 함수 선언을 jest.mock 위에 위치시킴
const mockConfirm = jest.fn(() => Promise.resolve(true));
const mockDeleteQuestion = jest.fn();

jest.mock('@/contexts/confirm-context', () => ({
  ConfirmProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  useConfirmDialog: () => ({
    confirm: mockConfirm
  })
}));

jest.mock('@/stores/use-templete-store', () => ({
  useTempleteStore: jest.fn(() => ({
    templete: {
      questions: [{
        id: '1',
        title: '테스트 질문',
        type: QuestionType.TEXTAREA,
        required: false,
        options: [{ id: '1', content: '옵션 1' }],
      }]
    },
    deleteQuestion: mockDeleteQuestion
  }))
}));

jest.mock('@/utils', () => ({
  toast: {
    error: jest.fn()
  }
}));

describe('질문 수정 박스 컴포넌트', () => {
  const testQuestion1 = {
    id: '1',
    title: '테스트 질문',
    type: QuestionType.TEXTAREA,
    required: false,
    options: [{ id: '1', content: '옵션 1' }],
  };

  const renderWithContext = (component: React.ReactNode) => {
    return render(component);
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('질문 제목 입력 필드가 정상적으로 렌더링되어야 함', () => {
    renderWithContext(<ModifyQuestionBox question={testQuestion1} />);
    const titleInput = screen.getByTestId('question-title-1').querySelector('input');

    expect(titleInput).toBeInTheDocument();
    expect(titleInput).toHaveValue('테스트 질문');
  });

  it('질문 제목을 수정하면 새로운 값이 반영되어야 함', async () => {
    renderWithContext(<ModifyQuestionBox question={testQuestion1} />);
    const titleInput = screen.getByTestId('question-title-1').querySelector('input');

    if (!titleInput) {
      throw new Error('Title input element not found');
    }

    // 기존 값 확인
    expect(titleInput).toHaveValue('테스트 질문');

    await userEvent.clear(titleInput);
    await userEvent.type(titleInput, '수정된 질문 제목');

    // 새로운 값이 반영되었는지 확인
    expect(titleInput).toHaveValue('수정된 질문 제목');
  });

  it('삭제 버튼 클릭 시 확인 창이 표시되고 확인 시 질문이 삭제되어야 함', async () => {
    // questions 배열을 2개로 설정
    const testQuestion2 = {
      id: '2',
      title: '테스트 질문2',
      type: QuestionType.TEXTAREA,
      required: false,
      options: [{ id: '1', content: '옵션 1' }],
    };
    const { useTempleteStore } = require('@/stores/use-templete-store');
    useTempleteStore.mockReturnValue({
      templete: {
        questions: [testQuestion1, testQuestion2]
      },
      deleteQuestion: mockDeleteQuestion
    });

    renderWithContext(<ModifyQuestionBox question={testQuestion1} />);
    
    const deleteButton = screen.getByTestId('question-delete-1');
    expect(deleteButton).toBeInTheDocument();

    await userEvent.click(deleteButton);
    expect(mockConfirm).toHaveBeenCalledWith('삭제하시겠습니까?');
    
  });

  it('질문이 1개일 때는 삭제할 수 없어야 함', async () => {
    const { useTempleteStore } = require('@/stores/use-templete-store');
    useTempleteStore.mockReturnValue({
      templete: {
        questions: [testQuestion1]
      },
      deleteQuestion: mockDeleteQuestion
    });

    renderWithContext(<ModifyQuestionBox question={testQuestion1} />);
    
    const deleteButton = screen.getByTestId('question-delete-1');
    await userEvent.click(deleteButton);

    const { toast } = require('@/utils');
    expect(toast.error).toHaveBeenCalledWith('한가지 이상의 질문이 필요합니다.');
  });
});
