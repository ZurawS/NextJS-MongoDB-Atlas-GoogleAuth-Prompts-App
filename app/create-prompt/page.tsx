"use client";
import { useSession } from "next-auth/react";
import React, { FormEvent, useState } from "react";

import Form from "@components/Form";
import { User } from "next-auth";
import { useRouter } from "next/navigation";

export interface Post {
  prompt: string;
  tag: string;
}

const CreatePrompt = () => {
  const [post, setPost] = useState<Post>({
    prompt: "",
    tag: "",
  });
  const [submitting, setSubmitting] = useState<boolean>(false);
  const session = useSession();
  const router = useRouter();

  const CreatePrompt = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch("/api/prompt/new", {
        method: "POST",
        body: JSON.stringify({
          prompt: post.prompt,
          userId: (session.data?.user as User).id,
          tag: post.tag,
        }),
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <Form
        type="Create"
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={CreatePrompt}
      />
    </div>
  );
};

export default CreatePrompt;
