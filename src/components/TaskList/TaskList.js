import React, {useState, useEffect} from "react";

//icon
import { FaCheck } from "react-icons/fa";
import { ImCross } from "react-icons/im";

function TaskList({textValidate}) {

    const [ listElement, setListElement ] = useState([]);
    const [ listElementAll, setListElementAll ] = useState([]);
    const [ listElementComplete, setListElementComplete ] = useState([]);
    const [ listElementNonComplete, setListElementNonComplete ] = useState([]);
    
    useEffect(() => {
        setListElementAll(() => { 
            if(localStorage.getItem("elements")){
                setListElement(JSON.parse(localStorage.getItem("elements")));
                setListElementComplete(JSON.parse(localStorage.getItem("elements")).filter((element) => element.statut == "completee"));
                setListElementNonComplete(JSON.parse(localStorage.getItem("elements")).filter((element) => element.statut == "nocomplete"));

                return JSON.parse(localStorage.getItem("elements"))
            }
            
        });
        
    }, [textValidate])

    const changeStatut = (thisText, thisStatut, i) => {
        const newList = [...listElementAll];
        newList.splice(i, 1, { text: thisText, statut: thisStatut === "completee" ? "nocomplete" : "completee" });
        localStorage.setItem("elements", JSON.stringify(newList));
        // setListElement(newList);
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
            <button onClick={filterAll} data-cy="filter-btn-all">All</button>
            <button onClick={filterComplete} data-cy="filter-btn-done">Complétée</button>
            <button onClick={filterNonComplete} data-cy="filter-btn-undone">Non complétée</button>
            {
                listElement.length > 0 && listElement.map((element, index) => {
                    return (
                        <li key={index} onClick={() => changeStatut(element.text,element.statut,index)} data-cy="task-item">
                            {element.text}
                            { element.statut == "completee" ? 
                                <FaCheck color="green"/> : 
                                <ImCross color="red" /> 
                            }
                        </li>
                    )
                })
            }
            
        </>
    );
}

export default TaskList;
