<template>
  <a-config-provider :locale="$i18n.locale === 'zh_CN'? zhCN: enUS">
    <router-view/>
  </a-config-provider>
</template>

<script lang="ts">
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import enUS from 'ant-design-vue/es/locale/en_US';
import 'dayjs/locale/zh-cn';
import 'dayjs/locale/en';
import {defineComponent} from "vue";
export default defineComponent({
  name: 'App',
  setup() {
    return {
      zhCN,
      enUS
    }
  },
})
</script>

<style scoped>

</style>
