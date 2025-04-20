<script setup>
import { RouterLink } from 'vue-router'
defineProps(['name', 'icon', 'routs', 'badge'])
</script>

<template>
    <li>
        <RouterLink class="nav-link text-secondary position-relative" :to="routs">
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
    right: 15px;
    padding: 0 5px 0 5px;
    border-radius: 2px;
}

.router-link-active {
    color: rgb(255, 255, 255) !important;
    background-color: rgb(24, 119, 242) !important;
}

.nav-link-title {
    font-weight: 600;
}
</style>