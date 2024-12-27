'use client';
import { useMenuStore } from '@/store/menu';
import { Menu, MenuProps } from 'antd';
import { useRouter } from 'next/navigation';

type MenuItem = Required<MenuProps>['items'][number];

type Props = {
  menuItems: MenuItem[];
};

export default function SubMenu({ menuItems }: Props) {
  const isShowMenubar = useMenuStore((state) => state.isShowMenubar);
  const router = useRouter();

  return (
    <Menu
      onClick={(item) => router.push(`/${item.key}`)}
      style={{ maxWidth: 256, boxShadow: 'rgba(0, 0, 0, 0.1) 1px 1px 6px' }}
      _internalDisableMenuItemTitleTooltip
      mode="inline"
      items={menuItems}
      inlineCollapsed={isShowMenubar}
    />
  );
}
