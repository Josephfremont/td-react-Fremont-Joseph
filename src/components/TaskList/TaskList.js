import React, {useState, useEffect} from "react";

//icon
import { FaCheck } from "react-icons/fa";
import { ImCross } from "react-icons/im";

//css
import "./TaskList.css";

function TaskList({textValidate}) {

    const [ listElement, setListElement ] = useState([]);
    const [ listElementAll, setListElementAll ] = useState([]);
    const [ listElementComplete, setListElementComplete ] = useState([]);
    const [ listElementNonComplete, setListElementNonComplete ] = useState([]);
    
    useEffect(() => {
        setListElementAll(() => { 
            if(localStorage.getItem("tasks")){
                setListElement(JSON.parse(localStorage.getItem("tasks")));
                // setListElementComplete(JSON.parse(localStorage.getItem("elements")).filter((element) => element.statut == "completee"));
                // setListElementNonComplete(JSON.parse(localStorage.getItem("elements")).filter((element) => element.statut == "nocomplete"));

                return JSON.parse(localStorage.getItem("tasks"))
            }
            
        });
        
    }, [textValidate])

    const changeStatut = (thisText, thisStatut, thisIndex,i) => {
        // debugger
        const newListAll = [...listElementAll];
        console.log('before ',newListAll);
        newListAll.splice(thisIndex, 1, { text: thisText, statut: thisStatut === "completee" ? "nocomplete" : "completee", index: thisIndex });
        console.log('after ',newListAll);
        localStorage.setItem("tasks", JSON.stringify(newListAll));
        setListElementAll(newListAll);

        const newList = [...listElement];
        console.log('before ',newList);
        newList.splice(i, 1, { text: thisText, statut: thisStatut === "completee" ? "nocomplete" : "completee", index: thisIndex });
        console.log('after ',newList);
        setListElement(newList);
    }

    const filterAll = () => {
        setListElement(listElementAll);
    }

    const filterComplete = () => {
        setListElement(listElementAll.filter((element) => element.statut == "completee"));
    }

    const filterNonComplete = () => {
        setListElement(listElementAll.filter((element) => element.statut == "nocomplete"));
    }


    return (
        <>
            <button onClick={filterAll} data-cy="filter-btn-all">Toutes</button>
            <button onClick={filterComplete} data-cy="filter-btn-done">Complétées</button>
            <button onClick={filterNonComplete} data-cy="filter-btn-undone">Non complétées</button>
            <div data-cy="task-list" className="listItem">
            {
                listElement.length > 0 && listElement.map((element, index) => {
                    return (
                        <li key={index} onClick={() => changeStatut(element.text,element.statut,element.index,index)} 
                            data-cy="task-item" 
                            className={element.statut == "completee" ? "completed" : "notCompleted"}>
                            {element.text}
                            { element.statut == "completee" ? 
                                <FaCheck color="green"/> : 
                                <ImCross color="red" /> 
                            }
                        </li>
                    )
                })
            }
            </div>
            
        </>
    );
}

export default TaskList;
