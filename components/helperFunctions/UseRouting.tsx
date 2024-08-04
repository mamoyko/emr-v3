import { useRouter, usePathname } from "next/navigation";

const UseRouting = () => {
  const router = useRouter();
  const pathname = usePathname();

  const routePathId = (param?: string, value?: string) => {
    if (param && value !== undefined) {
      const newQuery = new URLSearchParams(window.location.search);
      newQuery.set(param, value);
      router.replace(`${pathname}?${newQuery.toString()}`);
    }
  };

  const routePath = (path?: string) => {
    if (path) {
      router.push(path);
    }
  };

  return { routePathId, routePath };
};

export default UseRouting;
