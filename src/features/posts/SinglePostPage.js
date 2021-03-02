import React from 'react'
import { useSelector } from 'react-redux'

export const SinglePostPage = ({ match }) => { 
  /*
    * The 'match' property is passed to component automatically via React-Router
  */

  const { postId } = match.params

  const post = useSelector(state =>
    state.posts.find(post => post.id === postId) //* Return first post with matching post ID
  )

  if (!post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    )
  }

  return (
    <section>
      <article className="post">
        <h2>{post.title}</h2>
        <p className="post-content">{post.content}</p>
      </article>
    </section>
  )
}