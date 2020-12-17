import Vue from 'vue'
import Router from 'vue-router'
import Senior from '@/components/senior'
import SeniorMobile from '@/components/seniorMobile'
import SeniorCard from '@/components/seniorCard'
import Junior from '@/components/junior'
import JuniorMobile from '@/components/juniorMobile'
import Fetch from '@/components/fetch'
import SeniorList from '@/components/seniorList'
import SeniorListMobile from '@/components/seniorListMobile'
import JuniorList from '@/components/juniorList'
import JuniorListMobile from '@/components/juniorListMobile'
import Login from '@/components/login'

Vue.use(Router)
// 打包哪个页面就将redirect重定向到哪个页面，PC端后台系统定向到/login
// login上面的除开第一条均为手机端页面，打包后台时需要屏蔽掉
// 打包手机端时候打开mode: 'history‘，打包PC端后台系统时屏蔽掉
export const router = new Router({
  mode: 'history',
  routes: [
    {
      path:'',
      redirect: '/login'
    },
    {
      path:'/senior',
      name: 'senior',
      component: Senior,
      meta: {
        title: '巴中龙泉外国语学校2021初升高模拟考试报名'
      }
    },
    {
      path:'/seniorMobile',
      name: 'seniorMobile',
      component: SeniorMobile,
      meta: {
        title: '巴中龙泉外国语学校2021初升高模拟考试报名'
      }
    },
    {
      path:'/seniorCard',
      name: 'seniorCard',
      component: SeniorCard,
      meta: {
        title: '巴中龙泉外国语学校2021初升高模拟考试准考证'
      }
    },
    {
      path:'/junior',
      name: 'junior',
      component: Junior,
      meta: {
        title: '巴中龙泉外国语学校六年级综合素质测评报名'
      }
    },
    {
      path:'/juniorMobile',
      name: 'juniorMobile',
      component: JuniorMobile,
      meta: {
        title: '巴中龙泉外国语学校六年级综合素质测评报名'
      }
    },
    {
      path:'/fetch',
      name: 'fetch',
      component: Fetch,
      meta: {
        title: '巴中龙泉外国语学校招生考试成绩查询'
      }
    },
    {
      path:'/login',
      name: 'login',
      component: Login,
      meta: {
        title: '巴中龙泉外国语学校招生考试后台管理系统'
      }
    },
    {
      path:'/seniorList',
      name: 'seniorList',
      component: SeniorList,
      meta: {
        title: '巴中龙泉外国语学校招生考试成绩查询'
      }
    },
    {
      path:'/seniorListMobile',
      name: 'seniorListMobile',
      component: SeniorListMobile,
      meta: {
        title: '巴中龙泉外国语学校2021初升高模拟考试报名'
      }
    },
    {
      path:'/juniorList',
      name: 'juniorList',
      component: JuniorList,
      meta: {
        title: '巴中龙泉外国语学校2021年初一报名登记'
      }
    },
    {
          path:'/juniorListMobile',
          name: 'juniorListMobile',
          component: JuniorListMobile,
          meta: {
            title: '巴中龙泉外国语学校2021年初一报名登记'
          }
        },
  ]
})
// 路由前置导航守卫
router.beforeEach((to,from,next)=>{
  // 根据路由元信息设置文档标题
  window.document.title = to.meta.title
  next()
})

export default router
