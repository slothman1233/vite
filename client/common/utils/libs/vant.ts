import type { App } from 'vue';
import {
  Tabbar,
  TabbarItem,
  Swipe,
  SwipeItem,
  Image as VanImage,
  NavBar,
  Tab,
  Tabs,
  Toast,
  Cell,
  CellGroup,
  Image,
  Col,
  Row,
  Grid,
  GridItem,
  Icon,
  Sidebar,
  SidebarItem,
  Card,
  Tag,
  List,
  Sticky,
  Button,
  TreeSelect,
  Picker,
  Form,
  Field,
  Popup,
} from 'vant';

const components = [
  Toast,
  Tabbar,
  TabbarItem,
  Swipe,
  SwipeItem,
  VanImage,
  NavBar,
  Tab,
  Tabs,
  Cell,
  CellGroup,
  Image,
  Col,
  Row,
  Grid,
  GridItem,
  Icon,
  Sidebar,
  SidebarItem,
  Card,
  Tag,
  List,
  Sticky,
  Button,
  TreeSelect,
  Picker,
  Form,
  Field,
  Popup,
];

// import vant from 'vant';

export function setupVant(app: App<Element>): void {
  // 设置语言
  // locale.use(lang)
  components.forEach((component: any) => {
    app.use(component);
  });

  // app.use(vant);
}
