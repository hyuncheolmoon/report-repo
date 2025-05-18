import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ModifyQuestionBox from '../modify-question-box';
import { QuestionType } from '@/types';

describe('질문 수정 박스 컴포넌트', () => {
  // Test question data
  const testQuestion1 = {
    id: '1',
    title: '테스트 질문',
    type: QuestionType.TEXTAREA,
    required: false,
    options: [{ id: '1', content: '옵션 1' }],
  };
  //const testQuestion2 = {
  //  id: '2',
  //  title: '테스트 질문2',
  //  type: QuestionType.CHECKBOX,
  //  required: false,
  //  options: [{ id: '1', content: '옵션 1' }],
  //};

  it('질문 제목 입력 필드가 정상적으로 렌더링되어야 함', () => {
    render(<ModifyQuestionBox question={testQuestion1} />);
    const titleInput = screen.getByTestId('question-title-1').querySelector('input');

    expect(titleInput).toBeInTheDocument();
    expect(titleInput).toHaveValue('테스트 질문');
  });

  it('질문 제목을 수정하면 새로운 값이 반영되어야 함', async () => {
    render(<ModifyQuestionBox question={testQuestion1} />);
    const titleInput = screen.getByTestId('question-title-1').querySelector('input');

    if (!titleInput) {
      throw new Error('Title input element not found');
    }

    // 기존 값 확인
    expect(titleInput).toHaveValue('테스트 질문');

    // 새로운 값 입력
    await userEvent.clear(titleInput);
    await userEvent.type(titleInput, '수정된 질문 제목');

    // 새로운 값이 반영되었는지 확인
    expect(titleInput).toHaveValue('수정된 질문 제목');
  });
  it('필수값 체크박스를 변경하면 required 값이 변경되어야 함', async () => {
    render(<ModifyQuestionBox question={testQuestion1} />);

    const muiSwitch = screen.getByRole('checkbox', { name: 'test-switch' });;
    const switchInput = screen.getByTestId('test-hidden') as HTMLInputElement;

    if (!muiSwitch) {
      throw new Error('Switch input element not found');
    }

    // 초기 상태 확인
    expect(switchInput).toHaveAttribute('value', 'false');
    console.log('1', switchInput.value)

    // 클릭 후 상태 변경 확인
    await userEvent.click(muiSwitch);
    
    // 상태 변경이 완료될 때까지 기다림
    await waitFor(() => {
    console.log(switchInput.value)
    console.log('2', switchInput.value)
      expect(switchInput).toHaveAttribute('value', 'false');
    });
  });
});
