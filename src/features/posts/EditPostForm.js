import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom' //* Custom hook for accessing History instance for nav

import { postUpdated } from './postSlice'

export const EditPostForm = ({ match }) => {
  const { postId } = match.params

  const post = useSelector(state =>
    state.posts.find(post => post.id === postId) //* Return post that matches postId, used to set initial state
  )

  const [title, setTitle] = useState(post.title) //* Local state; initial state === global state
  const [content, setContent] = useState(post.content) //* Local state; initial state === global state

  const dispatch = useDispatch()
  const history = useHistory() //* Returns History instance

  const onTitleChanged = e => setTitle(e.target.value) //* Setter 
  const onContentChanged = e => setContent(e.target.value) //* Setter

  const onSavePostClicked = () => {
    if (title && content) {
      dispatch(postUpdated({ id: postId, title, content })) //* Dispatch action creator to update post
      history.push(`/posts/${postId}`) //* Force navigate to updated post
    }
  }

  return (
    <section>
      <h2>Edit Post</h2>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          placeholder="What's on your mind?"
          value={title}
          onChange={onTitleChanged}
        />
        <label htmlFor="postContent">Content:</label>
        <textarea
          id="postContent"
          name="postContent"
          value={content}
          onChange={onContentChanged}
        />
      </form>
      <button type="button" onClick={onSavePostClicked}>
        Save Post
      </button>
    </section>
  )
}