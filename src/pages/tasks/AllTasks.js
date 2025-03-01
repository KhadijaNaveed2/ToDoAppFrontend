import React, { useEffect, useState } from "react";
import { Table, Button , Input} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks, deleteTask, searchTask } from "../../redux/slices/taskSlice";
import Layout from "../../components/Layout/Layout";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const AllTasks = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { tasks, loading } = useSelector((state) => state.task);
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const handleDelete = (taskId) => {
    dispatch(deleteTask(taskId));
  };
  const handleSearch = () => {
    dispatch(searchTask(search));
  };
  const handleEdit = (task) => {
    navigate(`/edit-tasks`, { state: { task } });
  };

  const columns = [
    { title: "Task Name", dataIndex: "title", key: "title" },
    { title: "Description", dataIndex: "description", key: "description" },
    { title: "Date", dataIndex: "date", key: "date" },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <>
          <Button
            icon={<EditOutlined />}
            style={{ marginRight: 10 }}
            onClick={() => handleEdit(record)}
          />
          <Button
            icon={<DeleteOutlined />}
            danger
            onClick={() => handleDelete(record._id)}
          />
        </>
      ),
    },
  ];

  return (
    <Layout title="All Tasks">
      <div className="container">
        <h1>All Tasks</h1>
        <Input.Search
          placeholder="Search Task by Name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onSearch={handleSearch}
          enterButton
        />
        <Table
          columns={columns}
          dataSource={tasks}
          rowKey="_id"
          loading={loading}
          pagination={{ pageSize: 10 }}
        />
      </div>
    </Layout>
  );
};

export default AllTasks;
