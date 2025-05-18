import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ModifyOptionItem from '../modify-option-item';
import { useTempleteStore } from '@/stores/use-templete-store';
import { QuestionType } from '@/types';

jest.mock('@/stores/use-templete-store', () => ({
  useTempleteStore: jest.fn(),
}));

describe('질문 옵션(ModifyOptionItem)', () => {
  const mockQuestion = {
    id: '1',
    type: QuestionType.CHECKBOX,
    title: '테스트 질문',
    required: false,
    options: [
      { id: '1', content: '옵션 1' },
      { id: '2', content: '옵션 2' },
    ],
  };

  const mockChangeQuestion = jest.fn();

  beforeEach(() => {
    (useTempleteStore as unknown as jest.Mock).mockReturnValue({
      changeQuestion: mockChangeQuestion,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('렌더링', () => {
    render(<ModifyOptionItem question={mockQuestion} />);

    expect(screen.getByTestId('option-item-0')).toBeInTheDocument();
    expect(screen.getByTestId('option-item-1')).toBeInTheDocument();
    expect(screen.getByDisplayValue('옵션 1')).toBeInTheDocument();
    expect(screen.getByDisplayValue('옵션 2')).toBeInTheDocument();
  });

  it('추가', async () => {
    render(<ModifyOptionItem question={mockQuestion} />);

    const addButton = screen.getByText('옵션 추가');
    await userEvent.click(addButton);

    expect(mockChangeQuestion).toHaveBeenCalledWith({
      ...mockQuestion,
      options: [
        ...mockQuestion.options,
        expect.objectContaining({
          content: '옵션 3',
        }),
      ],
    });
  });

  it('삭제', async () => {
    render(<ModifyOptionItem question={mockQuestion} />);

    const deleteButtons = screen.getAllByRole('button', { name: '' });
    await userEvent.click(deleteButtons[0]);

    expect(mockChangeQuestion).toHaveBeenCalledWith({
      ...mockQuestion,
      options: [mockQuestion.options[1]],
    });
  });

  it('마지막 옵션 삭제 불가', async () => {
    const singleOptionQuestion = {
      ...mockQuestion,
      options: [{ id: '1', content: '옵션 1' }],
    };

    render(<ModifyOptionItem question={singleOptionQuestion} />);

    const deleteButton = screen.getByRole('button', { name: '' });
    await userEvent.click(deleteButton);

    expect(mockChangeQuestion).not.toHaveBeenCalled();
  });

  it('내용 변경', async () => {
    render(<ModifyOptionItem question={mockQuestion} />);

    const input = screen.getByDisplayValue('옵션 1');
    await userEvent.clear(input);
    await userEvent.type(input, '새로운 옵션');
    fireEvent.blur(input);

    expect(mockChangeQuestion).toHaveBeenCalledWith({
      ...mockQuestion,
      options: [{ id: '1', content: '새로운 옵션' }, mockQuestion.options[1]],
    });
  });

  it('빈값 예외처리', async () => {
    render(<ModifyOptionItem question={mockQuestion} />);

    const input = screen.getByDisplayValue('옵션 1');
    await userEvent.clear(input);
    fireEvent.blur(input);

    expect(mockChangeQuestion).toHaveBeenCalledWith({
      ...mockQuestion,
      options: [{ id: '1', content: '옵션 1' }, mockQuestion.options[1]],
    });
  });
});
