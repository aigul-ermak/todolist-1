import React, {ChangeEvent, useState} from 'react';
import {TextField} from '@material-ui/core';

type PropsType = {
    title: string
    callback: (title: string) => void
}

export const EditableSpan = (props: PropsType) => {

    const [title, setTitle] = useState(props.title)
    const [edit, setEdit] = useState(false)

    const onDoubleClickHandler = () => {
        setEdit(true)
    }

    const onBlurHandler = () => {
        setEdit(false)
        props.callback(title)
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)

    }


    return (
        edit
            ? <TextField variant="outlined"
                         value={title}
                         onChange={onChangeHandler}
                         autoFocus={true}
                         onBlur={onBlurHandler}/>
            : <span
                onDoubleClick={onDoubleClickHandler}>{props.title}</span>

    )
}


// ? <input value={title}
//          onChange={onChangeHandler}
//          autoFocus={true}
//          onBlur={onBlurHandler}/>
// : <span
//     onDoubleClick={onDoubleClickHandler}>{props.title}</span>
