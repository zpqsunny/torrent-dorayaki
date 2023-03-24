<template>
  <div style="margin: 1em 1em 0 1em;display: flex;flex-direction: column;min-height: 100%">
    <a-card style="width: 100%;">
      <template #title>
        <a-breadcrumb>
          <a-breadcrumb-item>
            <router-link :to="{name: 'home'}">{{ $t('home') }}</router-link>
          </a-breadcrumb-item>
          <a-breadcrumb-item>{{ $t('information') }}</a-breadcrumb-item>
        </a-breadcrumb>
      </template>
      <a-row justify="center">
        <a-col :xs="24" :sm="24" :md="24" :lg="23" :xl="23">
          <a-descriptions :title="name" bordered>
            <a-descriptions-item>
              <template #label>
                <strong >{{ $t('hash') }}</strong>
              </template>
              {{ hash }}
            </a-descriptions-item>
            <a-descriptions-item>
              <template #label>
                <strong>{{ $t('size') }}</strong>
              </template>
              {{ utils.renderSize(size) }}
            </a-descriptions-item>
            <a-descriptions-item>
              <template #label>
                <strong>{{ $t('file_number') }}</strong>
              </template>
              {{ fileNumber }}
            </a-descriptions-item>
            <a-descriptions-item>
              <template #label>
                <strong>{{ $t('magnet') }}</strong>
              </template>
              magnet:?xt=urn:btih:{{ hash }}
            </a-descriptions-item>
            <a-descriptions-item>
              <template #label>
                <strong>{{ $t('created_date_time') }}</strong>
              </template>
              {{ createdDateTime }}
            </a-descriptions-item>
          </a-descriptions>
          <a-divider dashed />
          <a-directory-tree :tree-data="treeify(files)">
            <template #title="{ title, key, type, length }">
              <span style="word-break: break-all;word-wrap: break-word">{{ title }}</span><span v-if="type === 'file'" style="float: right"><i>{{ utils.renderSize(length) }}</i></span>
            </template>
          </a-directory-tree>
        </a-col>
      </a-row>
    </a-card>
  </div>
</template>

<script lang="ts">

import { defineComponent, ref } from "vue";
import SearchIcon from "../components/icon/SearchIcon.vue";
import { useRouter, useRoute } from 'vue-router';
import axios from "../axios";
import utils from '../utils';


interface File {
  length: number;
  path: [string];
}

export default defineComponent({
  name: 'Information',
  components: {SearchIcon},
  mounted() {
    const route = useRoute()
    this.torrentInformation(route.params.id)
  },
  setup() {
    const router = useRouter()
    const route = useRoute()
    const id = ref(route.query.id)
    const hash = ref<string>('')
    const name = ref<string>('')
    const files = ref<[File]>([])
    const size = ref<number>(0)
    const fileNumber = ref<number>(0)
    const createdDateTime = ref<string>('')
    const treeFiles = ref<[File]>([])
    return {
      utils,
      // router,
      // route,
      id,
      hash,
      name,
      files,
      size,
      fileNumber,
      createdDateTime,
      treeFiles,
    }
  },
  methods: {
    torrentInformation(id) {
      axios.get('/information/' + id)
          .then(r => {
            if (r.data.code === 200) {
              this.hash = r.data.data.hash
              this.name = r.data.data.name
              if (r.data.data.files != undefined) {
                this.files = r.data.data.files
              } else {
                this.files = [{
                  length: r.data.data.size,
                  path: [r.data.data.name]
                }]
              }
              this.size = r.data.data.size
              this.fileNumber = r.data.data.fileNumber
              this.createdDateTime = r.data.data.createdDateTime
            }
          })
    },
    treeify(paths) {
      let result = []
      const level = {result}
      let id = 0
      paths.forEach(path => {
        path.path.reduce((r, name) => {
          if (!r[name]) {
            r[name] = {result: []}
            r.result.push({
              key: ++id,
              title: name,
              type: 'file',
              length: path.length,
              children: r[name].result,
            })
          }
          return r[name]
        }, level)
      })
      result = result.map(el => this.parseFolder(el))
      return result
    },
    parseFolder(el) {
      if (el.children.length !== 0) {
        const folder = {
          key: el.id,
          title: el.title,
          type: 'directory',
          children: el.children
        }
        folder.children = folder.children.map(el => this.parseFolder(el))
        return folder
      }
      return el
    }
  }
})

</script>
