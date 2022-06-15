import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import ListContext from '../context/ListContext'

export const AddList = () => {
    const navigate = useNavigate()
    const context = useContext(ListContext)
    const {handleListSubmit, addListData, setlistData, showAlert} = context;

    useEffect(()=>{
        if(!localStorage.getItem('token')){
            navigate('/user-profile')
            showAlert('warning', 'Niks7392 says : Login or Signup first to create tasks')
        }
        // eslint-disable-next-line
    }, [])

    // funcs
    const onChangeInputs = (e)=>{
        setlistData({...addListData, [e.target.name]: e.target.value})
    }
    return (
        <div className="container my-3">
            <h2 className="text-center my-3">Create a Task</h2>
            <form onSubmit={handleListSubmit}>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Enter your title</label>
                    <input name='title' onChange={onChangeInputs} value={addListData.title} required minLength={5} type="text" className="form-control" id="title" aria-describedby="emailHelp"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Enter your description</label>
                    <input name='description' onChange={onChangeInputs} value={addListData.description} required minLength={5} type="text" className="form-control" id="description"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Enter a Tag</label>
                    <input name='tag' onChange={onChangeInputs} value={addListData.tag}  type="text" className="form-control" id="tag" placeholder='(Optional)'/>
                </div>
              
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}
