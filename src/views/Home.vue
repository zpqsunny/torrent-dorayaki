<template>
  <div style="margin: 1em 1em 0 1em;display: flex;flex-direction: column;min-height: 100%">
    <a-card style="width: 100%;">
      <template #title>
        <a-breadcrumb>
          <a-breadcrumb-item>{{ $t('home') }}</a-breadcrumb-item>
        </a-breadcrumb>
      </template>
      <a-row justify="center">
        <a-col :xs="24" :sm="20" :md="16" :lg="12" :xl="10">
          <a-input-search
              v-model:value="query.keyWords"
              placeholder=""
              :enter-button="$t('search')"
              size="large"
              @search="onSearch(1,20)"
          />
        </a-col>
      </a-row>
      <a-row justify="center" style="margin-top: 20px">
        <a-col :xs="24" :sm="20" :md="16" :lg="12" :xl="10">
          <a-radio-group v-model:value="sortType" @change="sortChange" button-style="solid">
            <a-radio-button value="highlight">{{ $t('highlight_sort') }}</a-radio-button>
            <a-radio-button value="size">{{ $t('size_sort') }}</a-radio-button>
            <a-radio-button value="fileNumber">{{ $t('file_number_sort') }}</a-radio-button>
            <a-radio-button value="createdDateTime">{{ $t('created_date_time_sort') }}</a-radio-button>
          </a-radio-group>
        </a-col>
      </a-row>
      <a-divider dashed></a-divider>
      <a-row justify="center">
        <a-col :xs="24" :sm="24" :md="24" :lg="23" :xl="23">
          <a-table :columns="columns" :data-source="searchResult" :scroll="{ x: 1200 }"
                   :pagination="{hideOnSinglePage: true, current: query.page, pageSize: query.pageSize, total: total, pageSizeOptions:['20'] ,onChange: onSearch}"
          >
            <template #bodyCell="{ column, record }">
              <template v-if="column.key === 'highlight'">
                <router-link :to="{name: 'info', params: {id: record.id}}" :title="record.name" v-html="record.highlight"></router-link>
              </template>
              <template v-if="column.key === 'size'">
                {{ utils.renderSize(record.size) }}
              </template>
              <template v-if="column.key === 'fileNumber'">
                {{ record.fileNumber }}
              </template>
              <template v-if="column.key === 'createdDateTime'">
                {{ record.createdDateTime }}
              </template>
            </template>
          </a-table>
        </a-col>
      </a-row>
    </a-card>
  </div>
</template>

<script>

import {defineComponent} from 'vue'
import SearchIcon from '../components/icon/SearchIcon.vue'
import axios from '../axios.js'
import utils from '../utils.js'

export default defineComponent({
  name: 'Home',
  components: {
    SearchIcon
  },
  data() {
    return {
      query: {
        keyWords: '',
        page: 1,
        pageSize: 20,
        sort: 'desc',
        orderColumn: '_score',
      },
      sortType: 'highlight',
      total: 0,
      columns: [
        {
          key: 'highlight',
          dataIndex: 'highlight',
          title: () => this.$t('name'),
        },
        {
          key: 'size',
          dataIndex: 'size',
          title: () => this.$t('size'),
          minWidth: 100
        },
        {
          key: 'fileNumber',
          dataIndex: 'fileNumber',
          title: () => this.$t('file_number'),
          minWidth: 100
        },
        {
          key: 'createdDateTime',
          dataIndex: 'createdDateTime',
          title: () => this.$t('created_date_time'),
          minWidth: 120
        }
      ],
      searchResult: [],
      utils,
    }
  },
  methods: {
    async onSearch(page, pageSize) {
      this.query.page = page
      this.query.pageSize = pageSize
      if (this.query.keyWords.trim() === '') {
        return
      }
      const r = await axios.post('/search', this.query)
      if (r.data.code !== 200) {
        return
      }
      this.query.page = r.data.data.page
      this.total = r.data.data.total
      this.searchResult = r.data.data.content
    },
    sortChange(e) {
      if ('highlight' === this.sortType) {
        this.query.orderColumn = '_score'
        this.query.sort = 'desc'
      }
      if ('size' === this.sortType) {
        this.query.orderColumn = 'size'
        this.query.sort = 'desc'
      }
      if ('fileNumber' === this.sortType) {
        this.query.orderColumn = 'fileNumber'
        this.query.sort = 'desc'
      }
      if ('createdDateTime' === this.sortType) {
        this.query.orderColumn = 'createdDateTime'
        this.query.sort = 'desc'
      }
    }
  }
})

</script>
