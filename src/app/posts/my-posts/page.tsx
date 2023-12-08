import { findPosts } from "@/actions/post";
import Link from "next/link";

export default async function MyPosts() {
  const posts = await findPosts();

  return (
    <div className="p-12 flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-12">Mes posts:</h1>
      {posts.length <= 0 ? (
        <div className="p-12 flex flex-col items-center">
          <h1 className="text-4xl font-bold mb-12">
            Vous n&apos;avez pas de posts pour l&apos;instant
          </h1>
          <Link
            className="bg-white px-4 py-2 rounded-md text-black"
            href={"/posts/create"}
          >
            Cliquer ici pour faire votre premier post
          </Link>
        </div>
      ) : (
        <ul className="flex flex-col items-center gap-6 w-1/2">
          {posts.map((post) => {
            return (
              <li
                className="text-center font-bold text-2xl border w-full p-6 rounded-md"
                key={post._id.toString()}
              >
                {post.text}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
