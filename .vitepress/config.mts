import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Rory 的自留地',
  description: 'Rory 的自留地，分享新生指南、求职经验、技术体系',
  head: [['link', { rel: 'icon', href: '/favicon.ico' }]],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: '大学新生指南', link: '/guide/index' },
      {
        text: '大前端',
        items: [
          {
            text: '基础知识',
            link: '/fe/basics/index',
          },
          {
            text: 'Web',
            link: '/fe/web/js/util',
          },
          {
            text: 'React Native',
            link: '/fe/app/rn/template',
          },
          {
            text: '解决方案积累',
            link: '/fe/solutions/index',
          },
        ]
      },
      {
        text: '服务端',
        link: '/svr/index',
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
          items: [
            {
              text: '一些大牛的博客',
              link: '/resource/index',
            },
            {
              text: '推荐的书籍',
              link: '/resource/books',
            },
          ],
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
      '/fe/web/': [
        {
          text: 'Vue',
          items: [
            {
              text: '响应式原理',
              link: '/fe/web/vue/reactive',
            }
          ],
        },
        {
          text: 'React',
          link: '/fe/web/react',
        },
        {
          text: '浏览器',
          items: [
            { text: '事件循环', link: '/fe/web/browser/event-loop' },
          ]
        },
        {
          text: '排版布局',
          items: [
            { text: 'CSS 实现指定宽高比图片', link: '/fe/web/layout/css-aspect-ratio-img' },
            { text: '如何画一条一像素的线', link: '/fe/web/layout/css-one-pixel-border' },
          ]
        },
        {
          text: 'JavaScript',
          items: [
            { text: '常用工具库', link: '/fe/web/js/util' },
            { text: 'Promise', link: '/fe/web/js/promise' },
            {
              text: '箭头函数和普通函数有什么区别？',
              link: '/fe/web/js/arrow-func-diff'
            }
          ]
        },
        {
          text: 'TypeScript',
          link: '/fe/web/ts',
        },
        {
          text: '埋点上报',
          items: [
            {
              text: '曝光检测',
              link: '/fe/web/track/exposure'
            }
          ]
        },
        {
          text: '兼容性话题',
          link: '/fe/web/compatible'
        },
        {
          text: 'UI / 动效',
          link: '/fe/web/ui'
        },
        {
          text: 'HTTP 协议',
          link: '/fe/web/http'
        },
        {
          text: '移动端',
          link: '/fe/web/mobile'
        },
        {
          text: '安全',
          items: [
            {
              text: '跨域问题',
              link: '/fe/web/safety/cors'
            }
          ]
        },

      ],
      '/fe/app/': [
        {
          text: 'React Native',
          items: [
            {
              text: '基础模板',
              link: '/fe/app/rn/template',
            },
            {
              text: 'UI / 动效',
              link: '/fe/app/rn/animation/index',
              items: [
                {
                  text: '滑动卡片栈实现',
                  link: '/fe/app/rn/animation/card-stack-swiper-impl.md'
                },
                {
                  text: '投影的实现',
                  link: '/fe/app/rn/animation/shadow-impl.md'
                }
              ]
            },
            {
              text: '键盘',
              link: '/fe/app/rn/keyboard',
            },
            {
              text: '设备相关',
              link: '/fe/app/rn/device',
            },
            {
              text: '长列表',
              link: '/fe/app/rn/list',
            },
            {
              text: '颜色',
              link: '/fe/app/rn/color',
            },
            {
              text: '调试',
              link: '/fe/app/rn/debugging',
            },
            {
              text: '原生开发知识',
              link: '/fe/app/rn/native',
            },
            {
              text: '布局',
              link: '/fe/app/rn/layout',
            },
            {
              text: '组件',
              link: '/fe/app/rn/components',
            },
            {
              text: '网络',
            },
            {
              text: '其他',
            }
          ],
        },
        {
          text: 'iOS',
          items: [
            {
              text: 'Objective-C',
              link: '/fe/app/ios/objectivec',
            },
            {
              text: 'Xcode',
              link: '/fe/app/ios/xcode',
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
        {
          text: '编程技巧',
          items: [
            {
              text: '开通一个 Copilot',
              link: '/guide/copilot',
            },
            {
              text: '用好你的 VS Code',
              link: '/guide/vscode',
            },
          ]
        }
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Coiggahou2002/' },
    ],

    footer: {
      message: `<a href="https://beian.miit.gov.cn/">粤ICP备2023142031号</a>`,
      copyright: 'Copyright © 2023-present @rorycai',
    },
  },
});