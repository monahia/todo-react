import React, { useState, useEffect} from 'react';
import './ToDo.css';

function ToDo() {

    const [toDo, setToDo] = useState([]);
    const [selectedToDo, setSelectedToDo] = useState(new Set());
    const [deletedToDo, setDeletedToDo] = useState(new Set());

    useEffect(() => {
        const fetchToDo = async () => {
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/todos');
                const data = await response.json();
                setToDo(data);
            } catch (error) {
                console.error('Error fetching toDo:', error);
            }
        };
        fetchToDo();
    }, []);

    const toggleSelected = (id) => {
        setSelectedToDo((prevSelected) => {
            const newSelected = new Set(prevSelected);
            if (prevSelected.has(id)) {
                newSelected.delete(id);
            } else {
                newSelected.add(id);
            }
            return newSelected;
        });

    }

    const deleteSelected = () => {
        setDeletedToDo(selectedToDo);
        setToDo((prevToDo) => prevToDo.filter((todo) => !selectedToDo.has(todo.id)));
        setSelectedToDo(new Set());
    }

    const handleDelete = (event) => {
        if (event.key === 'Delete' || event.key === 'Backspace' || event.key === 'Enter') {
            deleteSelected();
        }
    }

    useEffect(() => {
        window.addEventListener('keydown', handleDelete);
        return () => {
            window.removeEventListener('keydown', handleDelete);
        };
    }, [selectedToDo]);

    return (
        <div id = "toDo-Container">
            <ul id = "toDo-ul">
                {toDo.map((todo) => (
                    <li key={todo.id} 
                    id = "toDo-li" 
                    onClick={() => toggleSelected(todo.id)}
                    style={{ backgroundColor: selectedToDo.has(todo.id) ? 'lightblue' : 'transparent' }}
                    >
                        <input type="checkbox" checked={selectedToDo.has(todo.id)} onChange={() => toggleSelected(todo.id)} />
                        <span>{todo.title}</span>
                    </li>
                ))}
            </ul>
            <button id = "delete-button" onClick={deleteSelected}>Delete Selected</button>
        </div>
    )
}

export default ToDo;