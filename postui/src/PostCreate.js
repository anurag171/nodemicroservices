import axios from 'axios';
import React,{useState} from 'react';


const PostCreate = ()=>{
    const [title,setTitle] = useState('');
    //const [value,setValue] = useState();

    const onSubmit = async (event) =>{
        event.preventDefault();
        console.log('Calling post creation service for title ' + title);
        await axios.post('http://localhost:4000/posts',{
            title
        }).then((response) => {
            console.log(response);
          }, (error) => {
            console.log(error);
          });

        setTitle('');
       // setValue({});
    }


    return (
        <form onSubmit={onSubmit}>
            <div className="form-group">
            <label>Title</label>
            <input className="form-control" value={title} onChange={e=>setTitle(e.target.value)}/>
            </div>
            <button className="btn btn-primary">Submit</button>
        </form>
    );
}

export default PostCreate;