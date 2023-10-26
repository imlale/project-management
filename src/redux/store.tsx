import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import taskSlice  from './taskSlice'
import screenSlice from './screenSlice'
import projectSlice from './projectSlice'
import taskListSlice from './taskListSlice'
import { apiSlice } from '../services/apiSlice'
import userSlice from './userSlice'


export const store = configureStore({
  reducer: {
    task: taskSlice,
    screen: screenSlice,
    project: projectSlice,
    taskList: taskListSlice,
    user: userSlice,
    [apiSlice.reducerPath]: apiSlice.reducer, //RTK Query 
    
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),  
})

export const GeneralStoreProvider = ({ children }: { children: React.ReactNode }) => {
  return <Provider store={store}>{children}</Provider>
}


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch