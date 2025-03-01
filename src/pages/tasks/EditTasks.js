import React, { useEffect } from "react";
import { Form, Input, Button, DatePicker } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateTask } from "../../redux/slices/taskSlice";
import Layout from "../../components/Layout/Layout";
import dayjs from "dayjs";

const EditTasks = () => {
  const [form] = Form.useForm();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { task } = location.state || {};

  useEffect(() => {
    if (task) {
      form.setFieldsValue({
        title: task.title,
        description: task.description,
        date: dayjs(task.date),
      });
    }
  }, [task, form]);

  const handleSubmit = (values) => {
    const updatedTask = {
      id: task._id,
      updatedTask: {
        title: values.title,
        description: values.description,
        date: values.date.format("YYYY-MM-DD"),
      }
    };
    dispatch(updateTask(updatedTask));
    
    navigate("/all-tasks");
  };

  return (
    <Layout title="Edit Task">
      <div className="container">
        <h1>Edit Task</h1>
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            name="title"
            label="Task Name"
            rules={[{ required: true, message: "Please enter task name" }]}
          >
            <Input placeholder="Enter Task Name" />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: "Please enter description" }]}
          >
            <Input.TextArea placeholder="Enter Description" rows={4} />
          </Form.Item>
          <Form.Item
            name="date"
            label="Task Date"
            rules={[{ required: true, message: "Please select date" }]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>

          <Button type="primary" htmlType="submit">
            Update Task
          </Button>
        </Form>
      </div>
    </Layout>
  );
};

export default EditTasks;
