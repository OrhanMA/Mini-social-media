import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { createPost } from "@/actions/post";
import { redirect } from "next/navigation";
export default async function CreatePost() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    redirect("/api/auth/login");
  }


  return (
    <div className="p-12 flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-12">Mon post:</h1>
      <form action={createPost} className="w-1/2">
        <div className="flex flex-col gap-4">
          <label className="text-2xl font-semibold" htmlFor="post">
            Post:
          </label>
          <input
            type="text"
            name="post"
            id="post"
            className="rounded-md p-6 text-black"
          />
        </div>
        <input
          hidden
          defaultValue={user?.id}
          type="text"
          name="user_id"
          id="user_id"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-white text-black mt-6 rounded-md"
        >
          Creer le post
        </button>
      </form>
    </div>
  );
}
