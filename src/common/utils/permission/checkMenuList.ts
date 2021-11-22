export type Menu = {
  id: number;
  parentId: number;
  menuIdx: number;
  menuName: string;
  menuIcon: string;
  permission: string;
  type: number;
  routePath: string;
  componentName: string;
  componentPath: string;
  remark: any;
  outside: number;
  show: number;
  cached: number;
  createTime: string;
  children: Menu[];
  authorized: boolean;
};

// function tovue(data: Menu[]) {
//   return checkMenuList(data);
// }

function checkMenuList(list: Menu[], routes: AppRouteRecordRaw[]): object[] {
  if (!list) return [];
  const _routes: object[] = [];
  list.forEach((item) => {
    const { type, menuName, children, permission } = item;
    // 首先检查是否目录
    const isDir = type === 1;
    // 检测是否包含子菜单
    const hasChildren = children && !!children.length;
    routes.forEach((route) => {
      // 如果是目录则只比对名字 菜单则比对标识
      const hasRoute = isDir
        ? route?.meta?.title === menuName
        : route?.meta?.permission === permission;
      const { children: _children } = route;
      let tempChildren;
      if (hasRoute && hasChildren && _children && _children.length) {
        // 如果路由存在并且有子菜单 进行子菜单的比对
        tempChildren = checkMenuList(children, _children);
      }
      hasRoute &&
        _routes.push(
          Object.assign({}, route, tempChildren ? { children: tempChildren } : undefined),
        );
    });
  });
  return _routes;
}

export default checkMenuList;
