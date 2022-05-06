<template>
    <section class="h-screen">
        <aside class="fixed left-0 bottom-0 top-0 w-[440px]">
            <navigation></navigation>
        </aside>

        <main class="fixed right-0 left-[440px] top-0 bottom-0 p-16 pl-0 overflow-auto bg-gray-50">
            <router-view></router-view>
        </main>
    </section>
</template>

<script>
import Navigation from '../../components/Navigation.vue'

export default {
    components: {
        Navigation,
    },
    setup() {},
}
</script>
