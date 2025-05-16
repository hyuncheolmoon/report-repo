import { usePathname } from 'next/navigation';
import { useMemo } from 'react';

const usePathHandler = () => {
  const pathname = usePathname();

  const path = useMemo(() => {
    return {
      main: '/survey',
      create: '/survey/create',
      preview: '/survey/preview',
    };
  }, []);

  return {
    path,
    pathname,
    showNavbar: pathname === path.main,
  };
};

export default usePathHandler;
