import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import toast from 'react-hot-toast';

// Async Thunks
export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async (_, { rejectWithValue }) => {
    try {
        const { data } = await axios.get("http://localhost:5000/api/v1/task/get-task");
        return data.task;
    } catch (error) {
        toast.error("Error fetching tasks");
        return rejectWithValue(error.response.data);
    }
});

export const createTask = createAsyncThunk('tasks/createTask', async (taskName, { rejectWithValue }) => {
    try {
        const { data } = await axios.post("http://localhost:5000/api/v1/task/create-task", { name: taskName });
        if (data.success) toast.success(`${taskName} is Created`);
        return data.task;
    } catch (error) {
        toast.error("Error creating task");
        return rejectWithValue(error.response.data);
    }
});

export const deleteTask = createAsyncThunk('tasks/deleteTask', async (taskId, { rejectWithValue }) => {
    try {
        await axios.delete(`http://localhost:5000/api/v1/task/delete-task/${taskId}`);
        toast.success("Task Deleted Successfully");
        return taskId;
    } catch (error) {
        toast.error("Error deleting task");
        return rejectWithValue(error.response.data);
    }
});

const taskSlice = createSlice({
    name: 'tasks',
    initialState: {
        tasks: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state.tasks = action.payload;
                state.loading = false;
            })
            .addCase(createTask.fulfilled, (state, action) => {
                state.tasks.push(action.payload);
            })
            .addCase(deleteTask.fulfilled, (state, action) => {
                state.tasks = state.tasks.filter(task => task._id !== action.payload);
            })
            .addMatcher(action => action.type.endsWith('/pending'), (state) => {
                state.loading = true;
            })
            .addMatcher(action => action.type.endsWith('/rejected'), (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export default taskSlice.reducer;
