import React, {useEffect, useState} from 'react';

function TaskForm({textValidate, setTextValidate}) {
    const [ textInputData, setTextInputData ] = useState('');

    
    useEffect(() => {
        // debugger;
        // console.log(textValidate);
        let oldElement = [];
        oldElement = localStorage.getItem( "tasks" );
        // const oldElement = JSON.parse(localStorage.getItem( "elements" ));
        if(oldElement){
            oldElement = JSON.parse(oldElement);
            console.log(oldElement)
        }
        else {
            oldElement = []
        }
        console.log(oldElement);
        
        if(textValidate.length > 0){

            // true : completee
            // false : nocomplete
            let elements = [...oldElement, {text: textValidate, statut:"nocomplete", index: oldElement.length}];
            
            const stringifiedInterests = JSON.stringify(elements);
            localStorage.setItem(
                "tasks",
                stringifiedInterests
            )
        }
        
    }, [textValidate] )
    

    return (
        <div data-cy="task-form">

            <input type="text" value={textInputData} data-cy="task-input" onChange={(e) => setTextInputData(e.target.value)}/>
            <button onClick={() => { 
                    setTextValidate(textInputData);
                    setTextInputData("");
                }} 
                data-cy="add-task-btn">
                    Save
            </button>


        </div>
    );
}

export default TaskForm;
