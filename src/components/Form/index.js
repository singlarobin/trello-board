import classes from './styles.module.css';
import Input from '../Input';
import Button from '../Button';
import { useCallback, useState, useRef, useEffect } from 'react';
import { emptyValueCheck } from '../../utils';

const Form = props => {

    const { isList, handleFormClose, handleAddData } = props;
    const [listName, setListName] = useState('');
    const [cardName, setCardName] = useState('');
    const [cardDescription, setCardDescription] = useState('');
    const node = useRef();

    const handleClick = useCallback(e => {
        if (node.current.contains(e.target)) {
            // inside click
            return;
        }
        // outside click 
        handleFormClose();
    }, [handleFormClose]);

    useEffect(() => {
        document.addEventListener("mousedown", handleClick);
        // return function to be called when unmounted
        return () => {
            document.removeEventListener("mousedown", handleClick);
        };
    }, [handleClick]);

    const handleListNameChange = useCallback(value => setListName(value), []);
    const handleCardNameChange = useCallback(value => setCardName(value), []);
    const handleCardDescriptionChange = useCallback(value => setCardDescription(value), []);

    const handleAddButtonClick = useCallback(() => {
        const cardList = (!emptyValueCheck(cardName)) && (!emptyValueCheck(cardDescription)) ?
            { title: cardName, description: cardDescription, date: new Date().toString() } : null;

        if (!isList && emptyValueCheck(cardList)) {
            alert('Missing Card Name or Description!!');
            return;
        }

        if(isList && emptyValueCheck(listName)){
            alert('Missing List Name!!');
            return;
        }
        const listItem = isList ? { title: listName, cardList: emptyValueCheck(cardList) ? [] : [cardList] } : cardList;
        handleFormClose();
        handleAddData(listItem);
    }, [handleFormClose, handleAddData, listName, cardName, cardDescription, isList]);

    return <div ref={node} className={classes.container}>
        {isList && <Input inputValue={listName} placeholderValue={'Enter List Name'} rows={1} handleInputChange={handleListNameChange}
            style={{ marginBottom: '1rem' }} />}
        <Input inputValue={cardName} placeholderValue={'Enter Card Name'} rows={1} handleInputChange={handleCardNameChange}
            style={{ marginBottom: '1rem' }} />
        <Input inputValue={cardDescription} placeholderValue={'Enter Description'} rows={4} handleInputChange={handleCardDescriptionChange}
            style={{ marginBottom: '1rem' }} />
        <Button onClick={handleAddButtonClick} style={{ width: '4rem' }}>
            ADD
        </Button>
    </div>
}

export default Form;