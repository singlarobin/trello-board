import classes from './styles.module.css';
import Card from '../Card';
import IconButton from '../IconButton';
import AddIcon from '../assets/addIcon';
import DeleteIcon from '../assets/deleteIcon';
import Form from '../Form';
import { useState } from 'react';

const List = props => {
    const { index, listValue, handleListDelete, handleCardAddButton } = props;
    const [openForm, setOpenForm] = useState(false);
    const [isList, setIsList] = useState(false);

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

    console.log('list', listValue);

    return <div className={classes.container}>
        <div className={classes.header} >
            {listValue.title}
            <IconButton onClick={handleDeleteButton} style={{ cursor: 'pointer' }}>
                <DeleteIcon />
            </IconButton>
        </div>
        {openForm && <Form isList={isList} handleFormClose={handleToggleOpenForm} handleAddData={handleFormCardAddButton} />}

        {listValue.cardList.map((card, index) => (
            <Card key={index} title={card.title} description={card.description} date={card.date} />
        ))}

        <IconButton onClick={handleNewCardAddButton} style={{
            cursor: 'pointer',
        }}>
            <AddIcon />
        </IconButton>

    </div>;
}

export default List;