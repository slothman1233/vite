import { App, getCurrentInstance, inject, watchEffect } from 'vue';

function htmlspecialchars(str: string) {
  str = str.replace(/&/g, '&amp;');
  str = str.replace(/</g, '&lt;');
  str = str.replace(/>/g, '&gt;');
  str = str.replace(/"/g, '&quot;');
  str = str.replace(/'/g, '&#039;');
  return str;
}

// Meta 类
class MyMeta {
  private defaultTitle = 'vue_ssr';
  private head: commonObject<any> = {
    title: this.defaultTitle,
    description: '',
    keywords: '',
    image: '',
    metas: [],
  };

  setHead(heads: commonObject<any>) {
    if (heads.title) {
      this.head.title = heads.title;
    }
    const metas = [];
    for (const i in heads.metas) {
      const item = heads.metas[i];
      const type = item.name || item.property;
      switch (type) {
        case 'description':
          this.head.description = item.content;
          break;

        case 'keywords':
          this.head.keywords = item.content;
          break;

        case 'og:image':
          this.head.image = item.content;
          break;

        default:
          metas.push(item);
          break;
      }
    }
    this.head.metas = metas;
    //@ts-ignore
    if (!import.meta.env.SSR) {
      const title = document.getElementsByTagName('title');
      if (title && title.length) {
        title[0].innerText = heads.title || this.defaultTitle;
      } else {
        const title = document.createElement('title');
        title.innerText = heads.title || this.defaultTitle;
        document.getElementsByTagName('head')[0].appendChild(title);
      }
    }
  }

  getHead() {
    let description = this.head.description;
    let keywords = this.head.keywords;
    let ogDescription = this.head.description;
    let ogImage = this.head.image;
    const metas = [];
    for (const i in this.head.metas) {
      const item = this.head.metas[i];
      const type = item.name || item.property;
      switch (type) {
        case 'description':
          description = htmlspecialchars(item.content);
          break;

        case 'keywords':
          if (typeof item.content === 'string') {
            keywords = htmlspecialchars(item.content);
          } else if (item.content instanceof Array) {
            const k = [];
            for (const i in item.content) {
              k.push(htmlspecialchars(item.content[i]));
            }
            keywords = k.join('、');
          }
          break;

        case 'og:description':
          ogDescription = htmlspecialchars(item.content);
          break;

        case 'og:image':
          ogImage = item.content;
          break;

        default:
          item.content = htmlspecialchars(item.content);
          metas.push(item);
          break;
      }
    }

    return {
      title: this.head.title,
      metas: [
        {
          name: 'description',
          content: description,
        },
        {
          name: 'keywords',
          content: keywords,
        },
        {
          property: 'og:title',
          content: this.head.title,
        },
        {
          property: 'og:description',
          content: ogDescription,
        },
        {
          property: 'og:image',
          content: ogImage,
        },
        ...metas,
      ],
    };
  }
  renderToString() {
    const heads = this.getHead();

    let string = `<title>${heads.title}</title>`;
    for (const i in heads.metas) {
      const meta = heads.metas[i];
      let key = '';
      let val = '';
      if (meta.name) {
        key = 'name';
        val = meta.name;
      } else if (meta.property) {
        key = 'property';
        val = meta.property;
      }
      if (!key) {
        return;
      }

      string += `<meta ${key}="${val}" content="${meta.content}">`;
    }

    const date = new Date();
    const time =
      date.getFullYear().toString() +
      '-' +
      (date.getMonth() + 1).toString() +
      '-' +
      date.getDate().toString() +
      ' ' +
      date.getHours().toString() +
      ':' +
      date.getMinutes().toString() +
      ':' +
      date.getSeconds().toString();
    string += `<meta name="updatetime" content="${time}">`;
    return string;
  }
}

// 在 setUp 里使用
export function usMeta(): MyMeta | undefined {
  return inject('myMeta');
}

// 在页面组件里单独引入 mixin
export const myMeta = {
  data() {
    const instance = getCurrentInstance();
    return {
      // @ts-ignore
      _myMetaHeadFn: instance?.type.head,
    };
  },
  created() {
    // @ts-ignore
    if (this._myMetaHeadFn) {
      // @ts-ignore
      this.$myMeta.setHead(this._myMetaHeadFn());
    }
  },
  activated() {
    // @ts-ignore
    if (this._myMetaHeadFn) {
      // @ts-ignore
      this.$myMeta.setHead(this._myMetaHeadFn());
    }
  },
  mounted() {
    // @ts-ignore
    if (this._myMetaHeadFn) {
      watchEffect(() => {
        // @ts-ignore
        this.$myMeta.setHead(this._myMetaHeadFn());
      });
    }
  },
};

export default function createMeta() {
  return {
    install(app: App, option: commonObject<any>) {
      const $myMeta = new MyMeta();
      // 全局 mixin
      if (option.mixin) {
        app.mixin(myMeta);
      }
      app.provide('myMeta', $myMeta);
      app.config.globalProperties.$myMeta = $myMeta;
    },
  };
}

export function setupMeta(app: App<Element>) {
  app.use(createMeta(), { mixin: true });
}
