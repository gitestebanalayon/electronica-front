<script setup>
const denomination = import.meta.env.VITE_APP_TITLE;
</script>

<template>
    <h1 class="navbar-brand navbar-brand-autodark pt-lg-3 pb-lg-3">
        <a href="#" class="d-flex align-items-center gap-2 text-decoration-none">
            <img class="avatar avatar-sm rounded-circle" style="box-shadow: none; background: transparent;"
                src="../../../assets/img/logo.png" alt="">
            <span class="">{{ denomination }}</span>
        </a>
    </h1>
</template>

<style scoped></style>