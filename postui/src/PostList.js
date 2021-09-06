import axios from 'axios';
import React,{useState,useEffect} from 'react';
import CommentCreate from './CommentCreate';
import CommentList from './CommentList';


const PostList = ()=>{
    const [posts,setPosts] = useState([]);


    const fetchPost = async (event) =>{
       
        console.log('Calling post get service for comments ' );
        await axios.get('http://localhost:4002/posts').then((response) => {
            console.log(response.data);
            setPosts(response.data)
          }, (error) => {
            console.log(error);
          });  
        
    }

    useEffect(()=>{
        fetchPost() 
    },[]);

    console.log(posts);

    const renderedPosts = Object.values(posts).map(post=>{
        return(
            <div className="card"
                style={{width:'30%',marginBottom:'20px'}}
                key={post.id}
            >
             <div className="card.body">
                <h3>{post.title}</h3>               
                <CommentList comments={post.comments}/>
                <CommentCreate postId={post.id}/>
                </div>

            </div>
           

        );
    });


    return (
        <div className="d-flex flex-row flex-wrap justify-content-between">{renderedPosts}</div>
    );
}

export default PostList;