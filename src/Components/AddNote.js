import React, { useContext ,useState} from 'react'
import noteContext from '../Context/notes/noteContext'


function AddNote(props) {
    const context = useContext(noteContext);
    const { addNote} = context;
    const [note, setnote] = useState({title:"",description:"",tag:""})

    const handleClick =(e)=>{
      e.preventDefault();
      addNote(note.title,note.description,note.tag);
      setnote({title: "", description: "", tag: ""})
      props.showAlert("Added Successfully","success")


    }
    const onChange =(e)=>{
        setnote({...note,[e.target.name]:e.target.value})

    }
  return (
    <div>
         <div className="container my-3">
      <h1>Add a Note</h1>
      <form>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input type="text" className="form-control" id="title" aria-describedby="emailHelp" value={note.title}name='title'  placeholder="Enter the title " onChange={onChange} minLength={5} required/>
        </div>
        <div className="form-group">
          <label htmlFor="desc">Description</label>
          <input type="text" className="form-control" value={note.description} name='description' id="desc" placeholder="Enter the description" onChange={onChange} minLength={5} required/>
        </div>
        <div className="form-group">
          <label htmlFor="desc">Tag</label>
          <input type="text" className="form-control" name='tag' id="tag" value={note.tag}placeholder="Enter the tag" onChange={onChange}/>
        </div>
        
        <button disabled={note.title.length<5 || note.description.length <5 } type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
      </form>
      </div>
    </div>
  )
}

export default AddNote