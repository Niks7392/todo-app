import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import ListContext from '../context/ListContext';
import { Lists } from './Lists';
import Modal from 'react-modal';

export const Home = () => {
    // contexts 
    const context = useContext(ListContext)
    const { fetchLists, getLists, deleteList, editList, showAlert } = context;

    // states 
    const [modalIsOpen, setIsOpen] = useState(false);
    const [uListItems, setuListItems] = useState({ id: '', utitle: '', udescription: '', utag: '' })

    const navigate = useNavigate();
    const refClose = useRef()
    useEffect(() => {
        if (localStorage.getItem('token')) {
            // console.log('hello');
            getLists()
        } else {
            navigate('/user-profile')
            showAlert('warning', 'Niks7392 says : Login or Signup first to create tasks')
        }
        // eslint-disable-next-line
    }, [])

    // funcs 
    const closeModal = () => {
        setIsOpen(false)
    }
    const updateList = (currentlist) => {
        setIsOpen(true)
        setuListItems({ id: currentlist._id, utitle: currentlist.title, udescription: currentlist.description, utag: currentlist.tag })
    }
    const onChangeUpdatedInputs = (e) => {
        setuListItems({ ...uListItems, [e.target.name]: e.target.value })
    };
    const handleUpdateClick = (e) => {
        e.preventDefault()
        editList(uListItems.id, uListItems.utitle, uListItems.udescription, uListItems.utag)
        refClose.current.click()
    }
    return (
        <div className='container my-3 '>
            <div className="container">
                <h2 className='text-center my-3'>Your tasks</h2>
                <div className="container row" >
                    {fetchLists.length === 0 ?
                        <div className='container-sm my-3'>
                            <h3>No tasks to desplay create one</h3>
                            <button className="btn btn-primary" onClick={() => navigate('/create-new-task')}>Create new Task Now</button>
                        </div>
                        : fetchLists.map((element) => {
                            return <div className="col-md-4" key={element._id}>
                                <Lists element={element} deleteList={deleteList} updateList={updateList} />
                            </div>

                        })}
                </div>
            </div>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Example Modal"
            >
                <div className="container-sm">
                    <form onSubmit={handleUpdateClick}>
                        <div className="mb-3">
                            <label htmlFor="title" className="form-label">Enter a new title</label>
                            <input name='utitle' value={uListItems.utitle} onChange={onChangeUpdatedInputs} type="text" className="form-control" id="utitle" aria-describedby="emailHelp" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="udescription" className="form-label">Enter new task description</label>
                            <input name='udescription' value={uListItems.udescription} onChange={onChangeUpdatedInputs} type="text" className="form-control" id="udescription" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="utag" className="form-label">Enter a new tag</label>
                            <input name='utag' value={uListItems.utag} onChange={onChangeUpdatedInputs} type="text" className="form-control" id="utag" />
                        </div>

                        <button className='btn btn-primary' ref={refClose} onClick={closeModal}>close</button>
                        <button type="submit" className="btn btn-primary" >Update Task</button>
                    </form>
                </div>
            </Modal>
        </div>
    )
}
