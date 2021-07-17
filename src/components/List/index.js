import classes from './styles.module.css';
import Card from '../Card';
import IconButton from '../IconButton';
import AddIcon from '../assets/addIcon';
import DeleteIcon from '../assets/deleteIcon';
import Form from '../Form';
import { useCallback, useState } from 'react';
import { emptyValueCheck } from '../../utils';

const List = props => {
    const { index, listValue, handleListDelete, handleCardAddButton, handleCardDeleteButton } = props;
    const [openForm, setOpenForm] = useState(false);
    const [isList, setIsList] = useState(false);

    const handleNewCardAddButton = useCallback(() => {
        setOpenForm(true);
        setIsList(false);
    }, []);

    const handleToggleOpenForm = useCallback(() => setOpenForm(!openForm), [openForm]);
    const handleFormCardAddButton = useCallback(value => handleCardAddButton(index, value), [index, handleCardAddButton]);
    const handleDeleteButton = useCallback(() => handleListDelete(index), [handleListDelete, index]);
    const handleCardDelete = useCallback(cardIndex => handleCardDeleteButton(index, cardIndex), [handleCardDeleteButton, index]);
    const handleOnDragOver = useCallback(e => e.preventDefault(), [])

    const handleOnDrop = useCallback(e => {
        e.preventDefault();
        let listIndexOfCardToMove = e.dataTransfer.getData('listIndexOfCardToMove');
        let cardIndexToMove = e.dataTransfer.getData('cardIndexToMove');
        let cardToMove = JSON.parse(e.dataTransfer.getData('cardDataToMove'));
        if (e.target.id !== '' && parseInt(listIndexOfCardToMove) !== parseInt(e.target.id)) {
            handleCardDeleteButton(parseInt(listIndexOfCardToMove), parseInt(cardIndexToMove));
            handleCardAddButton(parseInt(e.target.id), cardToMove);
        }
    }, [handleCardDeleteButton, handleCardAddButton]);

    return <div id={index} className={classes.container} onDragOver={handleOnDragOver} onDrop={handleOnDrop}>
        <div className={classes.header} >
            {listValue.title}
            <IconButton onClick={handleDeleteButton} style={{
                cursor: 'pointer',
                paddingLeft: '0.5rem'
            }}>
                <DeleteIcon />
            </IconButton>
        </div>
        <IconButton onClick={handleNewCardAddButton} style={{
            cursor: 'pointer',
            margin: '0 auto 1rem',
            width: 'fit-content'
        }}>
            <AddIcon />
        </IconButton>
        {openForm && <Form isList={isList} handleFormClose={handleToggleOpenForm} handleAddData={handleFormCardAddButton} />}
        {!emptyValueCheck(listValue.cardList) && listValue.cardList.map((card, ind) => (
            <Card key={ind} index={ind} listIndex={index} title={card.title} description={card.description} date={card.date}
                handleCardDelete={handleCardDelete} />
        ))}

    </div>;
}

export default List;