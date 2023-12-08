import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

export async function checkIfAdmin() {
  const { getPermissions } = getKindeServerSession();
  const permissions = await getPermissions();
  const user_roles = await permissions?.permissions;
  const user_is_admin = user_roles?.includes("admin");
  if (!user_is_admin) {
    redirect("/");
  }
}

export async function checkIfSameUser(user_id: FormDataEntryValue | null) {
  if (user_id === null) {
    throw new Error(`user_id is ${user_id}, so check is not possible`);
  } else {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    if (!user || user.id != user_id) {
      redirect("/");
    }
    return true;
  }
}
