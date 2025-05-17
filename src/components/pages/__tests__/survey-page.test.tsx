import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import SurveyPage from '../survey-page';
import * as hooks from '@/hooks/use-storage-handler';
import { Templete } from '@/stores/use-templete-store';
import { QuestionType } from '@/types/survey';

const mockList: Templete[] = [
  {
    id: 't1EPnfUWDIHV',
    subject: '테스트 설문지 1',
    description: '테스트 설문지 설명',
    questions: [
      { id: 'Cj44dEXQJOMv', title: '테스트 1번', type: QuestionType.TEXTAREA, options: [], text: '', required: true },
      {
        id: 'QxOVJi3O592k',
        title: '123123',
        type: QuestionType.DROPDOWN,
        options: [{ id: 'ZA2IEdi1W5ME', content: '옵션 2' }],
        text: '',
        required: false,
      },
    ],
    createdAt: '2025-05-16 03:53:12',
    updatedAt: '2025-05-17 07:30:27',
  },
  {
    id: 'PuLuEP4fHGWS',
    subject: '테스트 설문지 2',
    description: '테스트 설문지 설명',
    questions: [
      { id: 'CmelZxyYcGik', title: 'fff', type: QuestionType.TEXTAREA, options: [], text: '', required: false },
      {
        id: 'c5C3LtX6e3W3',
        title: '두번째 질문',
        type: QuestionType.CHECKBOX,
        options: [{ id: '3yKAQqy2xrWY', content: '옵션 1' }],
        text: '',
        required: false,
      },
    ],
    createdAt: '2025-05-16 06:14:48',
    updatedAt: '2025-05-16 06:14:59',
  },
];

jest.mock('@/hooks/use-storage-handler');

const mockUseStorageHandler = hooks.default as jest.Mock;

beforeEach(() => {
  mockUseStorageHandler.mockReturnValue({
    getServeyList: () => mockList,
    deleteTempServey: jest.fn(),
  });
});

describe('SurveyPage', () => {
  it('리스트가 정상적으로 출력된다', () => {
    render(<SurveyPage />);
    expect(screen.getByText('테스트 설문지 1')).toBeInTheDocument();
    expect(screen.getByText('테스트 설문지 2')).toBeInTheDocument();
    expect(screen.getByText('설문지: 2 개')).toBeInTheDocument();
  });

  it('검색어 입력 시 필터링된 리스트가 출력된다', () => {
    render(<SurveyPage />);
    const input = screen.getByPlaceholderText('검색어를 입력하세요');
    fireEvent.change(input, { target: { value: '설문지 1' } });
    expect(screen.getByText('테스트 설문지 1')).toBeInTheDocument();
    expect(screen.queryByText('테스트 설문지 2')).not.toBeInTheDocument();
    expect(screen.getByText('설문지: 2 개')).toBeInTheDocument(); // 전체 개수는 변하지 않음
  });

  //it('첫 번째 설문지 삭제 버튼 클릭 시 확인 창이 표시되고, 확인 시 리스트에서 사라진다', () => {
  //  render(<SurveyPage />);
  //  const deleteButtons = screen.getAllByRole('button', { name: '' });
  //  console.log(deleteButtons);
  //  fireEvent.click(deleteButtons[0]);
  //  window.confirm = jest.fn(() => true);
  //  // expect(screen.queryByText('테스트 설문지 1')).not.toBeInTheDocument();
  //});
});
