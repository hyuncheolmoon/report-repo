'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { RiArrowDropDownLine, RiCheckboxBlankCircleLine, RiCloseCircleLine, RiDeleteBinLine } from 'react-icons/ri';
import { QuestionType, OptionItem } from '@/types/survey';
import { generateUUID, toast } from '@/utils';
import { TextInput } from '@/components/atoms';
import styled from '@emotion/styled';
import { Button } from '@mui/material';
import { palette } from '@/constants';

export const defaultItem: OptionItem = {
    id: '',
    title: '옵션',
    selected: false,
    checked: false
};

type ModifyOptionItemProps = {
    type: QuestionType;
    options: OptionItem[];
    onChange: (items: OptionItem[]) => void;
}

const ModifyOptionItem = ({ type, options, onChange }: ModifyOptionItemProps) => {

    const [items, setItems] = useState<OptionItem[]>(options);


    useEffect(() => {
        onChange(items);
    }, [items]);


    const handleAddItem = useCallback(() => {
        const item = { ...defaultItem, id: generateUUID() };
        setItems([...items, item]);

    }, [items]);

    const handleRemoveItem = useCallback((id: string) => {
        const newItems = items.filter(item => item.id !== id);
        if (newItems.length === 0) {
            toast.error('최소 하나 이상의 옵션이 필요합니다.');
            return;
        }
        setItems(newItems);
    }, [items]);

    const handleChangeItemText = useCallback((id: string, value: string) => {
        const newItems = items.map(item => item.id === id ? { ...item, title: value } : item);
        setItems(newItems);
    }, [items]);


    const renderItem = useCallback((item: OptionItem, index: number) => {

        return (
            <ListItem key={item.id}>
                <ItemDivison>
                    {type === QuestionType.CHECKBOX && <RiCheckboxBlankCircleLine />}
                    {type === QuestionType.DROPDOWN && index + 1}

                </ItemDivison>
                <ItemText>
                    <TextInput
                        value={item.title}
                        fullWidth
                        placeholder="내용을 입력하세요"
                        variant='filled'
                        onChange={(e) => handleChangeItemText(item.id, e.target.value)}
                    />
                    <DeleteBtn onClick={() => handleRemoveItem(item.id)}>
                        <RiCloseCircleLine />
                    </DeleteBtn>
                </ItemText>
            </ListItem>
        )
    }, [handleChangeItemText]);

    return (
        <ListContainer>
            <ItemsList>
                {items.map(renderItem)}
                <AddBtnbox>
                    <Button onClick={handleAddItem}>옵션 추가</Button>
                </AddBtnbox>
            </ItemsList>
        </ListContainer>

    );
};

export default ModifyOptionItem;

const ItemDivison = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    font-weight: 600;
    padding: 20px;
`;

const DeleteBtn = styled(Button)`
    font-size: 18px;
    color: ${palette.red200};
`;
const ItemText = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
`;

const ListItem = styled.div`
    display: flex;
    flex-direction: row;
`;

const ItemsList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const AddBtnbox = styled.div`
    text-align: left;
`;

const ListContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;


