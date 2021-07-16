import classes from './styles.module.css';

const Button = props => {
    const { children, style, onClick } = props;

    return <button className={classes.buttonContent} style={style} onClick={onClick}>{children}</button>;
}

export default Button