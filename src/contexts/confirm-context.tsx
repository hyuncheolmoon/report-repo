import React, { createContext, useContext, useState, useCallback } from 'react';
import ConfirmDialog from '@/components/dialog/confirm-dialog';

interface ContextType {
  confirm: (message: string, title?: string) => Promise<boolean>;
}

const ConfirmContext = createContext<ContextType | null>(null);

export const useConfirmDialog = () => {
  const context = useContext(ConfirmContext);
  if (!context) {
    throw new Error('error');
  }
  return context;
};

interface ProviderProps {
  children: React.ReactNode;
}

export const ConfirmProvider = ({ children }: ProviderProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [resolve, setResolve] = useState<((value: boolean) => void) | null>(null);

  const confirm = useCallback((message: string, title: string = '확인') => {
    setMessage(message);
    setTitle(title);
    setOpen(true);
    return new Promise<boolean>((resolve) => {
      setResolve(() => resolve);
    });
  }, []);

  const handleConfirm = useCallback(
    (value: boolean) => {
      setOpen(false);
      resolve?.(value);
    },
    [resolve]
  );

  return (
    <ConfirmContext.Provider value={{ confirm }}>
      {children}
      <ConfirmDialog open={open} title={title} message={message} onConfirm={handleConfirm} />
    </ConfirmContext.Provider>
  );
};
