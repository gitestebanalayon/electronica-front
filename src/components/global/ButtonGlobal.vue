<script setup>
import LoadingGlobal from "./LoadingGlobal.vue";

defineProps(['type', 'class', 'label', 'disabled', 'loading']);
</script>

<template>
    <button :type="type" :class="class" :disabled="disabled">
        <LoadingGlobal v-if="loading" />
        <span v-else>{{ label }}</span>
    </button>
</template>
