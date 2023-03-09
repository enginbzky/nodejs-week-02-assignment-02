import express from "express";
const router = express.Router();

import postRepository from "../data/post-repository.js";

router.get("/", (req, res) => {
  const postList = postRepository.findAllPosts();
  res.status(200).send(postList);
});

router.post("/", (req, res) => {
  const post = req.body;
  const newPost = {
    id: post.id,
    title: post.title,
    content: post.content,
  };

  const addedPost = postRepository.createPost(newPost);
  res.status(201).send(addedPost);
});

router.delete("/:id", (req, res) => {
  const postId = req.params.id;
  postRepository.deletePost(postId);
  res.status(200).send(postId);
});

router.put("/:id", (req, res) => {
  const post = req.body;
  const postId = req.params.id;
  const updatedPost = {
    id: post.id,
    title: post.title,
    content: post.content,
  };
  const editedPost = postRepository.updatePost(updatedPost, postId);
  res.status(201).send(editedPost);
});

export default router;
