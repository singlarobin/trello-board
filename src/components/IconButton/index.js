const IconButton = props => {
    const { children, style, onClick } = props;
    return <div style={style} onClick={onClick}>
        {children}
    </div>;
}

export default IconButton;