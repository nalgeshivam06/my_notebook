
import React, { useContext, useEffect, useRef ,useState} from 'react'
import noteContext from '../Context/notes/noteContext'
import Noteitem from './Noteitem';
import AddNote from './AddNote';
import { useNavigate } from "react-router-dom";



function Notes(props) {
  const navigate =useNavigate()
  
  const context = useContext(noteContext);
  const { notes, getNotes ,editNote } = context;
  
  useEffect(() => {
    // console.log('localStorage token:', localStorage.getItem('token'));  
    if(localStorage.getItem('token')){
      getNotes();
      
    }
    else{
      navigate('/login'); 
    }
    
  }, [navigate]);
  const ref = useRef(null)
  const refClose = useRef(null)
  const [note, setnote] = useState({id:"" ,etitle:"",edescription:"",etag:""})


  const updateNote = (currentnote) => {
    ref.current.click()
    setnote({id:currentnote._id,etitle: currentnote.title,edescription: currentnote.description,etag: currentnote.tag})
    
  }
  
  const handleClick =(e)=>{
    console.log("updating the note",note)
    editNote(note.id,note.etitle,note.edescription,note.etag)
    refClose.current.click()
    props.showAlert("Updated Successfully","success")

  }
  const onChange =(e)=>{
      setnote({...note,[e.target.name]:e.target.value})

  }



  return (
    <> <AddNote showAlert={props.showAlert} />
      <button type="button" ref={ref} className=" d-none btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label htmlFor="title">Title</label>
                  <input type="text" className="form-control" id="etitle" aria-describedby="emailHelp" name='etitle' value={note.etitle}placeholder="Enter the title " onChange={onChange} minLength={5} required />
                </div>
                <div className="form-group">
                  <label htmlFor="desc">Description</label>
                  <input type="text" className="form-control" name='edescription' id="edesc"value={note.edescription} placeholder="Description" onChange={onChange} minLength={5} required />
                </div>
                <div className="form-group">
                  <label htmlFor="desc">Tag</label>
                  <input type="text" className="form-control" name='etag' id="etag"value={note.etag} placeholder="Tag" onChange={onChange} />
                </div>

              </form>
            </div>
            <div className="modal-footer">
              <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" disabled={note.etitle.length<5 || note.edescription.length <5 } onClick={handleClick} className="btn btn-primary">Update Note</button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        
        <h1>Your Notes</h1>
        <div className="container mx-3">
        {notes.length===0 &&'No notes to desplay'}
        </div>

        {notes.map((note) => {
          return <Noteitem note={note} updateNote={updateNote} key={note._id} showAlert={props.showAlert}/>
        })}
      </div>
    </>
  )
}

export default Notes