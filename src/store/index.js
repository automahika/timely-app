import { defineStore } from 'pinia'
import { useUserAccountStore } from './modules/user'

const useMainStore = defineStore({
    id: 'mainStore',
})

export { useMainStore, useUserAccountStore }
