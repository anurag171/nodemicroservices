import axios from 'axios';
import React,{useState} from 'react';


const CommentCreate = (props)=>{
    const [comment,setComment] = useState('');

    const onSubmit = async (event) =>{
        event.preventDefault();
        console.log('Calling post creation service for comment ' + comment);
        console.log("received comment id " + props.postId);
        await axios.post(`http://localhost:4001/posts/${props.postId}/comments`,{
            comment
        }).then((response) => {
            console.log(response);
          }, (error) => {
            console.log(error);
          });

        setComment('');
    }


    return (
        <form onSubmit={onSubmit}>
            <div className="form-group">
            <label>New Comment</label>
            <input className="form-control" value={comment} onChange={e=>setComment(e.target.value)}/>
            </div>
            <button className="btn btn-primary">Submit</button>
        </form>
    );
}

export default CommentCreate;