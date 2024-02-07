import React from "react";
import PromptCard from "./PromptCard";

const Profile = ({
  name,
  description,
  data,
  handleEdit,
  handleDelete,
}: {
  name: string;
  description: string;
  data: any;
  handleEdit: (post: any) => void;
  handleDelete: (post: any) => void;
}) => {
  return (
    <section className="w-full flex-center flex-col text-center">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{name} Profile </span>
      </h1>

      <p className="desc text-left">{description}</p>

      <div className="mt-16 prompt_layout">
        {data.map((post: any) => (
          <PromptCard
            key={post._id}
            post={post}
            handleEdit={() => handleEdit && handleEdit(post)}
            handleDelete={() => handleDelete && handleDelete(post)}
          />
        ))}
      </div>
    </section>
  );
};

export default Profile;
