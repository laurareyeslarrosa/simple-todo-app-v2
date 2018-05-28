import axios from 'axios';
import { serverUrlData } from './const';

export function getTodoItems(parent) {
    axios.get(serverUrlData.urlTodoItems)
        .then(res => {
            parent.setState({ todoItems: res.data });
        })
}

export function setTodoItems(parent, item) {
    axios.post(serverUrlData.urlTodoItems, item)
        .then(res => {
            getTodoItems(parent);
        })
        .catch(err => {
            console.error(err);
        });
}

export function putTodoItems(parent, id, item) {
    axios.put(id, item)
        .then(res => {
            getTodoItems(parent);
        })
        .catch(err => {
            console.error(err);
        });
}

export function deleteTodoItems(parent, id) {
    axios.delete(id)
        .then(res => {
            getTodoItems(parent);
        })
        .catch(err => {
            console.error(err);
        });
}