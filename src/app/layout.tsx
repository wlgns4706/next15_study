import { MenuProps } from 'antd';
import './globals.css';
import SubMenu from '@/components/main/SubMenu';
import TopNavi from '@/components/main/TopNavi';
import { Suspense } from 'react';
import Loading from './loading';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  type MenuItem = Required<MenuProps>['items'][number];

  const fetchPosts = async () => {
    const response = await fetch('http://localhost:3000/api/menus', {
      method: 'get',
      cache: 'no-store',
    });
    console.log(response);
    return response.json();
  };

  const { data: items } = await fetchPosts();

  return (
    <html lang="ko">
      <body>
        <Suspense fallback={<Loading />}>
          <div className="flex flex-col">
            <div className="w-full">
              <TopNavi />
            </div>
            <div className="flex h-[100vh] gap-2">
              <SubMenu menuItems={items} />
              <section className="p-2">{children}</section>
            </div>
          </div>
        </Suspense>
      </body>
    </html>
  );
}
