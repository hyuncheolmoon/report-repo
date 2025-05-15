'use client';

import React, { useCallback, useEffect } from 'react';
import { QuestionType } from '@/types/survey';

export interface Items {
    id: string;
    title: string;
    checked?: boolean;
}

const defaultItem: Items = {
    id: '',
    title: '옵션 1'
};


const ListItem = ({ type, items }: { type: QuestionType, items: Items[] }) => {

    useEffect


    useEffect(() => {
        handleAddItem();
    }, []);

    const handleAddItem = useCallback(() => {


    }, [])


    return (
        <>dkd</>
    );
};

export default ListItem;
