<template>
    <div class="flex flex-col h-full bg-gray-50">
        <div class="items-center mb-12 flex px-20 pt-20">
            <div class="w-[50px] h-[50px] rounded-lg bg-gray-900 mr-4 font-black flex items-center text-center text-xl">
                <span class="w-full text-white">T</span>
            </div>
            <div>
                <h2 class="font-bold text-lg">{{ user.name }}</h2>
                <h5 class="text-sm text-gray-500">{{ user.email }}</h5>
            </div>
        </div>
        <div class="flex flex-col h-full pr-20 pb-20">
            <ul class="flex-1">
                <li>
                    <router-link to="/" class="font-medium flex items-center text-base py-2 pl-20 mb-5">
                        <span class="mr-4"><Layout :size="18" /></span>
                        <span>Dashboard</span>
                    </router-link>
                </li>
            </ul>
            <ul>
                <li>
                    <router-link to="/logout" class="font-medium flex items-center text-base py-2 pl-20">
                        <span class="mr-4"><LogOut :size="18" /></span>
                        <span>Sign Out</span>
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { useUserAccountStore } from '../store'
import { ref } from 'vue'
import { Layout, Settings, PieChart, User, LogOut, Shield } from 'lucide-vue-next'

export default {
    components: {
        Layout,
        Settings,
        PieChart,
        User,
        LogOut,
        Shield,
    },
    setup() {
        const userStore = useUserAccountStore()
        const user = ref(userStore.getUser)

        return { user }
    },
}
</script>

<style>
a.router-link-active {
    position: relative;
}
a.router-link-active::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 8px;
    background: black;
    border-top-right-radius: 99px;
    border-bottom-right-radius: 99px;
}
</style>
