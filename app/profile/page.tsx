"use client";

import Profile from "@components/Profile";
import { User } from "next-auth";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const CurrentProfile = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [posts, setPosts] = useState([]);

  const handleEdit = () => {};
  const handleDelete = () => {};

  useEffect(() => {
    console.log(session);
    const fetchPosts = async () => {
      console.log(session);
      const response = await fetch(
        `/api/users/${(session?.user as User)?.id}/posts`
      );
      const data = await response.json();
      console.log(data);

      setPosts(data);
    };

    if ((session?.user as User)?.id) {
      fetchPosts();
    }
  }, []);

  return (
    <Profile
      name={"My"}
      description="Welcome to your profile"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    ></Profile>
  );
};

export default CurrentProfile;
