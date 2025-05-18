import React, { useCallback, useEffect } from 'react';
import { Dialog, Button } from '@mui/material';
import styled from '@emotion/styled';
import { palette } from '@/constants';

interface ConfirmDialogProps {
  open: boolean;
  title?: string;
  message: string;
  onConfirm: (value: boolean) => void;
  options?: {
    confirmText?: string;
    cancelText?: string;
  };
}

const ConfirmDialog = ({ open, title = '', message, onConfirm }: ConfirmDialogProps) => {
  const handleConfirm = useCallback(() => {
    onConfirm(true);
  }, [onConfirm]);

  const handleCancel = useCallback(() => {
    onConfirm(false);
  }, [onConfirm]);

  useEffect(() => {
    if (open) {
      setTimeout(() => {
        const confirmBtn = document.getElementById('confirm-btn');
        confirmBtn?.focus();
      }, 100);
    }
  }, [open]);

  /*****************************************************************************
   * RENDER
   *****************************************************************************/

  return (
    <Dialog open={open} onClose={handleCancel} maxWidth="xs" fullWidth>
      <Title>{title}</Title>
      <Message>{message}</Message>
      <FooterBtnGroup>
        <CancelBtn data-testid="cancel-btn" onClick={handleCancel}>
          취소
        </CancelBtn>
        <ConfirmBtn id="confirm-btn" data-testid="confirm-btn" onClick={handleConfirm} autoFocus>
          확인
        </ConfirmBtn>
      </FooterBtnGroup>
    </Dialog>
  );
};

export default ConfirmDialog;

const Title = styled.div`
  margin: 0;
  padding: 20px 24px 12px;
  font-size: 18px;
  font-weight: 500;
  color: ${palette.gray900};
`;

const Message = styled.div`
  color: ${palette.gray800};
  font-size: 16px;
  padding: 12px 24px 18px;
  line-height: 1.5;
  white-space: pre-wrap;
`;

const CancelBtn = styled(Button)`
  background-color: ${palette.gray100};
  color: ${palette.gray700};

  &:hover {
    background-color: ${palette.gray200};
  }
`;

const ConfirmBtn = styled(Button)`
  background-color: ${palette.blue500};
  color: white;

  &:hover {
    background-color: ${palette.blue600};
  }
`;

const FooterBtnGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  padding: 8px 24px 12px;
  border-top: 1px solid ${palette.gray200};
`;
