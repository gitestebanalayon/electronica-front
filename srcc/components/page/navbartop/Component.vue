<script setup>
import FormSearch from './FormSearch.vue'
import ThemeMode from './ThemeMode.vue'
import DropDown from './DropDown.vue'

import avatar from '@/assets/img/esteban.jpg';
import { RouterLink } from 'vue-router'
import { useAccountStore } from '@/stores/account';
import { useRouter } from 'vue-router';
const router = useRouter();

const storeAccount = useAccountStore();

async function exit() {
    await storeAccount.logout(router)
}

const user = JSON.parse(sessionStorage.getItem("user") || "{}");

</script>

<template>
    <div class="sidebar pt-3 pb-2 rounded-0 d-none d-lg-block">
        <div class="d-flex justify-content-between ps-3 pe-3">
            <div class="d-flex gap-2">
                <!-- Form search -->
                <FormSearch />
            </div>

            <div class="d-flex align-items-center gap-3">
                <ThemeMode />

                <!-- <DropDown icon="ti ti-comment" title="Mensajes" avatar_active="d-block" /> -->
                <DropDown :icon="['fas', 'bell']" title="Notificaciónes" />

                <div class="navbar-nav flex-row">
                    <div class="nav-item dropdown">
                        <a href="#" class="nav-link d-flex lh-1 text-reset p-0" data-bs-toggle="dropdown"
                            aria-label="Open user menu">
                            <span class="avatar avatar-sm rounded-circle"
                                :style="{ backgroundImage: `url(${avatar})` }"></span>
                            <div class="d-none d-xl-block ps-2">
                                <div>{{ user.first_name }} {{ user.last_name }}</div>
                                <div class="mt-1 small text-muted">{{ user.email }}</div>
                            </div>
                        </a>
                        <div class="dropdown-menu dropdown-menu-end dropdown-menu-arrow">


                            <RouterLink to="/profile" class="dropdown-item">Configuración</RouterLink>
                            <div class="dropdown-divider"></div>
                            <button @click="exit" class="dropdown-item">Cerrar sesión</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.sidebar {
    margin-left: 15rem;
}

.dropdown-menu {
    position: absolute;
    top: 10px !important;
    right: -3px !important;
}
</style>