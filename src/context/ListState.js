import React from 'react'
import ListContext from './ListContext'
import { useState } from 'react'

export const ListState = (props) => {
    // some basic declares
    const serverHost = process.env.REACT_APP_SERVER_HOST;

    // states 
    const [credentials, setcredentials] = useState({ email: '', password: '' });
    const listsInitial = []
    const [fetchLists, setLists] = useState(listsInitial)
    const [addListData, setlistData] = useState({ title: '', description: '', tag: '' })

    // functions 
    const onChangeInputs = (e) => {
        setcredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    const handleLoginSubmit = async (e) => {
        e.preventDefault()
        const response = await fetch(`${serverHost}/api/user-auth/login-user`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: credentials.email,
                password: credentials.password
            })
        })
        const json = await response.json()
        if (json.authToken) {
            setcredentials({ email: '', password: '' })
            localStorage.setItem('token', json.authToken)
        }
        console.log(json);
    };
    const getLists = async () => {
        const response = await fetch(`${serverHost}/api/lists/get-lists`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        })
        const json = await response.json()
        // console.log(json.lists);
        setLists(json.lists);
    };

    const handleListSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`${serverHost}/api/lists/add-list`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({
                title: addListData.title,
                description: addListData.description,
                tag: addListData.tag,
            })
        })
        const json = await response.json()
        const addedListItem = json.saveList
        setLists(fetchLists.concat(addedListItem))
        window.location = '/'
        setlistData({ title: '', description: '', tag: '' })
        // console.log(json);
    };
    const deleteList = async (id) => {
        const response = await fetch(`${serverHost}/api/lists/delete-list/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        })
        await response.json()
        const afterList = fetchLists.filter((list) => { return list._id !== id })
        setLists(afterList)
    };


    const editList = async (id, title, description, tag) => {
        // API Call 
        const response = await fetch(`${serverHost}/api/lists/update-list/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
        });
        await response.json();

        let newList = JSON.parse(JSON.stringify(fetchLists))
        // Logic to edit in client
        for (let index = 0; index < newList.length; index++) {
            const element = newList[index];
            if (element._id === id) {
                newList[index].title = title;
                newList[index].description = description;
                newList[index].tag = tag;
                break;
            }
        }
        setLists(newList);
    }
    return (
        <ListContext.Provider value={{editList, deleteList, setlistData, addListData, handleListSubmit, serverHost, handleLoginSubmit, onChangeInputs, credentials, fetchLists, getLists }}>
            {props.children}
        </ListContext.Provider>
    )
}
