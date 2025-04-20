<template>
    <component class="style" :is="type" :class="class">{{ text }}</component>
</template>

<script setup>
defineProps(['type', 'text', 'class']);
</script>

<style scoped>
.style{
    margin: 0;
}
</style>