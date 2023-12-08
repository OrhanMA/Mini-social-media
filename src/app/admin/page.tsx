import { checkIfAdmin } from "@/helper";

export default async function Admin() {
  await checkIfAdmin();

  return (
    <div>
      <h1>Admin dashboard</h1>
      <p>you cannot access this page without proper role</p>
    </div>
  );
}
