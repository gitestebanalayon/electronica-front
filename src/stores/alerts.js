import { defineStore } from 'pinia';

export const useCheckServiceStore = defineStore('alerts', {
    state: () => ({
        alerts: [], // Lista de alertas activas
    }),
    actions: {
        addAlert({ type, title, message, duration = 5000 }) {
            const id = Date.now(); // Generar un ID único para la alerta
            this.alerts.push({ id, type, title, message });

            // Remover la alerta después de la duración especificada
            setTimeout(() => this.removeAlert(id), duration);
        },
        removeAlert(id) {
            this.alerts = this.alerts.filter(alert => alert.id !== id);
        },
        clearAlerts() {
            this.alerts = [];
        },


        // addAlert({ type, title, message, scope = 'global', duration = 5000 }) {
        //     const alert = { type, title, message, scope };
        //     this.alerts.push(alert);

        //     setTimeout(() => this.removeAlert(id), duration);
        // },
        // removeAlert(index) {
        //     this.alerts.splice(index, 1);
        // },
        // clearAlerts() {
        //     this.alerts = [];
        // },
    },
});
