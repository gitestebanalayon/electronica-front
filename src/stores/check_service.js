import { defineStore } from 'pinia';

import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const useCheckServiceStore = defineStore('check_service', {
    state: () => ({

    }),
    actions: {
        async check_service() {
            try {
                const simulateDelay = async (ms) => new Promise(resolve => setTimeout(resolve, ms));
                const response = await axios.get(`${BASE_URL}api/v1/service`);
                await simulateDelay(3000);
                if (response.status === 200) {
                    return true;
                } else {
                    return false;
                }
            } catch (error) {
                return false;
            }
        }
    }
});
