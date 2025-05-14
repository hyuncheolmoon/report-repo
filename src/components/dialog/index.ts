type DialogTmplHandler<T = unknown> = {
  open: (data?: T) => void;
  close: () => void;
};

export type { DialogTmplHandler };
