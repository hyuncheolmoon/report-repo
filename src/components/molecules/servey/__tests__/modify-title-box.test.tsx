import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ModifyTitleBox from '../modify-title-box';

describe('ModifyTitleBox 컴포넌트', () => {
  const mockOnChange = jest.fn();

  beforeEach(() => {
    mockOnChange.mockClear();
  });

  it('기본 props로 렌더링되어야 한다', () => {
    render(<ModifyTitleBox onChange={mockOnChange} />);
    
    expect(screen.getByTestId('survey-subject')).toBeInTheDocument();
    expect(screen.getByTestId('survey-description')).toBeInTheDocument();
  });

  it('제공된 제목과 설명이 올바르게 표시되어야 한다', () => {
    const subject = '테스트 제목';
    const description = '테스트 설명';
    
    render(
      <ModifyTitleBox 
        subject={subject} 
        description={description} 
        onChange={mockOnChange} 
      />
    );
    
    expect(screen.getByDisplayValue(subject)).toBeInTheDocument();
    expect(screen.getByDisplayValue(description)).toBeInTheDocument();
  });

  it('제목이 변경되면 onChange 콜백이 호출되어야 한다', () => {
    render(<ModifyTitleBox onChange={mockOnChange} />);
    
    const titleInput = screen.getByTestId('survey-subject').querySelector('input');
    fireEvent.change(titleInput!, { target: { value: '새로운 제목' } });
    fireEvent.blur(titleInput!);
    
    expect(mockOnChange).toHaveBeenCalledWith('새로운 제목', '');
  });

  it('설명이 변경되면 onChange 콜백이 호출되어야 한다', () => {
    render(<ModifyTitleBox onChange={mockOnChange} />);
    
    const descInput = screen.getByTestId('survey-description').querySelector('textarea');
    fireEvent.change(descInput!, { target: { value: '새로운 설명' } });
    fireEvent.blur(descInput!);
    
    expect(mockOnChange).toHaveBeenCalledWith('', '새로운 설명');
  });

  it('긴 텍스트 입력 시에도 올바르게 동작해야 한다', () => {
    render(<ModifyTitleBox onChange={mockOnChange} />);
    
    const longText = 'a'.repeat(1000);
    const titleInput = screen.getByTestId('survey-subject').querySelector('input');
    
    fireEvent.change(titleInput!, { target: { value: longText } });
    fireEvent.blur(titleInput!);
    
    expect(mockOnChange).toHaveBeenCalledWith(longText, '');
  });

});
