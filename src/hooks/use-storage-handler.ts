'use client';

import { useMemo, useCallback } from 'react';
import { storage } from '@/utils';
import { Templete } from '@/stores/use-templete-store';

const TEMPLETE_KEY = 'templete-list';

const useStorageHandler = () => {

    /******************************************************************************
     * INIT
     ******************************************************************************/
    const _get = useCallback(() => {
        const list = storage.get(TEMPLETE_KEY);
        return list || [];
    }, []);

    const _save = useCallback((list: Templete[]) => {
        storage.set(TEMPLETE_KEY, list);
    }, []);

    /******************************************************************************
     * SERVER REQUEST
     ******************************************************************************/

    const getServeyList = useCallback(() => {
        try {
            const list = _get();
            return list || [];
        } catch (error) {
            console.error(error);
            return [];
        }
    }, []);

    const postServey = useCallback((templete: Templete) => {
        try {
            const list = _get();
            _save([...list, templete]);
        } catch (error) {
            console.error(error);
        }
    }, []);

    const deleteServey = useCallback((id: string) => {
        try {
            const list = _get();
            const newList = list.filter((item: Templete) => item.id !== id);
            _save(newList);
        } catch (error) {
            console.error(error);
        }
    }, []);

    /******************************************************************************
     * RETURN FUNCTION
     ******************************************************************************/

    return useMemo(
        () => ({
            getServeyList,
            postServey,
            deleteServey,
        }),
        [
            getServeyList,
            postServey,
            deleteServey,
        ],
    );
};

export default useStorageHandler;
