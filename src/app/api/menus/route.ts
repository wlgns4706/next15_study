import { MenuProps } from 'antd';
import { NextResponse } from 'next/server';

export function GET() {
  type MenuItem = Required<MenuProps>['items'][number];

  const items: MenuItem[] = [
    {
      key: '/',
      label: 'home',
    },
    {
      key: 'test',
      label: 'test',
    },
  ];
  return NextResponse.json({ data: items, success: true });
}
