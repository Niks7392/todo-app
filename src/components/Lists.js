import React from 'react'

export const Lists = (props) => {
    const { element, deleteList, updateList } = props;
    let date = element.date;
    date = date.slice(0, 10)
    date = date.split('-').reverse().join('-')

    return (
        <div className="card text-white bg-dark mb-3  my-3" style={{ maxWidth: '18rem' }}>
            <div className="card-header">{element.tag ? element.tag : 'No Tag'}</div>
            <div className="card-body">
                <h5 className="card-title">Title: {element.title}</h5>
                <p className="card-text my-3">Task : {element.description}</p>
                <div className="card-text my-3">
                    <button className="btn btn-primary mx-2" onClick={() => updateList(element)}>Edit &nbsp;{editLogo}</button>
                    <button className="btn btn-primary mx-2" onClick={() => deleteList(element._id)}>Delete &nbsp;{deleteLogo}</button>
                </div>
                <div className="card-footer text-muted">
                    Date : {date}
                </div>
            </div>
        </div>

    )
}


const editLogo = <i className="fa-solid fa-pen"></i>
const deleteLogo = <i className="fa-solid fa-trash-can"></i>