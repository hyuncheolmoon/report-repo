import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ModifyTitleBox from '../modify-title-box';

describe('설문지 제목 및 설명(ModifyTitleBox)', () => {
  const mockOnChange = jest.fn();

  beforeEach(() => {
    mockOnChange.mockClear();
  });

  describe('렌더링', () => {
    it('기본 입력 폼 출력', () => {
      render(<ModifyTitleBox onChange={mockOnChange} />);

      expect(screen.getByTestId('survey-subject')).toBeInTheDocument();
      expect(screen.getByTestId('survey-description')).toBeInTheDocument();
    });

    it('데이터 출력', () => {
      const subject = '테스트 제목';
      const description = '테스트 설명';

      render(<ModifyTitleBox subject={subject} description={description} onChange={mockOnChange} />);

      expect(screen.getByDisplayValue(subject)).toBeInTheDocument();
      expect(screen.getByDisplayValue(description)).toBeInTheDocument();
    });
  });

  describe('제목 변경', () => {
    it('내용 변경', () => {
      render(<ModifyTitleBox onChange={mockOnChange} />);

      const titleInput = screen.getByTestId('survey-subject').querySelector('input');
      fireEvent.change(titleInput!, { target: { value: '새로운 제목' } });
      fireEvent.blur(titleInput!);

      expect(mockOnChange).toHaveBeenCalledWith('새로운 제목', '');
    });

    it('긴 텍스트 가능 여부', () => {
      render(<ModifyTitleBox onChange={mockOnChange} />);

      const longText = 'a'.repeat(1000);
      const titleInput = screen.getByTestId('survey-subject').querySelector('input');

      fireEvent.change(titleInput!, { target: { value: longText } });
      fireEvent.blur(titleInput!);

      expect(mockOnChange).toHaveBeenCalledWith(longText, '');
    });
  });

  it('설명 변경', () => {
    render(<ModifyTitleBox onChange={mockOnChange} />);

    const descInput = screen.getByTestId('survey-description').querySelector('textarea');
    fireEvent.change(descInput!, { target: { value: '새로운 설명' } });
    fireEvent.blur(descInput!);

    expect(mockOnChange).toHaveBeenCalledWith('', '새로운 설명');
  });
});
