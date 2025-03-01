import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout.js";
import toast from "react-hot-toast";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setAuth } from "../../redux/slices/authSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const ls = localStorage;

  const token = localStorage.getItem("token");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneno, setPhoneno] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    if (user) {
      const { email, name, phoneno, address } = user;
      setName(name || "");
      setEmail(email || "");
      setPhoneno(phoneno || "");
      setAddress(address || "");
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const { data } = await axios.put(
            "http://localhost:5000/api/v1/auth/profile",
            { name, email, password, phoneno, address },
            {
              headers: {
                Authorization: `Bearer ${token}`, // Token mein "Bearer" aur space ka khayal zaroori hai
              },
            }
          );
          
  
      if (!data.success) {
        toast.error(data.message);
      } else {
        dispatch(setAuth({ user: data.updatedUser, token: token }));
        localStorage.setItem("token", token);

        toast.success(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };
  

  return (
    <Layout title={"Your Profile - DreamDecor"}>
      <div className="admin-dashboard m-3 p-3">
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-6 gap-4">
            <div className="form-container">
              <form onSubmit={handleSubmit}>
                <h3 className="title">USER PROFILE</h3>
                <div className="mb-3">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-control"
                    placeholder="Enter Your Name"
                    autoFocus
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="email"
                    value={email}
                    className="form-control"
                    placeholder="Enter Your Email"
                    disabled
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-control"
                    placeholder="Enter Your Password"
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    value={phoneno}
                    onChange={(e) => setPhoneno(e.target.value)}
                    className="form-control"
                    placeholder="Enter Your Phone-No"
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="form-control"
                    placeholder="Enter Your Address"
                  />
                </div>
                <button type="submit" className="btn btn-primary">UPDATE</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
