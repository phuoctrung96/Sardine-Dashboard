import { selectIsAdmin, useUserStore } from "store/user";

export const AdminVisible = ({ children }: { children: JSX.Element | JSX.Element[] }): JSX.Element | null => {
  const isAdmin = useUserStore(selectIsAdmin);

  if (!isAdmin) return null;
  return <>{children}</>;
};
