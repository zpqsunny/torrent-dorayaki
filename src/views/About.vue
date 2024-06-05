<template>
  <div style="margin-left: 1em;margin-top: 1em;display: flex;flex-direction: column;min-height: 100%">
    <a-card style="width: 100%;">
      <template #title>
        <a-breadcrumb>
          <a-breadcrumb-item>
            <router-link :to="{name: 'home'}">{{ $t('home') }}</router-link>
          </a-breadcrumb-item>
          <a-breadcrumb-item>{{ $t('about') }}</a-breadcrumb-item>
        </a-breadcrumb>
      </template>
      <a-row justify="center">
        <a-col :span="22" style="text-align: center">
          <div v-if="$i18n.locale === 'en_US'">
            <div>
              This project searches info based on DHT network info_hash, get metadata information in the seed, build index information, and use it for query
            </div>
            <div>
              If you like or want to support us, please make a donation. The donation amount is used for the server fee
            </div>
            <div>
              Feedback questions/opinions Email: torrentweb.club@gmail.com
            </div>
            <div>ERC-USDT: 0x72875490e6a8fb085B87e299f22f8DF880C2E0A8</div>
            <div>TRC-USDT: TQLa4Cnpi1C5ofoKyKUZ2hRdrjrTXrNanh</div>
          </div>
          <div v-if="$i18n.locale === 'zh_CN'">
            <div>
              本项目基于DHT网络检索info_hash，获取种子里的metadata信息，构建索引信息，用于查询
            </div>
            <div>
              如果你喜欢或想支持我们，请进行捐赠，捐赠的金额全部用于服务器费用
            </div>
            <div>
              反馈问题/意见 Email: torrentweb.club@gmail.com
            </div>
            <div>ERC-USDT: 0x72875490e6a8fb085B87e299f22f8DF880C2E0A8</div>
            <div>TRC-USDT: TQLa4Cnpi1C5ofoKyKUZ2hRdrjrTXrNanh</div>
          </div>
        </a-col>
      </a-row>
    </a-card>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';

export default defineComponent({
  name: "About",
  data() {
    return {

    }
  },
  methods: {
    aaa() {
      console.log(this.$router)
    }
  }
})
</script>

<style scoped>

</style>
