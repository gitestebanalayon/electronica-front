<script setup>
import FooterPage from '@/components/page/footer/Component.vue';
import HeaderPage from '@/components/page/header/Component.vue';

</script>

<template>
    <main class="page-wrapper">
        <!-- Page header -->
        <HeaderPage :icon="['fas', 'crown']" text="Clientes" />

        <div class="page-body mt-3 mb-3">
            <div class="ps-3 pe-3">

            </div>
        </div>

        <!-- Page footer -->
        <FooterPage />
    </main>

</template>
