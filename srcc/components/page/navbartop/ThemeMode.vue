<script setup>

</script>

<template>
    <a href="?theme=dark" class="nav-link hide-theme-dark" title="Modo oscuro" data-bs-toggle="tooltip"
        data-bs-placement="bottom">
        <font-awesome-icon :icon="['fas', 'moon']" class="icon-style me-2" />
        <!-- <i class="icon ti ti-moon text-secondary"></i> -->
    </a>
    <a href="?theme=light" class="nav-link hide-theme-light" title="Modo blanco" data-bs-toggle="tooltip"
        data-bs-placement="bottom">
        <font-awesome-icon :icon="['fas', 'sun']" class="icon-style me-2 text-rss" />
        <!-- <i class="icon ti ti-sun text-secondary"></i> -->
    </a>
</template>