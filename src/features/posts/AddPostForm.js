import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux' //* Custom hook that allows access actions from slice / store

import { postAdded } from './postSlice' //* action creator / dispatch action from slice

export const AddPostForm = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [userId, setUserId] = useState('')

  const dispatch = useDispatch();

  const users = useSelector(state => state.users)

  const onTitleChanged = e => setTitle(e.target.value)
  const onContentChanged = e => setContent(e.target.value)
  const onAuthorChanged = e => setUserId(e.target.value)

  const onSavePostClicked = () => {
    if (title && content) { //* Local state equality check
      dispatch(postAdded(title, content, userId)) 
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

  const canSave = Boolean(title) && Boolean(content) && Boolean(userId)

  const userOptions = users.map(user => (
    <option key={user.id} value={user.id}>
      {user.nam}
    </option>
  ))

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
        <label htmlFor="postAuthor">Author:</label>
        <select id="postAuthor" value={userId} onChange={onAuthorChanged}>
          <option value=""></option> {/* Provides blank space before users*/}
          {userOptions} {/* Rendered in method above */}
        </select>
        <label htmlFor="postContent">Content:</label>
        <textarea
          id="postContent"
          name="postContent"
          value={content}
          onChange={onContentChanged}
        />
        <button type="button" onClick={onSavePostClicked} disabled={!canSave}>Save Post</button>
      </form>
    </section>
  )
}