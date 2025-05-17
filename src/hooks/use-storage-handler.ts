'use client';

import { useMemo, useCallback } from 'react';
import { storage } from '@/utils';
import { Templete } from '@/stores/use-templete-store';

const TEMPLETE_KEY = 'templete-list';
const TEMP_KEY = 'temp-templete';

const useStorageHandler = () => {
  /******************************************************************************
   * TEMPLETE
   ******************************************************************************/
  const _get = useCallback(() => {
    const list = storage.get(TEMPLETE_KEY);
    return list || [];
  }, []);

  const _save = useCallback((list: Templete[]) => {
    storage.set(TEMPLETE_KEY, list);
  }, []);

  const getServeyList = useCallback(() => {
    try {
      const list = _get();
      return list || [];
    } catch (error) {
      console.error(error);
      return [];
    }
  }, [_get]);

  const getServey = useCallback(
    (id: string) => {
      const list = _get();
      return list.find((item: Templete) => item.id === id);
    },
    [_get]
  );

  const postServey = useCallback(
    (templete: Templete) => {
      try {
        const list = _get();
        _save([...list, templete]);
      } catch (error) {
        console.error(error);
      }
    },
    [_get, _save]
  );

  const deleteServey = useCallback(
    (id: string) => {
      try {
        const list = _get();
        const newList = list.filter((item: Templete) => item.id !== id);
        _save(newList);
      } catch (error) {
        console.error(error);
      }
    },
    [_get, _save]
  );

  const updateServey = useCallback(
    (templete: Templete) => {
      try {
        const list = _get();
        const newList = list.map((item: Templete) => (item.id === templete.id ? templete : item));
        _save(newList);
      } catch (error) {
        console.error(error);
      }
    },
    [_get, _save]
  );

  /******************************************************************************
   * TEMP
   ******************************************************************************/
  const postTempServey = useCallback((templete: Templete) => {
    storage.set(TEMP_KEY, templete);
  }, []);

  const getTempServey = useCallback(() => {
    const templete = storage.get(TEMP_KEY);
    return templete;
  }, []);

  const deleteTempServey = useCallback(() => {
    storage.del(TEMP_KEY);
  }, []);

  /******************************************************************************
   * RETURN FUNCTION
   ******************************************************************************/

  return useMemo(
    () => ({
      getServeyList,
      postServey,
      getServey,
      deleteServey,
      updateServey,
      postTempServey,
      getTempServey,
      deleteTempServey,
    }),
    [getServeyList, postServey, deleteServey, updateServey, getServey, postTempServey, getTempServey, deleteTempServey]
  );
};

export default useStorageHandler;
