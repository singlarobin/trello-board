import classes from './styles.module.css';

const Input = props => {
    const { inputValue, handleInputChange, placeholderValue, rows, style } = props;
    const handleChange = e => handleInputChange(e.target.value);

    return <textarea className={classes.inputContent} style={style} onChange={handleChange}
        placeholder={placeholderValue} rows={rows} value={inputValue} />;
}

export default Input;