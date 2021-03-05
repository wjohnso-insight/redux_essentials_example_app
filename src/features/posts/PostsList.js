import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux' 
import { Link } from 'react-router-dom'
import { PostAuthor } from './PostAuthor'
import { ReactionButtons } from './ReactionButtons'
import { selectAllPosts, fetchPosts } from './postSlice' //* Reusable Selector Function 
import  { TimeAgo }  from './TimeAgo'

const PostExcerpt = ({ post }) => {
    return (
      <article className="post-excerpt" key={post.id}>
        <h3>{post.title}</h3>
        <div>
          <PostAuthor userId={post.user} />
          <TimeAgo timestamp={post.date} /> 
        </div>
        <p className="post-content">{post.content.substring(0, 100)}</p>
  
        <ReactionButtons post={post} />
        <Link to={`/posts/${post.id}`} className="button muted-button">
          View Post
        </Link>
      </article>
    )
  }

export const PostsList = () => {

    const dispatch = useDispatch();
    const posts = useSelector(selectAllPosts) //* Reusable Selector (TBH, not sure why selectAllPosts isn't passed `state` object as param?)
    
    const postStatus = useSelector(state => state.posts.status)
    const error = useSelector(state => state.posts.error)

    useEffect(() => {
        if(postStatus === 'idle'){ //* postStatus prevents us from calling dispatch() every time the component renders
            dispatch(fetchPosts())
        }
    }, [postStatus, dispatch])

    let content

    if (postStatus === 'loading'){
        content = <div className="loader">Loading...</div>
    }else if (postStatus === 'succeeded'){
        //* Sort posts in reverse chronological order by datetime string
        const orderedPosts = posts
        .slice()
        .sort((a,b) => b.date.localeCompare(a.date))

        content = orderedPosts.map(post => (
            <PostExcerpt key={post.id} post={post} />
       ))
    }else if (postStatus === 'failed'){
        content = <div>{error}</div>
    }

    return (
        <section className="posts-list">
            <h2>Posts</h2>
            {content}
        </section> 
    )
}
