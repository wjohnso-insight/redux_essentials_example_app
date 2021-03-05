import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux' 
import { Link } from 'react-router-dom'
import { PostAuthor } from './PostAuthor'
import { ReactionButtons } from './ReactionButtons'
import { selectAllPosts, fetchPosts } from './postSlice' //* Reusable Selector Function 

export const PostsList = () => {

    const dispatch = useDispatch();
    const posts = useSelector(selectAllPosts) //* Reusable Selector (TBH, not sure why selectAllPosts isn't passed `state` object as param?)
    
    const postStatus = useSelector(state => state.posts.status)

    useEffect(() => {
        if(postStatus === 'idle'){ //* postStatus prevents us from calling dispatch() every time the component renders
            dispatch(fetchPosts())
        }
    }, [postStatus, dispatch])

    const orderedPosts = posts.slice().sort((a,b) => b.date.localeCompare(a.date));

    const renderedPosts = orderedPosts.map(post => (
        <article className="post-excerpt" key={post.id}>
            <h3>{post.title}</h3>
            <h5><PostAuthor userId={post.user} /></h5>
            {/* //* Displays first 100 characters of post content as a preview*/}
            <p className="post-content">{post.content.substring(0,100)}</p> 
            <Link to={`/posts/${post.id}`} className="button muted-button">
                View Post
            </Link>
            <ReactionButtons post={post}/>
        </article>
    ))
    return (
        <section className="posts-list">
            <h2>Posts</h2>
            {renderedPosts}
        </section> 
    )
}
