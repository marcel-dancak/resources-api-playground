<template>
  <div class="layout column">

    <h4>data-resource wrapper:</h4>
    <data-resource
      url="/api/x-resource"
      :params="params"
      @update="xResource = $event"
    >
      <template v-slot="{ fetching, data }">
        <div class="my-1">Data resource: fetching: {{ fetching }} data: {{ data }}</div>
      </template>
    </data-resource>

    <h4>Computed property:</h4>
    <div class="my-1">Computed: {{ someResource }}</div>

    <h5>Parameters:</h5>
    <div class="layout params">
      <div class="layout param my-1">
        <label class="mx-2">A:</label>
        <input v-model.number="params.a" type="number"/>
      </div>
      <div class="layout param my-1">
        <label class="mx-2">B:</label>
        <input v-model.number="params.b" type="number"/>
      </div>
    </div>

    <div class="my-2">
      <button @click="invalidate">Invalidate</button>
    </div>
  </div>
</template>

<script>
import { resourceData, invalidateResource, invalidator } from '@/service'
import DataResource from '@/components/DataResource.vue'

export default {
  components: {
    DataResource
  },
  data () {
    return {
      xResource: '',
      params: {
        a: 0,
        b: 10
      }
    }
  },
  computed: {
    someResource () {
      return this.$resource('/api/x-resource', { initial: 'xx', params: this.params })
      // return resourceData.bind(this)('/api/tasks', { initial: '', params: this.params })
    },
    invalidator () {
      return invalidator
    }
  },
  // watch: {
  //   'invalidator.tasks' () {
  //     this.someResource && this.someResource.fetch()
  //   }
  // },
  methods: {
    invalidate () {
      invalidateResource('/api/x-resource')
      // this.someResource.fetch()
    }
  }
}
</script>

<style lang="scss" scoped>
.params {
  align-self: center;
}
input {
  max-width: 100px;
}
</style>
