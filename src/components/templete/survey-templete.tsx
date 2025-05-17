'use client';

import React, { useCallback } from 'react';

import { useTempleteStore } from '@/stores/use-templete-store';

import { ModifyQuestionBox, ModifyTitleBox } from '@/components/molecules';

import { SurveyContainer, ContentLayer, FloatingArea, FloatingButton } from '@/assets/styled';
import { toast } from '@/utils';

const SurveyTemplete = () => {
  const { templete, changeSubject, addQuestion } = useTempleteStore();
  /*****************************************************************************
   * ACTION / EVENT
   *****************************************************************************/

  /**
   * 질문 추가
   */
  const handleAddQuestion = useCallback(() => {
    if (templete.questions.length >= 20) {
      toast.error('질문은 최대 20개까지만 생성 가능합니다.');
      return;
    }
    const newData = addQuestion();
    setTimeout(() => {
      const el = document.getElementById(`question-${newData.id}`) as HTMLDivElement;
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  }, [templete, addQuestion]);

  /**
   * 헤더에 포함된 정보 변경(title, description)
   */
  const handleChangeHeader = useCallback(
    (title: string, description: string) => {
      changeSubject(title, description);
    },
    [changeSubject]
  );

  /*****************************************************************************
   * RENDER
   *****************************************************************************/

  return (
    <SurveyContainer>
      <ContentLayer>
        <ModifyTitleBox subject={templete.subject} description={templete.description} onChange={handleChangeHeader} />
        {templete.questions.map((question) => (
          <ModifyQuestionBox key={question.id} question={question} />
        ))}
      </ContentLayer>
      <FloatingArea>
        <FloatingButton onClick={handleAddQuestion}>+</FloatingButton>
      </FloatingArea>
    </SurveyContainer>
  );
};

export default SurveyTemplete;
