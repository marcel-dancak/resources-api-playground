<script>
import { invalidator } from '@/service'

export default {
  props: {
    url: String,
    params: Object,
    initial: {},
    transform: Function
  },
  data () {
    return {
      fetching: false,
      data: null
    }
  },
  computed: {
    invalidator () {
      return invalidator
    }
  },
  watch: {
    params: {
      deep: true,
      handler: 'fetch'
    }
  },
  created () {
    if (this.initial !== undefined) {
      this.data = this.initial
      this.$emit('update', this.data)
    }
  },
  mounted () {
    this.fetch()
    // will work for initial url only!
    const unwatch = this.$watch(() => this.invalidator[this.url], this.fetch)
    this.$once('hook:beforeDestroy', unwatch)
  },
  methods: {
    fetch () {
      this.fetching = true
      this.$service.get(this.url, this.params)
        .then(data => {
          this.data = this.transform ? this.transform(data) : data
          this.$emit('update', this.data)
        })
        .catch(err => {
          this.$emit('error', err)
        })
        .finally(() => {
          this.fetching = false
        })
    }
  },
  render (h) {
    return this.$scopedSlots.default(this.$data)
  }
}
</script>
