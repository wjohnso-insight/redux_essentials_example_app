import React, { useState } from 'react'
import { useDispatch } from 'react-redux' //* Custom hook that allows access actions from slice / store

import { postAdded } from './postSlice' //* action creator / dispatch action from slice

export const AddPostForm = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const dispatch = useDispatch();

  const onTitleChanged = e => setTitle(e.target.value)
  const onContentChanged = e => setContent(e.target.value)

  const onSavePostClicked = () => {
    if (title && content) { //* Local state equality check
      dispatch(postAdded(title, content)) 
      /*
        * Can pass `title` & `content` params
        * instead of constructing a payload because we added
        * a `prepare callback function` to `reducers object`
        * @ postSlice
      */
      setTitle('')
      setContent('') 
    }
  }

  return (
    <section>
      <h2>Add a New Post</h2>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
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
        <button type="button" onClick={onSavePostClicked}>Save Post</button>
      </form>
    </section>
  )
}