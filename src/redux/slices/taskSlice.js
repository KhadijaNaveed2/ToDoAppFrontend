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
        return rejectWithValue(error.response?.data || error.message);
    }
});

export const createTask = createAsyncThunk(
    "tasks/createTask",
    async (taskData, { rejectWithValue }) => {
        try {
            const { data } = await axios.post(
                "http://localhost:5000/api/v1/task/create-task",
                taskData,
                { headers: { "Content-Type": "application/json" } }
            );

            if (data.success) {
                toast.success(data.message);
                return data.task;
            } else {
                toast.error("Task not created");
                return rejectWithValue(data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong");
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);



export const updateTask = createAsyncThunk(
    'tasks/updateTask',
    async ({ id, updatedTask }, { rejectWithValue }) => {
        try {
            const { data } = await axios.put(`http://localhost:5000/api/v1/task/update-task/${id}`, updatedTask, {
                headers: { "Content-Type": "application/json" },
            });

            if (data.success) {
                toast.success(data.message);
                return data.task;
            } else {
                toast.error("Task not updated");
                return rejectWithValue(data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong");
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

export const deleteTask = createAsyncThunk('tasks/deleteTask', async (taskId, { rejectWithValue }) => {
    try {
        await axios.delete(`http://localhost:5000/api/v1/task/delete-task/${taskId}`);
        toast.success("Task Deleted Successfully");
        return taskId;
    } catch (error) {
        toast.error("Error deleting task");
        return rejectWithValue(error.response?.data || error.message);
    }
});
export const searchTask = createAsyncThunk("tasks/searchTask", async (name, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`http://localhost:5000/api/v1/task/search-task?name=${name}`);
      return data.tasks;
    } catch (error) {
      toast.error("Error searching tasks");
      return rejectWithValue(error.response?.data || error.message);
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
              if (action.payload) {
                state.tasks.push(action.payload);
              }
              state.loading = false;
            })
            .addCase(searchTask.fulfilled, (state, action) => {
      state.tasks = action.payload;
      state.loading = false;
    })
            .addCase(updateTask.fulfilled, (state, action) => {
                state.tasks = state.tasks.map((task) =>
                    task._id === action.payload._id ? action.payload : task
                );
                state.loading = false;
            })
            .addCase(deleteTask.fulfilled, (state, action) => {
                state.tasks = state.tasks.filter(task => task._id !== action.payload);
                state.loading = false;
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
