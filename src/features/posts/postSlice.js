import { createSlice } from '@reduxjs/toolkit'

const initialState = [
    { id: '1', title: 'First Post!', content: 'Hello!' },
    { id: '2', title: 'Second Post', content: 'More text' }
] //TODO: Refactor to use mirage.js API & faker.js data

const postsSlice = createSlice({
    name: 'posts', // This slice will be accessed as postsReducer in global store
    initialState, // *  Set with ES6 'object property value shorthand' https://www.craft.do/s/QvB4jxgOhoiWWE
    reducers: {}
})

export default postsSlice.reducer 