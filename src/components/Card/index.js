import classes from './styles.module.css';
import IconButton from '../IconButton';
import DeleteIcon from '../assets/deleteIcon';

const Card = props => {
    const { index, listIndex, title, description, date, handleCardDelete } = props;

    const handleDeleteButton = () => handleCardDelete(index);

    const handleOnDragStart = e => {
        console.log('card drag start', e.target.id);
        //setTimeout(() => e.target.style.display = 'none', 0);
        console.log(e.target);
        e.dataTransfer.setData('listIndexOfCardToMove', listIndex);
        e.dataTransfer.setData('cardIndexToMove', e.target.id);
        e.dataTransfer.setData('cardDataToMove', JSON.stringify({ title: title, description: description, date: date }));
        e.dataTransfer.setData('cardUI', e.target);
    };

    const handleOnDragOver = e => {
        e.stopPropagation();
    }


    return <div id={index} className={classes.container} draggable="true"
        onDragStart={handleOnDragStart} onDragOver={handleOnDragOver}  >
        <div className={classes.cardHeader}>
            <div className={classes.cardTitle}>{title}</div>
            <IconButton onClick={handleDeleteButton} style={{
                cursor: 'pointer',
            }}>
                <DeleteIcon />
            </IconButton>
        </div>
        <div className={classes.cardContent}>
            <div className={classes.cardDescription}>
                {description}
            </div>
            <div className={classes.cardDate}>
                {date}
            </div>

        </div>

    </div>;
}

export default Card;