import Vue from 'vue'
import Router from 'vue-router'
import Senior from '@/components/senior'
import SeniorCard from '@/components/seniorCard'
import Junior from '@/components/junior'
import Fetch from '@/components/fetch'
import SeniorList from '@/components/seniorList'
import JuniorList from '@/components/juniorList'
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
      redirect: '/senior'
    },
    {
      path:'/senior',
      name: 'senior',
      component: Senior,
      meta: {
        title: '巴中龙泉外国语学校初升高直升考试报名'
      }
    },
    {
      path:'/seniorCard',
      name: 'seniorCard',
      component: SeniorCard,
      meta: {
        title: '巴中龙泉外国语学校直升考试准考证查看'
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
      path:'/juniorList',
      name: 'juniorList',
      component: JuniorList,
      meta: {
        title: '巴中龙泉外国语学校招生考试成绩查询'
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
