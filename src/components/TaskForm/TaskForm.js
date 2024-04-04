import React, {useEffect, useState} from 'react';

function TaskForm({textValidate, setTextValidate}) {
    const [ textInputData, setTextInputData ] = useState('');

    
    useEffect(() => {
        // debugger;
        // console.log(textValidate);
        let oldElement = localStorage.getItem( "elements" );
        console.log(oldElement);
        // const oldElement = JSON.parse(localStorage.getItem( "elements" ));
        if(oldElement){
            oldElement = JSON.parse(oldElement);
        }
        
        if(textValidate.length > 0){

            // true : completee
            // false : nocomplete
            let elements = [...oldElement, {text: textValidate, statut:"nocomplete"}];
            
            const stringifiedInterests = JSON.stringify(elements);
            localStorage.setItem(
                "elements",
                stringifiedInterests
            )
        }
        
    }, [textValidate] )
    

    return (
        <>
            <input type="text" value={textInputData} data-cy="task-input" onChange={(e) => setTextInputData(e.target.value)}/>
            <button onClick={() => setTextValidate(textInputData)} data-cy="add-task-btn">Save</button>


        </>
    );
}

export default TaskForm;
