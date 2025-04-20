<script setup>
import { computed } from 'vue';

import svg from '../../assets/svg/icons-svg.json';
import { useAccountStore } from '@/stores/account';

// Define las props
const props = defineProps(['scope']);

const alertStore = useAccountStore();

// Filtrar alertas por el `scope` actual
const scopedAlerts = computed(() => {
    return alertStore.alerts.filter(alert => alert.scope === props.scope);
});

// function removeAlert(index) {
//     alertStore.removeAlert(index);
// }
</script>

<template>
    <div>

        <div v-for="(alert, index) in scopedAlerts" :key="index" :class="`alert alert-${alert.type}`" role="alert">
            <div class="d-flex">
                <div>
                    <div v-if="alert.type === 'success'" v-html="svg.success"></div>
                    <div v-if="alert.type === 'info'" v-html="svg.info"></div>
                    <div v-if="alert.type === 'warning'" v-html="svg.warning"></div>
                    <div v-if="alert.type === 'danger'" v-html="svg.danger"></div>
                </div>
                <div>
                    <h4 class="alert-title">{{ alert.title }}</h4>
                    <div class="text-secondary">{{ alert.message }}</div>
                </div>
            </div>
            <!-- <button type="button" class="btn-close" aria-label="Close" @click="removeAlert(index)"></button> -->
        </div>
    </div>
</template>
