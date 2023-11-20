import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Rory 的自留地",
  description: "Rory 的自留地，分享新生指南、求职经验、技术体系",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: '大学新生指南', link: '/guide/index' },
      { text: '关于', link: '/about' }
    ],

    sidebar: {
      '/guide/': [
        {
          text: '关于计算机',
          items: [{
              text: '合格程序员必学的东西', link: '/guide/cs/prerequisite',
            },{
              text: '引导你思考的 88 个问题', link: '/guide/cs/questions',
            },{
              text: '关于编程语言', link: '/guide/cs/language',
            },{
              text: '数据结构练习题单', link: '/guide/cs/data_structure_exercises',
            },{
              text: '精品学习资源大全', link: '/guide/cs/data_structure_exercises',
            },{
              text: '没事儿可以折腾的东西', link: '/guide/cs/data_structure_exercises',
            }
          ]
        },
        {
          text: '认知破局',
          items: [
            {
              text: '从众心理', link: '/guide/selftaught',
            },
          ],
        },
        {
          text: '学习方法论',
          items: [
            {
              text: '关于自学', link: '/guide/selftaught',
            },
            {
              text: '关于编程语言', link: '/guide/index',
            },
            {
              text: '哈哈哈', link: '/guide/index',
            },
          ]
        },
        {
          text: '关于找工作',
          items: [
            {
              text: '有哪些方向', link: '/guide/selftaught',
            },
            {
              text: '如何提前筹划', link: '/guide/selftaught',
            }
          ],
        },
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Coiggahou2002/' }
    ],
    
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2019-present Rory Cai',
    }
  }
})
