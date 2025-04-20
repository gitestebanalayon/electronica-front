<template>

    <main :class="`load ${theme === 'light' ? 'load-light' : 'load-dark'} d-flex flex-column vh-100`">
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

</template>

<script setup>

const theme = localStorage.getItem("tablerTheme");

</script>