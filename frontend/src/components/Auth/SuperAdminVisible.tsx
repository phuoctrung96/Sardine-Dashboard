import { selectIsSuperAdmin, useUserStore } from "store/user";

export const SuperAdminVisible = ({ children }: { children: JSX.Element | JSX.Element[] }): JSX.Element | null => {
  const isSuperAdmin = useUserStore(selectIsSuperAdmin);

  if (!isSuperAdmin) return null;
  return <>{children}</>;
};
