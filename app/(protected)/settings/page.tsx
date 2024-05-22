"use client";

import { logout } from "@/actions/logout";
import { useCurrentUser } from "@/hooks/use-current-user";

const SettingsPage = () => {
  const user = useCurrentUser();

  const handleClick = () => {
    logout();
  }

  return (
    <div className="bg-emerald-500 px-5 py-2 rounded-xl">
      {JSON.stringify(user)}
      {/* <form
        action={async () => {
          "use server";

          await signOut({ redirectTo: "/auth/login" });
        }}
      >
        <button type="submit">Sign out</button>
      </form> */}
      <button type="submit" onClick={handleClick}>
        Sign out
      </button>
    </div>
  );
};

export default SettingsPage;
