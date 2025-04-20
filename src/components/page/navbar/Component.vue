<script setup>
    import NavBarLogo from "./NavBarLogo.vue";
    import NavBarToggler from "./NavBarToggler.vue";
    import NavBarResponsive from "./NavBarResponsive.vue";
    import NavBarOptions from "./NavBarOptions.vue";
</script>

<template>
    <aside class="navbar navbar-vertical navbar-expand-lg shadow-none bg-transparent">
        <div class="container-fluid ps-2">
            <NavBarToggler/>
            <NavBarLogo/>
            <NavBarResponsive/>
            <NavBarOptions/>
        </div>
    </aside>
</template>

<style scoped>

.navbar {
  scrollbar-width: none !important;
  scrollbar-color: dark #131b27 !important;
}
</style>