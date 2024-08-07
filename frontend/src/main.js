import {createApp} from 'vue'
import {createPinia} from 'pinia'
// import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// import TDesign from 'tdesign-vue-next'
import 'tdesign-vue-next/es/style/index.css'

import App from './App.vue'
import Helper from "./Helper.js"


import RenderDesignComponentPreview from "./components/RenderDesignComponentPreview.vue"

const app = createApp(App)

app.component('RenderDesignComponent', RenderDesignComponentPreview)


const BoxComponentNames_el = Helper.registerBoxComponentNames(app, 'el', import.meta.glob('./components/boxs/el/**/*.vue', {eager: true}))
const BoxComponentNames_td = Helper.registerBoxComponentNames(app, 'td', import.meta.glob('./components/boxs/td/**/*.vue', {eager: true}))



app.use(createPinia())
// app.use(TDesign)
// app.use(ElementPlus)
app.config.warnHandler = function (msg, vm, trace) {
    // 自定义处理警告的逻辑，或者什么都不做以屏蔽
};
app.mount('#app')

