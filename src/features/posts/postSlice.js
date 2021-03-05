import { createSlice, nanoid } from '@reduxjs/toolkit'
import { sub } from 'date-fns'

/*
    TODO - Extract Posts Selectors
        [√] Change initial state to object that 
            1. Contains the (current) posts array
            2. Contains current loading state fields
        [√] Update selectors in components that access Posts state 
            [√] <PostsList>
                - Access list of all post
            [√] <SinglePostPage>
                - Access single post by id
            [√] <EditPostForm>
                - Access single post by id

*/
const initialState = {
    posts: [],
    status: 'idle',
    error: null
} //TODO: Refactor to use mirage.js API & faker.js data

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        reactionAdded(state,action){
            const { postId, reaction } = action.payload
            const existingPost = state.posts.find(post => post.id === postId)
            if(existingPost){
                existingPost.reactions[reaction]++
            }
        },
        postAdded:{
            reducer(state,action){
                state.posts.push(action.payload)
            },
            prepare(title,content, userId){
                return{
                    payload: {
                        id: nanoid(),
                        date: new Date().toISOString(), 
                        title,
                        content,
                        user: userId,
                        reactions: {
                            thumbsUp: 0, 
                            hooray: 0,
                            heart: 0,
                            rocket: 0,
                            eyes: 0 
                        }
                    }
                }
            }
        },
        postUpdated(state,action){
            const { id, title, content } = action.payload //* Destructuring the payload
            const existingPost = state.posts.find(post => post.id === id) //* Matching post in state
            if(existingPost) {
                existingPost.title = title //* Mutate value
                existingPost.content = content //*Mutate value, thanks Immer!
            }
        }
    }
})
        

export const { postAdded, postUpdated, reactionAdded } = postsSlice.actions 
/* 
    * This !== postAdded method in reducers object above. 
    * Here, postAdded is an 'action creator' (https://www.craft.do/s/4arQORaj0iFD59)
    * that is automatically generated by createSlice() and given the same name as 
    * the method in postsSlice.reducers 
*/

export default postsSlice.reducer 

/*
    * REUSABLE SELECTOR FUNCTIONS
    * Allows for sharing slice logic across components vs. repeating that logic (see <EditPostForm> & <SinglePostForm>)
    * So now, if global state shape changes, only these function need to be updated, vs updating
    * each component
*/

export const selectAllPosts = state => state.posts.posts //* <PostList>

export const selectPostById = (state, postId) =>  //* <EditPostForm> & <SinglePostPage>
    state.posts.posts.find(post => post.id === postId)

/*
    * Note that the reuseable selectors take the global `state` object as a parameter. 
    * This is provided at the component level by calling the reusable selector inside
    * `useSelector()`, which provides access to the `state` object at the component level
*/
