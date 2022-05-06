<template>
    <router-view></router-view>
</template>

<script>
import { onBeforeMount } from 'vue'
import { useUserAccountStore } from './store'
import router from './router'

export default {
    setup() {
        const userStore = useUserAccountStore()

        onBeforeMount(() => {
            userStore.validateToken().then((response) => {
                if (!response) {
                    router.push('/login')
                }
            })
        })
    },
}
</script>
