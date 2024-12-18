'use client';
import { useMenuStore } from '@/store/menu';
import { Menu, MenuProps } from 'antd';
import { useRouter } from 'next/navigation';

type Props = {
  menuItems: Required<MenuProps>['items'][number][];
};

export default function SubMenu({ menuItems }: Props) {
  const isShowMenubar = useMenuStore((state) => state.isShowMenubar);
  const router = useRouter();
  return (
    <Menu
      onClick={(item) => router.push(`/${item.key}`)}
      style={{ maxWidth: 256, boxShadow: 'rgba(0, 0, 0, 0.1) 1px 1px 6px' }}
      // defaultSelectedKeys={['1']}
      // defaultOpenKeys={['sub1']}
      mode="inline"
      items={menuItems}
      inlineCollapsed={isShowMenubar}
    />
  );
}
