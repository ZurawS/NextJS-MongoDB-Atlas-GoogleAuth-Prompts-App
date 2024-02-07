"use client";

import React, { useEffect, useState } from "react";
import PromptCard from "./PromptCard";

const PromptCardList = ({
  data,
  handleTagClick,
}: {
  data: any;
  handleTagClick: (tag: string) => void;
}) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post: any) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();
      setPosts(data);
    };

    fetchPosts();
  }, []);

  const handleTagClick = (tag: string) => {};

  const handleSearch = () => {};

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          className="search_input peer"
          value={searchText}
          onChange={handleSearch}
          required
        />
      </form>

      <PromptCardList data={posts} handleTagClick={handleTagClick} />
    </section>
  );
};

export default Feed;
