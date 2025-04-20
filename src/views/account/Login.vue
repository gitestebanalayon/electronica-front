<template>
    <!-- Mostrar CheckService para verificar el servicio -->
    <CheckService v-if="check_service" />
    <!-- Mostrar NotFound500 si el servicio no está disponible -->
    <NotFound500 v-if="not_found_500" />
    <!-- Mostrar Login si el servicio está disponible -->
    <Login v-if="login" />

</template>

<script setup>
import { ref, onBeforeMount, onMounted } from 'vue';
import { useCheckServiceStore } from "@/stores/check_service";

// Componentes
import CheckService from "@/components/account/CheckService.vue";
import NotFound500 from "@/components/account/NotFound500.vue";
import Login from "@/components/account/Login.vue";

// Referencias para el estado del componente
const check_service = ref(true);
const not_found_500 = ref(false);
const login = ref(false);

// Obtener acceso al store
const storeService = useCheckServiceStore();

onBeforeMount(() => {
    sessionStorage.clear();
})

// Chequear el servicio al montar el componente
onMounted(async () => {
    // Llama al servicio del store
    const response = await storeService.check_service();

    // Si hay una respuesta válida, asumimos que el servicio está activo
    if (response) {
        check_service.value = false;
        login.value = true;
    } else {
        check_service.value = false;
        not_found_500.value = true;
    }

});
</script>