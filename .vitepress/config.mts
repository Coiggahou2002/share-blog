import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Rory 的自留地',
  description: 'Rory 的自留地，分享新生指南、求职经验、技术体系',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: '大学新生指南', link: '/guide/index' },
      {
        text: '前端开发',
        items: [
          {
            text: '基础知识',
            link: '/fe/basics/index',
          },
          {
            text: '解决方案积累',
            link: '/fe/solutions/index',
          },
        ]
      },
      {
        text: '资源',
        items: [
          {
            text: '学习资源',
            link: '/resource/index'
          },
        ]
      },
      {
        text: '关于',
        items: [
          {
            text: '关于本站',
            link: '/about/site'
          },
          {
            text: '关于我',
            link: '/about/me/index'
          },
        ],
      },
    ],

    sidebar: {
      '/resource/': [
        {
          text: '学习资源',
          link: '/resource/index'
        },
        {
          text: '好玩的东西',
          items: [
            {
              text: '写代码用什么字体比较帅?',
              link: '/resource/code-fonts'
            }
          ]
        },
      ],
      '/fe/basics/': [
        {
          text: '移动端开发',
          items: [
            {
              text: '各种宽度和高度',
              link: '/fe/basics/window-dimensions',
            },
            {
              text: '各种 Viewport',
              link: '/fe/basics/viewports',
            }
          ],
        }
      ],
      '/fe/solutions/': [
        {
          text: 'Web',
          items: [
            {
              text: 'H5 中检测键盘弹起',
              link: '/fe/solutions/h5-keyboard-detect',
            },
            {
              text: '经典跨域问题解决方案',
              link: '/fe/solutions/cors',
            }
          ]
        },
      ],
      '/about/me/': [
        {
          text: '我的个人说明书',
          link: '/about/me/index'
        },
        {
          text: '我的开发环境',
          link: '/about/me/what-i-use'
        },
      ],
      '/guide/': [
        {
          text: '关于计算机',
          items: [
            {
              text: '合格程序员必学的东西',
              link: '/guide/cs/prerequisite',
            },
            {
              text: '引导你思考的 88 个问题',
              link: '/guide/cs/questions',
            },
            {
              text: '关于编程语言',
              link: '/guide/cs/language',
            },
            {
              text: '数据结构和算法练习题单',
              link: '/guide/cs/data_structure_exercises',
            },
            {
              text: '没事儿可以折腾的东西',
              link: '/guide/cs/things-to-explore',
            },
          ],
        },
        {
          text: '认知破局',
          items: [
            {
              text: '从众心理',
              link: '/guide/selftaught',
            },
          ],
        },
        {
          text: '学习方法论',
          items: [
            {
              text: '关于自学',
              link: '/guide/self-taught',
            },
          ],
        },
        {
          text: '关于找工作',
          items: [
            {
              text: '有哪些方向',
              link: '/guide/selftaught',
            },
            {
              text: '如何提前筹划',
              link: '/guide/selftaught',
            },
          ],
        },
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Coiggahou2002/' },
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2019-present Rory Cai',
    },
  },
});
