// import CreateTempleteDialog from './create-templete';

type DialogTmplHandler<T = unknown> = {
  open: (data?: T) => void;
  close: () => void;
};

// export { CreateTempleteDialog };
export type { DialogTmplHandler };
