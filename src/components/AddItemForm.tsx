import React, {useState, ChangeEvent, KeyboardEvent} from 'react';
import {Button, IconButton, TextField} from '@material-ui/core';
import {AddBox} from '@material-ui/icons';

type PropsType = {
    callback: (title: string) => void
}

export const AddItemForm = (props: PropsType) => {

    const [title, setTitle] = useState<string>('')
    let [error, setError] = useState<string>('')

    const addTask = () => {
        if (title.trim() !== '') {
            props.callback(title);
            setTitle('');
        } else {
            setError('Title is reqiured!!!')
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        // console.log(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError('')
        if (e.key === 'Enter') {
            addTask()
        }
    }
    return (
        <div>
            {/*<input value={title}*/}
            {/*       onChange={onChangeHandler}*/}
            {/*       onKeyPress={onKeyPressHandler}/>*/}

            <TextField variant="outlined"
                       error={!!error}
                       value={title}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}
                       label="Title"
                       helperText={error}

            />

            {/*<Button variant="contained" color="primary" onClick={addTask}>+</Button>*/}
            {/*<Button variant="outlined" color="primary" size="small" onClick={addTask}>+</Button>*/}
            <IconButton color="primary" onClick={addTask}>
                <AddBox/>
            </IconButton>
            {/*{error && <div className="error-message">{error}</div>}*/}

        </div>
    )
}
