import { configureStore } from '@reduxjs/toolkit'

// Reducer Imports
import postsReducer from '../features/posts/postSlice'

export default configureStore({
  reducer:{ // root.reducer object - a list of reducers to make available to child components
    posts: postsReducer 
    /*  
      * Top-level state object will now have a field called 
      * 'posts' and all data for state.posts will be updated by 
      * the postsReducer function when actions are dispatched 
    */
  }
})

