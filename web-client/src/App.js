import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import Posts from "./components/Posts";
import { v4 as uuidv4 } from "uuid";
// import Users from "./components/Users";

function App() {
  const [posts, setPosts] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [postId, setPostId] = useState(null);
  // const [users, setUsers] = useState([]);
  // const [selectedUser, setSelectedUser] = useState(null);

  const fetchData = async () => {
    const postsResponse = await fetch("http://localhost:8080/api/posts");
    const postsData = await postsResponse.json();
    setPosts(postsData);
    // const usersResponse = await fetch(`${baseUrl}/users`);
    // const usersData = await usersResponse.json();
    // setUsers(usersData);
  };
  useEffect(() => {
    fetchData();
  });

  const handleClickAdd = async (pNewPost) => {
    await fetch("http://localhost:8080/api/posts", {
      method: "POST",
      body: JSON.stringify(pNewPost),
      headers: { "Content-Type": "application/json" },
    });

    await fetchData();
  };

  const handleClickDelete = async (pId) => {
    await fetch("http://localhost:8080/api/posts/" + pId, {
      method: "DELETE",
    });

    await fetchData();
  };

  const updatePost = async (id, post) => {
    const options = {
      method: "PUT",
      body: JSON.stringify(post), // data can be an object or a string
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await fetch(
        `http://localhost:8080/api/posts/${id}`,
        options
      );
      const json = await response.json();
      if (response.ok) {
        return json; /// <=== return the fetched json data
      } else {
        throw new Error(response.statusText);
      }
    } catch (error) {
      throw error;
    }
  };

  const handleEdit = (pPost) => {
    setIsEditing(true);
    setPostId(pPost.id);
    formik.setValues({
      title: pPost.title,
      content: pPost.content,
    });
  };

  const handlePostUpdate = async (pValues) => {
    const post = {
      title: pValues.title,
      content: pValues.content,
    };
    try {
      await updatePost(postId, post);
      fetchData();
    } catch (error) {
      console.log(error);
    }
    setIsEditing(false);
  };

  const handleSubmit = async (pValues) => {
    const newPost = {
      id: uuidv4(),
      title: pValues.title,
      content: pValues.content,
    };
    try {
      await handleClickAdd(newPost);
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  const formik = useFormik({
    initialValues: {
      id: "",
      title: "",
      content: "",
    },
    onSubmit: (values, { resetForm }) => {
      if (!isEditing) {
        handleSubmit(values);
      } else {
        handlePostUpdate(values);
      }
      resetForm();
    },
  });

  return (
    <div>
      <Posts
        posts={posts}
        handleSubmit={handleSubmit}
        handleClickDelete={handleClickDelete}
        handleEdit={handleEdit}
        handlePostUpdate={handlePostUpdate}
        formik={formik}
        handleClickAdd={handleClickAdd}
      />
    </div>
  );
}

export default App;
