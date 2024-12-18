import { MenuProps } from 'antd';
import { NextRequest, NextResponse } from 'next/server';

export function GET(request: NextRequest) {
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
