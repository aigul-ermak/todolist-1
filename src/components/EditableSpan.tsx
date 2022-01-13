import React, {ChangeEvent, useState} from 'react';

type PropsType = {
    title: string
    callback:(title: string) => void
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
    const onChangeHandler =(e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)

    }


    return (
        edit
            ? <input value={title}
                     onChange={onChangeHandler}
                     autoFocus={true}
                     onBlur={onBlurHandler}/>
            : <span
                onDoubleClick={onDoubleClickHandler}>{props.title}</span>
    )
}
