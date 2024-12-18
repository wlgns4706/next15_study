'use client';
import { useMenuStore } from '@/store/menu';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';

export default function TopNavi() {
  const { isShowMenubar, actions } = useMenuStore();

  return (
    <div className="p-4 border-b-2 flex">
      {isShowMenubar ? (
        <MenuUnfoldOutlined onClick={actions.handleShowMenubar} />
      ) : (
        <MenuFoldOutlined onClick={actions.handleShowMenubar} />
      )}
    </div>
  );
}
