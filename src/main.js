// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import './assets/css/reset.css'
import 'element-ui/lib/theme-chalk/index.css'
// import VConsole from  'vconsole/dist/vconsole.min'
// new VConsole()
import { Main, Container, Aside, Header, Row, Col, Button, Form, FormItem, Input, Menu, Submenu, MenuItem, MenuItemGroup, Table, TableColumn, Tabs, TabPane, Pagination, Icon, MessageBox, Select, Option, DatePicker, Dialog, Alert, CheckboxGroup, Checkbox, Radio, RadioGroup, RadioButton, Popover, Tree, Badge, TimePicker, TimeSelect, Loading, Upload, Switch } from 'element-ui'

Vue.use(Main)
Vue.use(Container)
Vue.use(Aside)
Vue.use(Header)
Vue.use(Row)
Vue.use(Col)
Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Radio)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(RadioGroup)
Vue.use(Pagination)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Dialog)
Vue.use(Popover)
Vue.use(Tree)
Vue.use(MenuItemGroup)
Vue.use(Icon)
Vue.use(Select)
Vue.use(Option)
Vue.use(DatePicker)
Vue.use(Alert)
Vue.use(CheckboxGroup)
Vue.use(Checkbox)
Vue.use(RadioButton)
Vue.use(Tabs)
Vue.use(Badge)
Vue.use(TabPane)
Vue.use(TimePicker)
Vue.use(TimeSelect)
Vue.use(Upload)
Vue.use(Switch)

Vue.config.productionTip = false
Vue.use(VueAxios, axios)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
})
