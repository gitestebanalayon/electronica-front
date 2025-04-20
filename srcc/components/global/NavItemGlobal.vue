<script setup>
defineProps({
    href: {
        required: true,
        default: '#',
    },
    text: {
        required: true,
    },
    active: {
        default: false,
    },
    role: {
        default: 'tab',
    },
    ariaSelected: {
        default: false,
    },
});
</script>

<template>
    <li class="nav-item" role="presentation">
        <a :href="href" class="list-group-item list-group-item-action" :class="{ active }" data-bs-toggle="tab"
            :aria-selected="ariaSelected" :role="role">
            {{ text }}
        </a>
    </li>
</template>

<style scoped>
/* Puedes agregar estilos personalizados si es necesario */
</style>
