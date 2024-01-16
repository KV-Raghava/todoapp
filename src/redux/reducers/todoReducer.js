
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const { createSlice } = require("@reduxjs/toolkit");
const initialState={
    todos:[
        {text:"Go to Gym at 6", completed: false},
        {text: "Study at 8", completed: true}
    ]
}
const apiEndpoint = "https://jsonplaceholder.typicode.com/todos";
// Creating Reducer using Redux Toolkit
export const fetchTodos = createAsyncThunk('todo/fetchTodos', async () => {
    try {
      console.log("inside fetchTodos");
      const response = await axios.get(apiEndpoint);
      return response.data;
    } catch (error) {
      throw error;
    }
  });
  export const postAdd = createAsyncThunk('todo/postAdd', async (postData) => {
    try {
      console.log("inside postAdd");
      const response = await axios.post('https://jsonplaceholder.typicode.com/posts', postData, {
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    // return response.data;
    return postData;
    } catch (error) {
      throw error;
    }
  });
  export const update = createAsyncThunk('todo/update', async (postData) => {
    try {
      console.log("inside postAdd");
      const response = await axios.put('https://jsonplaceholder.typicode.com/posts/1', postData, {
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    return response.data;
    } catch (error) {
      throw error;
    }
  });

  export const deleteTask = createAsyncThunk('todo/deleteTask', async (postData) => {
    try {
      console.log("inside postAdd");
     
      const response = await axios.delete(`https://jsonplaceholder.typicode.com/posts/${postData.id}`);
    return postData.id;
    } catch (error) {
      throw error;
    }
  });
const todoSlice = createSlice({
    name:'todo',
    initialState:initialState,
    reducers:{
        // this is add action
        add:(state, action)=>{
                state.todos.push({
                    text:action.payload,
                    completed: false
                })
        },
        toggle:(state, action)=>{
            state.todos.map((todo, i)=>{
                if(i===action.payload){
                    todo.completed=!todo.completed;
                }
                return todo;
            })
        }
    },
    extraReducers: (builder) => {
        builder
          // Pending state when the request is in progress
          .addCase(fetchTodos.pending, (state) => {
            
          })
          // Fulfilled state when the request is successful
          .addCase(fetchTodos.fulfilled, (state, action) => {
            
            state.todos = action.payload;
          })
          // Rejected state when the request fails
          .addCase(fetchTodos.rejected, (state, action) => {
            
          })

          .addCase(postAdd.fulfilled, (state, action) => {            
            console.log("inside fulfilled");            
            state.todos = [action.payload, ...state.todos];
          })

          .addCase(deleteTask.fulfilled, (state, action) => {            
            console.log("inside delete");            
            state.todos = state.todos.filter(item => item.id !== action.payload)
          });
         
      },
});

export const todoReducer=todoSlice.reducer;

export const actions = todoSlice.actions;

// selector
export const todoSelector = (state)=>state.todoReducer.todos;



