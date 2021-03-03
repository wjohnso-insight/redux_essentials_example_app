import { createSlice, nanoid } from '@reduxjs/toolkit'
import { sub } from 'date-fns'

const initialState = [
    { 
        id: '1', 
        title: 'First Post!', 
        content: 'Hello!', 
        date: sub(new Date(), { minutes: 10 }).toISOString(), //* Makes date 10 minutes ago
        user: "1",
        reactions: {
            thumbsUp: 0, 
            hooray: 0,
            heart: 0,
            rocket: 0,
            eyes: 0 
        }
    },
    { 
        id: '2', 
        title: 'Second Post',
        content: 'More text', 
        date: sub(new Date(), { minutes: 5 }).toISOString(),
        user: "2",
        reactions: {
            thumbsUp: 0, 
            hooray: 0,
            heart: 0,
            rocket: 0,
            eyes: 0 
        }
    }
] //TODO: Refactor to use mirage.js API & faker.js data

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        reactionAdded(state,action){
            const { postId, reaction } = action.payload
            const existingPost = state.find(post => post.id === postId)
            if(existingPost){
                existingPost.reactions[reaction]++
            }
        },
        postAdded:{
            reducer(state,action){
                state.push(action.payload)
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
            const existingPost = state.find(post => post.id === id) //* Matching post in state
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