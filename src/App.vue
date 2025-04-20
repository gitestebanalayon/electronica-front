<script setup>
import { watch } from 'vue';
import { useRouter } from 'vue-router';

import NavBar from './components/page/navbar/Component.vue';
import NavBarTop from './components/page/navbartop/Component.vue';
import 'vue-loading-overlay/dist/css/index.css';

import { useAccountStore } from './stores/account';
const accountStore = useAccountStore();

const theme = localStorage.getItem("tablerTheme");
const router = useRouter();

const verifyTokenIfAuthenticated = async () => {
    if (accountStore.isAuthenticated) {
        const validToken = await accountStore.verifyToken();
        if (!validToken) {
            router.push('/');
        }
    }
};

// Observa los cambios en la ruta activa
watch(
    () => router.currentRoute.value.path, // Observa el `path` de la ruta actual
    () => {
        verifyTokenIfAuthenticated();
    }
);

</script>

<template>
    <main v-if="accountStore.loadingPage"
        :class="`load ${theme === 'light' ? 'load-light' : 'load-dark'} d-flex flex-column vh-100`">
        <div class="page page-center">
            <div class="container container-slim py-4">
                <div class="text-center">

                    <div class="loadingspinner">
                        <div :class="theme === 'dark' ? 'square-dark' : 'square-light'" id="square1"></div>
                        <div :class="theme === 'dark' ? 'square-dark' : 'square-light'" id="square2"></div>
                        <div :class="theme === 'dark' ? 'square-dark' : 'square-light'" id="square3"></div>
                        <div :class="theme === 'dark' ? 'square-dark' : 'square-light'" id="square4"></div>
                        <div :class="theme === 'dark' ? 'square-dark' : 'square-light'" id="square5"></div>
                    </div>

                </div>
            </div>
        </div>
    </main>

    <NavBar v-if="accountStore.isAuthenticated" />
    <NavBarTop v-if="accountStore.isAuthenticated" />
    <RouterView />
</template>

<style scoped></style>