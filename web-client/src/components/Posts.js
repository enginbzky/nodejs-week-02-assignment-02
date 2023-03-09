import React from "react";
import Card from "react-bootstrap/Card";
import { faker } from "@faker-js/faker";
import { v4 as uuidv4 } from "uuid";

function Posts({
  posts,
  handleClickDelete,
  handleEdit,
  formik,
  isEditing,
  setIsEditing,
  handleClickAdd,
}) {
  const newFakePost = {
    id: uuidv4(),
    title: faker.lorem.sentence(5),
    content: faker.lorem.paragraph(),
  };
  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          formik.handleSubmit();
        }}
      >
        <h1>Add New Post</h1>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Title
          </label>
          <input
            type=""
            className="form-control"
            id="exampleInputEmail1"
            name="title"
            onChange={formik.handleChange}
            value={formik.values.title}
            //   aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Content
          </label>
          <textarea
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            name="content"
            onChange={formik.handleChange}
            value={formik.values.content}
          ></textarea>
        </div>
        <button type="submit" className="btn btn-success">
          {!isEditing ? "submit" : "update"}
        </button>
        {isEditing && (
          <button
            type="button"
            onClick={() => {
              setIsEditing(false);
              formik.resetForm();
            }}
            className="btn btn-danger"
          >
            cancel
          </button>
        )}
        <button
          type="button"
          onClick={() => {
            handleClickAdd(newFakePost);
            formik.resetForm();
          }}
          className="btn btn-success ms-3"
        >
          Generate
        </button>
      </form>
      <div>
        {posts.map((post) => (
          <Card key={post.id} className="m-3">
            <Card.Header>{post.title}</Card.Header>
            <Card.Body>
              <Card.Text>{post.content}</Card.Text>
            </Card.Body>
            <button
              className="btn btn-danger "
              onClick={() => handleClickDelete(post.id)}
              aria-label="delete user"
            >
              Delete
            </button>
            <button
              aria-label="edit user"
              className="btn btn-primary "
              onClick={() => handleEdit(post)}
            >
              Edit
            </button>
          </Card>
        ))}
      </div>
    </>
  );
}

export default Posts;
