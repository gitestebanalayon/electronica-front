<script setup>
import avatar from '@/assets/img/esteban.jpg';

import { useAccountStore } from '@/stores/account';
import {RouterLink, useRouter } from 'vue-router';
const router = useRouter(); // Obtén el enrutador

const storeAccount = useAccountStore();

async function exit() {
    await storeAccount.logout(router)
}


</script>

<template>
    <div class="navbar-nav flex-row d-lg-none">
        <div class="nav-item dropdown">
            <a href="#" class="nav-link d-flex lh-1 text-reset p-0" data-bs-toggle="dropdown"
                aria-label="Open user menu">
                <span class="avatar avatar-sm" :style="{ backgroundImage: `url(${avatar})` }"></span>
            </a>
            <div class="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                <RouterLink to="/profile" class="dropdown-item">Configuración</RouterLink>
                <div class="dropdown-divider"></div>
                <button @click="exit" class="dropdown-item">Cerrar sesión</button>
            </div>
        </div>
    </div>
</template>

<style scoped></style>