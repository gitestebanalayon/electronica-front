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
    wait: {
        default: false,
    },
});
</script>

<template>
    <li class="nav-item" :class="{ wait }" role="presentation">
        <a :href="href" class="list-group-item list-group-item-action " :class="{ active, wait }" data-bs-toggle="tab"
            :aria-selected="ariaSelected" :role="role">
            {{ text }}
        </a>
    </li>
</template>

<style scoped>

.wait {
    pointer-events: none !important;
    cursor: wait !important;
}
</style>
