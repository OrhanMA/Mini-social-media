import {
  RegisterLink,
  LoginLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Link from "next/link";

const routes = [
  {
    name: "Feed",
    route: "/posts",
    onAuth: false,
  },
  {
    name: "Poster",
    route: "/posts/create",
    onAuth: true,
  },
  {
    name: "Mes posts",
    route: "/posts/my-posts",
    onAuth: true,
  },
];

export default async function Header() {
  const { getUser, isAuthenticated, getPermissions } = getKindeServerSession();
  const user = await getUser();
  const userLogged = await isAuthenticated();
  const permissions = await getPermissions();
  const isAdmin = permissions?.permissions.includes("admin");

  return (
    <div className="sticky top-0 w-full bg-white text-black p-6 flex justify-between gap-6">
      <nav className="w-3/4 flex items-center justify-center gap-12">
        <Link href={"/"}>Accueil</Link>
        {routes.map((route, index) =>
          !route.onAuth || (route.onAuth && userLogged) ? (
            <Link key={index} href={route.route}>
              {route.name}
            </Link>
          ) : null
        )}
        {isAdmin && <Link href={"/admin"}>Panel admin</Link>}
      </nav>
      <nav className="w-1/4 flex justify-end">
        {userLogged ? (
          <div className="flex gap-6 items-center">
            <p className="font-bold">{user?.given_name}</p>
            <LogoutLink>Deconnexion</LogoutLink>
          </div>
        ) : (
          <div className="flex gap-6 items-center">
            <RegisterLink>S&apos;inscrire</RegisterLink>
            <LoginLink>Se connecter</LoginLink>
          </div>
        )}
      </nav>
    </div>
  );
}
