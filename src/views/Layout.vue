<template>
  <a-layout style="min-height: 100vh">
    <a-layout-header>
      <div class="logo"/>
      <a-menu id="left-menu" mode="horizontal" :selectable="false" theme="dark" :style="{ lineHeight: '64px' }">
        <a-menu-item key="search">
          <template #icon>
            <search-outlined />
          </template>
          <router-link to="/">{{ $t('search') }}</router-link>
        </a-menu-item>
        <!--        <a-menu-item key="how_to_use">-->
        <!--          <template #icon>-->
        <!--            <question-outlined/>-->
        <!--          </template>-->
        <!--          <router-link to="/">{{ $t('how_to_use') }}</router-link>-->
        <!--        </a-menu-item>-->
        <a-menu-item key="about">
          <template #icon>
            <mail-outlined/>
          </template>
          <router-link to="/about">{{ $t('about') }}</router-link>
        </a-menu-item>
        <a-menu-item key="language" @click="changeLanguage">
          <template #icon>
            <setting-outlined />
          </template>
          {{ $t('language') }}
        </a-menu-item>
      </a-menu>
    </a-layout-header>
    <a-layout>
      <a-layout-content style="overflow-y: scroll">
        <a-spin :spinning="store.loading" tip="Loading..." size="large">
          <router-view v-slot="{Component}">
            <transition>
              <keep-alive exclude="Information">
                <component :is="Component"></component>
              </keep-alive>
            </transition>
          </router-view>
        </a-spin>
        <a-layout-footer>
          <div style="text-align: center">
            <span>DHT Torrent ©2019 Created by zpq</span>
          </div>
        </a-layout-footer>
      </a-layout-content>
      <a-back-top :visibilityHeight="200" />
    </a-layout>
  </a-layout>
</template>

<script lang="ts">
import {GithubOutlined, AlipayOutlined, QuestionOutlined, SearchOutlined, MailOutlined, SettingOutlined} from '@ant-design/icons-vue';
import {defineComponent, onMounted, ref} from "vue";
import {useCounterStore} from '../stores/counter.js'
import LanguageIcon from "../components/icon/LanguageIcon.vue";
import SearchIcon from "../components/icon/SearchIcon.vue";
const store = useCounterStore()


export default defineComponent({
  name: 'Layout',
  components: {
    GithubOutlined,
    AlipayOutlined,
    QuestionOutlined,
    SearchOutlined,
    MailOutlined,
    SettingOutlined,
    LanguageIcon,
    SearchIcon,
  },
  mounted() {
    let i18n = localStorage.getItem('i18n')
    if (i18n != null) {
      this.$i18n.locale = i18n
      document.documentElement.lang = i18n.slice(0,2)
    }
  },
  setup() {
    const store = useCounterStore()
    const current = ref<string[]>(['mail']);
    return {
      selectedKeys: ref<string[]>(['2']),
      store,
      current
    }
  },
  methods: {
    changeLanguage() {
      if (this.$i18n.locale === 'en_US') {
        this.$i18n.locale = 'zh_CN'
        document.documentElement.lang = 'zh'
      } else {
        this.$i18n.locale = 'en_US'
        document.documentElement.lang = 'en'
      }
      localStorage.setItem('i18n', this.$i18n.locale)
    }
  }
})
</script>

<style scoped>
.logo {
  float: left;
  width: 32px;
  height: 32px;
  margin: 16px 24px;
  background-image: url("../assets/torrent32.png");
  background-repeat: no-repeat;
}
</style>
