import classes from './styles.module.css';
import Form from '../Form';
import IconButton from '../IconButton';
import AddIcon from '../assets/addIcon';
import List from '../List';
import { emptyValueCheck } from '../../utils';
import { useCallback, useEffect, useState } from 'react';

//list:[{title:title, cardList:[{title,decription,date}, {}]}, {}]

const Generate = () => {
    const [openForm, setOpenForm] = useState(false);
    const [openListInForm, setOpenListInForm] = useState(false);
    const [list, setList] = useState([]);

    // const l = [{ title: 'A', cardList: [{ title: 'LMN', description: 'mkmk', date: '2-01-2020' }, { title: 'XYZ', description: 'njmk', date: '21-01-2021' }] },
    // { title: 'B', cardList: [{ title: 'PQR', description: 'lkde', date: '2-01-2020' }, { title: 'XYZ', description: 'njmk', date: '21-01-2021' }] }]

    useEffect(() => {
        setList(JSON.parse(localStorage.getItem('list')));
    }, []);

    useEffect(() => {
        // console.log('1');
        localStorage.setItem('list', JSON.stringify(list))
    }, [list])

    const handleNewListAddButton = useCallback(() => {
        setOpenForm(!openForm);
        setOpenListInForm(true);
    }, [openForm]);

    const handleToggleOpenForm = useCallback(() => setOpenForm(!openForm), [openForm]);
    const handleFormListAddButton = useCallback(value => emptyValueCheck(list) ? setList([value]) : setList([...list, value]), [list]);
    const handleListDelete = useCallback((index) => {
        const currList = list.filter((item, ind) => {
            return ind !== index;
        });
        setList(currList);
    }, [list]);

    const handleCardAddButton = useCallback((index, value) => {
        const currList = list.map((item, ind) => {
            let currCardList = item.cardList;
            if (index === ind) {
                currCardList.push(value);
            }
            return item;
        });
        setList(currList);
    }, [list]);

    const handleCardDeleteButton = useCallback((listIndex, cardIndex) => {
        const currList = list.map((item, index) => {
            if (index === listIndex) {
                const currCardList = item.cardList.filter((card, ind) => {
                    return ind !== cardIndex;
                });
                item.cardList = currCardList;
            }
            return item;
        });
        setList(currList);
    }, [list]);

    console.log('generate', list);
    return <div>
        <IconButton onClick={handleNewListAddButton} style={{
            textAlign: 'end',
            margin: '1rem',
            cursor: 'pointer',
        }}>
            <AddIcon />
        </IconButton>
        {openForm && <Form isList={openListInForm} handleFormClose={handleToggleOpenForm} handleAddData={handleFormListAddButton} />}
        <div className={classes.listContainer}>
            {!emptyValueCheck(list) && list.map((item, index) => (
                <List key={index} index={index} listValue={item} handleListDelete={handleListDelete}
                    handleCardAddButton={handleCardAddButton} handleCardDeleteButton={handleCardDeleteButton} />
            ))}
        </div>

    </div>;
}

export default Generate;