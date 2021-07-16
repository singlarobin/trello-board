const AddIcon = props => {
    const { width, height, fill, stroke, strokeWidth } = props;

    return <svg xmlns='http://www.w3.org/2000/svg' width={width} height={height} viewBox='0 0 24 24'
        fill={fill} stroke={stroke} strokeWidth={strokeWidth} strokeLinecap='round' strokeLinejoin='round'>
        <path stroke='none' d='M0 0h24v24H0z' fill={fill} />
        <circle cx='12' cy='12' r='9' />
        <line x1='9' y1='12' x2='15' y2='12' />
        <line x1='12' y1='9' x2='12' y2='15' />
    </svg>;
}

export default AddIcon;

AddIcon.defaultProps = {
    width: '1.5rem',
    height: '1.5rem',
    fill: 'none',
    stroke: '#efefef',
    strokeWidth: '1.5'
}