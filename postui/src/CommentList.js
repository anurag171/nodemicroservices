//import axios from 'axios';
import React from 'react';



const CommentList = (props)=>{
   // const [comments,setComments] = useState({});


    /* const fetchComments = async (event) =>{
       
        console.log('Calling post get service for comments ' );
        await axios.get(`http://localhost:4001/posts/${props.postId}/comments`).then((response) => {
            console.log(response);
            setComments(response.data)
          }, (error) => {
            console.log(error);
          });  
        
    } 

    useEffect(()=>{
        fetchComments();
    },[]);*/

    console.log('List of comments '+ JSON.stringify(props.comments));

    const renderedComments = Object.values(props.comments).map(comment=>{

        let content;

        if(comment.status === 'approved'){
            content = comment.comment
        }

        if(comment.status === 'pending'){
            content = 'This comment is awaiting moderation'
        }

        if(comment.status === 'rejected'){
            content = 'This comment is rejected'
        }



        return(
            <li key={comment.commentId||0}>{content}</li>          

        );
    });


    return (
        <ul>{renderedComments}</ul>
    );
}

export default CommentList;