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
    // const [listIndexOfCardToMove, setListIndexOfCardToMove] = useState(null);
    // const [cardIndexToMove, setCardIndexToMove] = useState(null);
    // const [cardToMove, setCardToMove] = useState(null);

    const handleNewCardAddButton = () => {
        setOpenForm(true);
        setIsList(false);
    };
    const handleToggleOpenForm = () => setOpenForm(!openForm);
    const handleFormCardAddButton = value => {
        console.log('value', value);
        handleCardAddButton(index, value);
    };

    const handleDeleteButton = () => handleListDelete(index);
    const handleCardDelete = (cardIndex) => handleCardDeleteButton(index, cardIndex);

    const handleOnDragOver = e => {
        e.preventDefault();
    }

    const handleOnDrop = useCallback(e => {
        e.preventDefault();
        console.log("AAAAAA");
        let listIndexOfCardToMove = e.dataTransfer.getData('listIndexOfCardToMove');
        let cardIndexToMove = e.dataTransfer.getData('cardIndexToMove');
        let cardToMove = JSON.parse(e.dataTransfer.getData('cardDataToMove'));
        let card = e.dataTransfer.getData('cardUI');
        console.log('list drop:', e.target.id, '::', listIndexOfCardToMove, '::', cardIndexToMove, '::', cardToMove, '::',);
        //console.log(cardIndexToMove, '::', listIndexOfCardToMove);
        if (e.target.id !== '' && parseInt(listIndexOfCardToMove) !== parseInt(e.target.id)) {
            handleCardDeleteButton(parseInt(listIndexOfCardToMove), parseInt(cardIndexToMove));
            handleCardAddButton(parseInt(e.target.id), cardToMove);
        }
        else {
            //console.log("111111111111111");
            //console.log(document.getElementsByName('title'));
            let element = document.getElementById(cardIndexToMove);
            setTimeout(() => element.style.display = 'block', 0);
        }

    }, [handleCardDeleteButton, handleCardAddButton]);


    console.log('list', listValue);

    return <div id={index} className={classes.container} onDragOver={handleOnDragOver} onDrop={handleOnDrop}>
        <div className={classes.header} >
            {listValue.title}
            <IconButton onClick={handleDeleteButton} style={{ cursor: 'pointer' }}>
                <DeleteIcon />
            </IconButton>
        </div>
        {openForm && <Form isList={isList} handleFormClose={handleToggleOpenForm} handleAddData={handleFormCardAddButton} />}
        {!emptyValueCheck(listValue.cardList) && listValue.cardList.map((card, ind) => (
            <Card key={ind} index={ind} listIndex={index} title={card.title} description={card.description} date={card.date}
                handleCardDelete={handleCardDelete} />
        ))}
        <IconButton onClick={handleNewCardAddButton} style={{
            cursor: 'pointer',
        }}>
            <AddIcon />
        </IconButton>

    </div>;
}

export default List;