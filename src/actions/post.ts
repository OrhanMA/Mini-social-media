"use server";
import { checkIfSameUser } from "@/helper";
import { mongo_client } from "@/variables";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

export async function createPost(formData: FormData) {
  const postData = {
    text: formData.get("post"),
    user_id: formData.get("user_id"),
  };

  const isSameUser = await checkIfSameUser(formData.get("user_id"));
  if (!isSameUser) {
    redirect("/");
  }
  try {
    await mongo_client.connect();
    const db = await mongo_client.db("social-media");
    const posts_collection = await db.collection("posts");

    await posts_collection.insertOne({
      user_id: postData.user_id,
      text: postData.text,
    });
  } catch (error) {
    throw new Error(`Error creating the post: ${error}`);
  } finally {
    redirect("/posts");
  }
}

export async function findPosts() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    throw new Error("User not found");
  }

  try {
    await mongo_client.connect();
    const db = await mongo_client.db("social-media");
    const posts_collection = await db.collection("posts");

    const user_posts = await posts_collection
      .find({ user_id: user.id })
      .toArray();

    return user_posts;
  } catch (error) {
    console.error(`Error finding posts: ${error}`);
    throw new Error(`Error finding posts: ${error}`);
  }
}
