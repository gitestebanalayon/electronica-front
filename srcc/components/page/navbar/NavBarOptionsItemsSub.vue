<script setup>
import { RouterLink } from 'vue-router'
defineProps(['name', 'icon', 'badge', 'active'])
</script>

<template>
    <li>
        <RouterLink :to="active" class="active nav-link dropdown-toggle text-secondary bg-gray-700"
            data-bs-toggle="collapse" aria-expanded="false">
            <!-- <i :class="icon" class="me-2"></i> -->
            <font-awesome-icon :icon="icon" class="ico icon-style me-2" />
            <span class="nav-link-title"> {{ name }} </span>
            <span v-if="badge == 'active'" class="new bg-green text-white">NEW</span>
        </RouterLink>
    </li>
</template>

<style scoped>
.ico {
    width: 1.0625em;
    text-align: center;
}

.new {
    font-size: 12px;
    font-weight: 600;
    position: absolute;
    right: 53px;
    padding: 0 5px 0 5px;
    border-radius: 2px;
}

.nav-link-title {
    font-weight: 600;
}

.active[aria-expanded="true"] {
    background: #313c52 !important;
    color: #ffffff !important;
    transition: .3s ease all !important;
}

.dropdown-toggle::after {
    transform: rotate(-135deg);
    transition: 300ms;
    font-size: 18px;
}

.active[aria-expanded="true"].dropdown-toggle::after {
    transform: rotate(-45deg);
}
</style>