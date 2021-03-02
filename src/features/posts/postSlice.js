import { createSlice } from '@reduxjs/toolkit'

const initialState = [
    { id: '1', title: 'First Post!', content: 'Hello!' },
    { id: '2', title: 'Second Post', content: 'More text' }
] //TODO: Refactor to use mirage.js API & faker.js data

const postsSlice = createSlice({
    name: 'posts', // This slice will be accessed as postsReducer in global store
    initialState, //*  Set with ES6 'object property value shorthand' https://www.craft.do/s/QvB4jxgOhoiWWE
    reducers: {
        postAdded(state,action){ //* Receives current state value & the action that was dispatched
            state.push(action.payload) 
            /*
                * 1. action.payload === new PostEntry: {title: string, content: string} 
                * 2. Reducer functions should always be:
                *   a. pure functions
                *   b. update state without mutations
                * 
                * We can safely break those rules inside createSlice(), as it is integrated
                * with Immer.js
            */
        },
        postUpdated(state,action){
            const { id, title, content } = action.payload //* Destructuring the payload
            const existingPost = state.find(post => post.id === id) //* Matching post in state
            if(existingPost) {
                existingPost.title = title //* Mutate value
                existingPost.content = content //*Mutate value, thanks Immer!
            }
        }
    }
})

export const { postAdded, postUpdated } = postsSlice.actions 
/* 
    * This !== postAdded method in reducers object above. 
    * Here, postAdded is an 'action creator' (https://www.craft.do/s/4arQORaj0iFD59)
    * that is automatically generated by createSlice() and given the same name as 
    * the method in postsSlice.reducers 
*/

export default postsSlice.reducer 