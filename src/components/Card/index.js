import classes from './styles.module.css';
import IconButton from '../IconButton';
import DeleteIcon from '../assets/deleteIcon';

const Card = props => {
    const { index, title, description, date, handleCardDelete } = props;

    const handleDeleteButton = () => handleCardDelete(index);

    return <div className={classes.container}>
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