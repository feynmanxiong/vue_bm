import Vue from 'vue';
/**
 * Observe API
 */
export const store = Vue.observable({count: 0});
export const mutations = {
    setCount(count){
        store.count = count;
    }
}