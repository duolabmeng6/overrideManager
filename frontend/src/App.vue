<template>
  <div style="position: relative; 
  width: 100vw; 
  height: 100vh;
  overflow: hidden;
  ">
    <component is="RenderDesignComponent" v-for="(item, index) in win.list" :key="index" :item="item"/>
  </div>
</template>


<script setup>
import {onMounted} from 'vue'
import {__load_data} from './win/__load_data'

const win = __load_data()
onMounted(() => {
  win.init()

  const script = document.createElement('script')
  script.src = '/cdn.tailwindcss.com_3.3.3.js'
  document.body.appendChild(script)
  script.onload = () => {
    console.log('tailwindcss.com_3.3.3.js Load complete')
    tailwind.config = {
      plugins: [
        function ({addBase}) {
          addBase({
            ".el-button": {
              "background-color": "var(--el-button-bg-color,var(--el-color-white))"
            }
          });
        }
      ]
    }
  }

})


</script>
