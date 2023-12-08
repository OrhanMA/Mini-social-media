import { checkIfAdmin } from "@/helper";

export default async function ManagePost() {
  await checkIfAdmin();
  return (
    <div>
      <h1>Page to manage posts</h1>
    </div>
  );
}
