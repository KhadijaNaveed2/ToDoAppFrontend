import React, { useEffect, useState } from "react";
import Layout from "./../../components/Layout/Layout.js";
import toast from "react-hot-toast";
import axios from "axios";
import TaskForm from "../../components/Form/TaskForm.js";
import { Modal } from 'antd';


const CreateTasks = () => {
    const [tasks, setTasks] = useState([]);
    const [name, setName] = useState("");
    const [visible, setVisible] = useState(false);
    const [selected, setSelected] = useState(null);
    const [updatedName, setUpdatedName] = useState("");

    // Handle Form Submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post("http://localhost:5000/api/v1/task/create-task", {
                name
            });
            if (data?.success) {
                toast.success(`${name} is Created`);
                getAllTasks();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong in Input Form");
        }
    };

    // Get All Categories
    const getAllTasks = async () => {
        try {
            const { data } = await axios.get("http://localhost:5000/api/v1/task/get-task");
            if (data?.success)
                setTasks(data?.task);
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong in getting Tasks");
        }
    };

    useEffect(() => {
        getAllTasks();
    }, []);

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(`http://localhost:5000/api/v1/task/update-task/${selected._id}`, { name: updatedName });
            if (data.success) {
                toast.success(`${updatedName} is updated`);
                setSelected(null);
                setUpdatedName("");
                setVisible(false);
                getAllTasks();
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error("Something went wrong");
        }
    };

  
    const handleDelete = async (categoryId) => {
        try {
            const { data } = await axios.delete(`http://localhost:5000/api/v1/task/delete-task/${categoryId}`);
            if (data.success) {
                toast.success(`Task is deleted`);
                getAllTasks();
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error("Something went wrong");
        }
    };

    return (
        <Layout title={"Dashboard - Create Tasks"}>
            <div className="container m-3 p-3">
                <h1>Manage Tasks</h1>
                <div className="p-3" style={{ maxWidth: '600px' }}>
                    <TaskForm
                        handleSubmit={handleSubmit}
                        value={name}
                        setValue={setName}
                    />
                </div>
                <div style={{ width: '100%' }}>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col" style={{ width: '70%' }}>Name</th>
                                <th scope="col" style={{ width: '30%' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tasks.map((c) => (
                                <tr key={c._id}>
                                    <td>{c.name}</td>
                                    <td style={{ display: 'flex', gap: '5px' }}>
                                        <button
                                            className="btn btn-primary"
                                            style={{ width: '120px' }}
                                            onClick={() => {
                                                setVisible(true);
                                                setUpdatedName(c.name);
                                                setSelected(c);
                                            }}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="btn btn-danger"
                                            style={{ width: '120px' }}
                                            onClick={() => handleDelete(c._id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <Modal
                    onCancel={() => setVisible(false)}
                    footer={null}
                    visible={visible}
                >
                    <TaskForm
                        value={updatedName}
                        setValue={setUpdatedName}
                        handleSubmit={handleUpdate}
                    />
                </Modal>
            </div>
        </Layout>
    );
};

export default CreateTasks;
