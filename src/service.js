
import Vue from 'vue'

const service = {
  get (url, params) {
    if (params) {
      const qs = Object.entries(params).map(([name, value]) => `${name}=${encodeURIComponent(value)}`).join('&')
      url = url + '?' + qs
    }

    return new Promise(resolve => {
      setTimeout(() => resolve({ url, time: new Date().toLocaleTimeString() }), 1000)
    })
  }
}

const store = {}
/**
 * Return data resource wrapper for given url. Must be bound to component instance.
 * @param {String} url Resource url path
 * @param {Object} params URL query parameters
 * @param {any} initial Initial data value
 * @param {Function} transform Data transformation function
 * @param {Function} onError Error callback function
 * @return {PendingData} Resource data wrapper.
 */
export function resourceData (url, { params, initial, transform, onError } = {}) {
  const key = `${this._uid}:${url}`
  let obj = store[key]
  if (!obj) {
    obj = Vue.observable({
      fetching: true,
      data: initial,
      error: null,
    })
    obj.fetch = () => {
      obj.fetching = true
      service.get(url, params)
        .then(data => {
          obj.data = data
          obj.error = false
        })
        .catch(err => {
          obj.error = true
          if (onError) {
            onError(err)
          }
        })
        .finally(() => {
          obj.fetching = false
        })
    }
    store[key] = obj
    this.$once('hook:beforeDestroy', () => {
      delete store[key]
    })
  }
  obj.fetch()
  return obj
}

export const invalidator = Vue.observable({
  '/api/x-resource': 1,
  '/api/y-resource': 1
})

export function invalidateResource (url) {
  invalidator[url]++
  // update actual resources created with 'resourceData' function
  const keys = Object.keys(store).filter(key => key.split(':')[1] === url)
  keys.forEach(key => store[key].fetch())
}

export default service
