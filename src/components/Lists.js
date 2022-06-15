import React from 'react'

export const Lists = (props) => {
    const { element, deleteList, updateList } = props;

   
    return (
        <div className="card text-white bg-dark mb-3  my-3" style={{ maxWidth: '18rem' }}>
            <div className="card-header">{element.tag ? element.tag : 'No Tag'}</div>
            <div className="card-body">
                <h5 className="card-title">Title: {element.title}</h5>
                <p className="card-text my-3">Task : {element.description}</p>
                <div className="card-text my-3">
                    <button className="btn btn-primary mx-2"  onClick={()=>updateList(element)}>edit</button>
                    <button className="btn btn-primary mx-2" onClick={()=>deleteList(element._id)}>delete</button>
                </div>
            </div>
        </div>

    )
}
