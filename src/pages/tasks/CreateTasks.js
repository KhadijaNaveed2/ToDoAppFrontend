import React, { useState } from "react";
import { Form, Input, Button, DatePicker, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { createTask } from "../../redux/slices/taskSlice";
import Layout from "../../components/Layout/Layout";
import { useNavigate } from "react-router-dom";

const CreateTasks = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [file, setFile] = useState(null);

    const [form] = Form.useForm();

    const handleSubmit = async (values) => {
        const taskData = {
            title: values.title,
            description: values.description,
            date: values.date.format("YYYY-MM-DD"),
            file: file ? file.name : "",
        };
        await dispatch(createTask(taskData));
        message.success("Task Created Successfully");
        form.resetFields();
        setFile(null);
        navigate("/all-tasks");
    };

    return (
        <Layout title="Dashboard - Create Tasks">
            <div className="container">
                <h1>Create Tasks</h1>
                <Form form={form} layout="vertical" onFinish={handleSubmit}>
                    <Form.Item name="title" label="Task Name" rules={[{ required: true, message: "Please enter task name" }]}>                        
                        <Input placeholder="Enter Task Name" />
                    </Form.Item>
                    <Form.Item name="description" label="Description" rules={[{ required: true, message: "Please enter description" }]}>                        
                        <Input.TextArea placeholder="Enter Description" rows={4} />
                    </Form.Item>
                    <Form.Item name="date" label="Task Date" rules={[{ required: true, message: "Please select date" }]}>                        
                        <DatePicker style={{ width: "100%" }} />
                    </Form.Item>
                    <Form.Item name="file" label="Upload File">                        
                        <Upload beforeUpload={() => false} maxCount={1} onChange={(info) => setFile(info.file)}>
                            <Button icon={<UploadOutlined />}>Click to Upload</Button>
                        </Upload>
                    </Form.Item>
                    <Button type="primary" htmlType="submit">                        
                        Create Task
                    </Button>
                </Form>
            </div>
        </Layout>
    );
};

export default CreateTasks;
