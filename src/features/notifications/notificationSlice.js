import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { client } from '../../api/client'

export const fetchNotifications = createAsyncThunk(
    'notifications/fetchNotifications', //* action type
    async(_, { getState }) => { //* payload creator
        const allNotifications = selectAllNotifications(getState()) //* getState() is from thunkApi, the deconstructed param
        const [latestNotification] = allNotifications //* Destructuring Notification[]; first array element will be the newest
        const latestTimestamp = latestNotification ? latestNotification.date : ''
        const response = await client.get(
            `/fakeApi/notifications?since=${latestTimestamp}`
        )
        return response.notifications
    }
)

/*
    ! fetchNotifications payload creator
    //-------------------------------------//
    * See (payload creator) https://www.craft.do/s/8MthwFVOzHvJ4b
    * The first argument "_", is the 'arg' value. Since this value is empty, the underscore
    * is passed in to signal an empty argument
    * The second argument deconstructs the `thunkApi` object that is always the second argument
    * of a payload creator. It is equivalent to `thunkApi.getState`

*/

    const notificationSlice = createSlice({
        name: 'notifications',
        initialState: [],
        reducers:{},
        extraReducers:{
            [fetchNotifications.fulfilled]: (state, action) =>{
                //* action.payload is an array of notifications. By spreading them into state.push
                //* they are pushed into state one at a time, and not as an array
                state.push(...action.payload) 
                //* Sort with newest first
                state.sort((a,b) => b.date.localeCompare(a.date))
            }
        }
    }
)

export default notificationSlice.reducer

export const selectAllNotifications = state => state.notifications
