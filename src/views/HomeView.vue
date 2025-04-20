<script setup>
import HeaderPage from '@/components/page/header/Component.vue'
import FooterPage from '@/components/page/footer/Component.vue'

import svg from '../assets/svg/icons-svg.json';

</script>

<template>

    <main class="page-wrapper">
        <!-- Page header -->
        <HeaderPage :icon="['fas', 'home']" text="Inicio" />

        <!-- Page body -->
        <div class="page-body mt-3 mb-3">
            <div class="ps-3 pe-3">
                <div class="row row-deck row-cards">
                    <div class="col-12">
                        <div class="row row-cards">
                            <div class="col-sm-6 col-lg-3">
                                <div class="card card-sm">
                                    <div class="card-body">
                                        <div class="row align-items-center">
                                            <div class="col-auto">
                                                <span class="bg-primary text-white avatar">
                                                    <div v-html="svg.client"></div>
                                                </span>
                                            </div>
                                            <div class="col">
                                                <div class="font-weight-medium">
                                                    Clientes
                                                </div>
                                                <div class="text-muted">
                                                    5 Nuevos clientes
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-6 col-lg-3">
                                <div class="card card-sm">
                                    <div class="card-body">
                                        <div class="row align-items-center">
                                            <div class="col-auto">
                                                <span class="bg-green text-white avatar">
                                                    <div v-html="svg.appliances"></div>
                                                </span>
                                            </div>
                                            <div class="col">
                                                <div class="font-weight-medium">
                                                    Aparatos
                                                </div>
                                                <div class="text-muted">
                                                    5 Nuevos aparatos
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-6 col-lg-3">
                                <div class="card card-sm">
                                    <div class="card-body">
                                        <div class="row align-items-center">
                                            <div class="col-auto">
                                                <span
                                                    class="bg-twitter text-white avatar"><!-- Download SVG icon from http://tabler-icons.io/i/brand-twitter -->
                                                    <div v-html="svg.customers"></div>
                                                </span>
                                            </div>
                                            <div class="col">
                                                <div class="font-weight-medium">
                                                    Empleados
                                                </div>
                                                <div class="text-muted">
                                                    0 Nuevos empleados
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-6 col-lg-3">
                                <div class="card card-sm">
                                    <div class="card-body">
                                        <div class="row align-items-center">
                                            <div class="col-auto">
                                                <span
                                                    class="bg-facebook text-white avatar"><!-- Download SVG icon from http://tabler-icons.io/i/brand-facebook -->
                                                    <div v-html="svg.repaired"></div>
                                                </span>
                                            </div>
                                            <div class="col">
                                                <div class="font-weight-medium">
                                                    Reparados
                                                </div>
                                                <div class="text-muted">
                                                    En espera
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Page footer -->
        <FooterPage />
    </main>

</template>

<style scoped></style>