import { StateCreator } from 'zustand';
import { create } from 'zustand';



interface TempleteState {
  templeteList: any[];
  set: (data: any) => void;
}

const templeteStoreInitializer: StateCreator<TempleteState> = set => ({
  templeteList: [],
  set: ({
    templeteList,
  }: {
    templeteList: any[];
  }) => {
    set({
      templeteList,
    });
  },
  //fetchData: async () => {
  //  try {
  //    set({
  //      templeteList: [],
  //    });
  //  } catch (error) {
  //    window.location.href = '/';
  //  }
  //},
});

export const useTempleteStore = create<TempleteState>(templeteStoreInitializer);
