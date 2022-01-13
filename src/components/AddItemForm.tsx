import React, {useState, ChangeEvent, KeyboardEvent} from 'react';

type PropsType = {
callback:(title:string) => void
}

export const AddItemForm = (props: PropsType) => {

    const [title, setTitle] = useState<string>('')
    let [error,setError] = useState<string>('')

    const addTask = () => {
        if(title.trim() !=='') {
            props.callback(title);
            setTitle('');
        } else {
            setError("Title!!!")
        }
    }

    const onChangeHandler =(e: ChangeEvent<HTMLInputElement>) => {
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
            <input value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}/>
            <button onClick={addTask}>+</button>

            {error && <div className="error-message">{error}</div>}

        </div>
    )
}
