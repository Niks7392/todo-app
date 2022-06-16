import React from 'react'
import ListContext from './ListContext'
import { useState } from 'react'

export const ListState = (props) => {
    // some basic declares
    const serverHost = process.env.REACT_APP_DEV_HOST;

    // states 
    const [credentials, setcredentials] = useState({ email: '', password: '' });
    const listsInitial = []
    const [fetchLists, setLists] = useState(listsInitial)
    const [addListData, setlistData] = useState({ title: '', description: '', tag: '' });
    const [User, setUser] = useState([]);
    const [alert, setalert] = useState({ logo: '', msg: '' });
    
    // functions 
 
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
        showAlert('success', 'Niks7392 says : created task for u')
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
        showAlert('primary', 'task deleted succesfully')
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
        showAlert('success', 'task updated successfully')
    };
    // tried other non-familiar-way for selection lmao ;)
    const getUser = () => {
        fetch(`${serverHost}/api/user-auth/get-user`, {
            method: 'GET',
            headers: {
                'auth-token': localStorage.getItem('token')
            }
        }).then(res => res.json())
            .catch(err => console.log(err))
            .then(json => setUser(json))
    };

    const showAlert = (logo, msg)=>{
        setalert({
            logo : logo,
            msg : msg
        });
        setTimeout(() => {
            setalert({ logo: '', msg: '' })
        }, 3000);
    }
    return (
        <ListContext.Provider value={{setcredentials, alert, showAlert, User, getUser, editList, deleteList, setlistData, addListData, handleListSubmit, serverHost,  credentials, fetchLists, getLists }}>
            {props.children}
        </ListContext.Provider>
    )
}
