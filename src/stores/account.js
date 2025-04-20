import axios from "axios";
import { defineStore } from 'pinia';
import jwt_decode from 'jwt-decode';
import { ref } from "vue";
import Swal from "sweetalert2";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const user = ref(JSON.parse(sessionStorage.getItem("user") || "{}"));

export const useAccountStore = defineStore('account', {
    state: () => ({
        isAuthenticated: !!user.value.token, // Indica si el usuario está autenticado
        loadingPage: false,

        alerts: [], // Lista de alertas activas
        apiName: null, // Nombre de la API que se está llamando

        cooldownTime: 60,
        intervalId: null,
        isButtonDisabled: false,

        profile: {} // Perfil del usuario que filtra la API de la función filterProfile
    }),
    actions: {
        // Funciones para manejar las alertas
        async addAlert({ type, title, message, scope = 'global', duration = 5000 }) {
            const id = Date.now();
            this.alerts.push({ id, type, title, message, scope });

            // Elimina la alerta después del tiempo especificado
            setTimeout(() => this.removeAlert(id), duration);
        },
        async removeAlert(id) {
            this.alerts = this.alerts.filter(alert => alert.id !== id);
        },
        async clearAlerts() {
            this.alerts = [];
        },

        // Función para manejar el temporizador del enviar código
        async startCooldown() {
            this.cooldownTime = 60; // Reinicia el temporizador
            this.intervalId = setInterval(() => {
                if (this.cooldownTime > 0) {
                    this.cooldownTime--;
                } else {
                    clearInterval(this.intervalId);
                    this.isButtonDisabled = false; // Reactiva el botón
                }
            }, 1000);
        },

        // Funciones para manejar la gestión de la cuenta
        async login(email, password) {
            try {
                this.apiName = 'login';
                this.clearAlerts(); // Limpia cualquier alerta existente

                // const simulateDelay = async (ms) => new Promise(resolve => setTimeout(resolve, ms));
                const response = await axios.post(`${BASE_URL}api/v1/auth/login`, { 'email': email, 'password': password });
                // await simulateDelay(2000);

                if (response.data.statusCode === 200) {
                    const token = response.data.data.token;
                    const decodedToken = jwt_decode(token);
                    // Guardamos los datos en sessionStorage
                    const userData = {
                        token,
                        id: decodedToken.id,
                        email: decodedToken.email,
                        first_name: decodedToken.first_name,
                        last_name: decodedToken.last_name,
                    };
                    sessionStorage.setItem("user", JSON.stringify(userData));

                    const simulateDelay = async (ms) => new Promise(resolve => setTimeout(resolve, ms));
                    this.loadingPage = true;
                    await simulateDelay(5000);

                    this.isAuthenticated = true;
                    return response.data;
                }
                return false;
            } catch (error) {
                this.loadingPage = false;
                this.apiName = null;
                switch (error?.response?.data?.statusCode) {
                    case 401:
                        this.addAlert({
                            type: 'danger',
                            title: '¡Credenciales inválidas!',
                            message: error.response.data.message,
                            scope: 'login',
                        });
                        break;
                    default:
                        this.addAlert({
                            type: 'danger',
                            title: '¡Servicio no disponible!',
                            message: 'Por favor recarga la página para verificar el servicio',
                            scope: 'login',
                        });
                        break;
                }
                return false
            } finally {
                this.loadingPage = false;
                this.apiName = null;
            }
        },
        async verifyToken() {
            try {
                const user = JSON.parse(sessionStorage.getItem("user") || "{}");

                // const simulateDelay = async (ms) => new Promise(resolve => setTimeout(resolve, ms));
                const response = await axios.get(`${BASE_URL}api/v1/auth/account/validate-token`, {
                    headers: { Authorization: `Bearer ${user.token}` },
                });
                // await simulateDelay(10000);

                if (response.data.statusCode === 200) {
                    this.isAuthenticated = true;
                    return true;
                }

                sessionStorage.clear();
                this.isAuthenticated = false;
                return false;
            } catch (error) {


                if (error?.response?.data?.statusCode === 401) {
                    sessionStorage.clear();
                    this.isAuthenticated = false;
                    return false;
                }

                sessionStorage.clear();
                this.isAuthenticated = false;
                return false;
            }
        },
        async logout(router) {
            sessionStorage.clear();
            this.isAuthenticated = false;
            router.push('/')
        },
        async verifyAccount(email, ci, birthdate) {
            try {
                this.apiName = 'verifyAccount';
                this.clearAlerts(); // Limpia cualquier alerta existente

                const simulateDelay = async (ms) => new Promise(resolve => setTimeout(resolve, ms));
                const response = await axios.get(`${BASE_URL}api/v1/auth/filter?email=${email}&ci=${Number(ci)}&birthdate=${birthdate}`);
                await simulateDelay(2000);

                if (response.data.statusCode === 200) {
                    this.addAlert({
                        type: 'success',
                        title: '¡Cuenta verificada!',
                        message: response?.data?.message,
                        scope: 'verifyAccount',
                    });

                    return true;
                }

                return false;
            } catch (error) {
                this.apiName = null;

                switch (error?.response?.data?.statusCode) {
                    case 403:
                        this.addAlert({
                            type: 'warning',
                            title: '¡Cuenta bloqueada!',
                            message: error.response?.data?.message,
                            scope: 'verifyAccount',
                        });
                        break;
                    case 404:
                        this.addAlert({
                            type: 'danger',
                            title: '¡Cuenta no encontrada!',
                            message: error.response?.data?.message,
                            scope: 'verifyAccount',
                        });
                        break;

                    default:
                        break;
                }

                return false;
            } finally {
                this.apiName = null;
            }

        },
        async sendCode(email, ci, birthdate) {
            try {
                this.apiName = 'sendCode';
                this.clearAlerts(); // Limpia cualquier alerta existente

                // Desactiva el botón y comienza el temporizador
                this.isButtonDisabled = true;

                const simulateDelay = async (ms) => new Promise(resolve => setTimeout(resolve, ms));
                const response = await axios.put(`${BASE_URL}api/v1/auth/account/code`, { email, ci, birthdate });
                await simulateDelay(2000);

                if (response.data.statusCode === 200) {
                    this.startCooldown(); // Inicia el temporizador para reactivar el botón
                    this.addAlert({
                        type: 'success',
                        title: '¡Código enviado!',
                        message: response?.data?.message,
                        scope: 'sendCode',
                    });
                    return true
                }

                this.isButtonDisabled = false; // Reactiva el botón en caso de error
                return false;
            } catch (error) {
                this.apiName = null;
                this.isButtonDisabled = false; // Reactiva el botón en caso de error

                switch (error.response?.data?.statusCode) {
                    default:
                        this.addAlert({
                            type: 'danger',
                            title: '¡Servicio no disponible!',
                            message: 'Por favor recarga la página para verificar el servicio',
                            scope: 'sendCode',
                        });
                        break;
                }

                return false;
            } finally {
                this.apiName = null;
            }
        },
        async restorePassword(email, ci, birthdate, recovery_code) {
            try {
                this.apiName = 'restorePassword';
                this.clearAlerts(); // Limpia cualquier alerta existente

                const simulateDelay = async (ms) => new Promise(resolve => setTimeout(resolve, ms));
                const response = await axios.put(`${BASE_URL}api/v1/auth/account/restore-password`, { email, ci, birthdate, recovery_code });
                await simulateDelay(2000);

                if (response.data.statusCode === 200) {
                    this.addAlert({
                        type: 'success',
                        title: '¡Contraseña restaurada!',
                        message: response?.data?.message,
                        scope: 'restorePassword',
                    });
                    return true;
                }

                return false;
            } catch (error) {
                this.apiName = null;

                // console.log(error.response?.data?.statusCode);
                // console.log(error.response?.data?.message);


                switch (error.response?.data?.statusCode) {
                    case 422:
                        this.addAlert({
                            type: 'danger',
                            title: '¡Ups!',
                            message: error.response?.data?.message,
                            scope: 'restorePassword',
                        });
                        break;

                    default:
                        this.addAlert({
                            type: 'danger',
                            title: '¡Servicio no disponible!',
                            message: 'Por favor recarga la página para verificar el servicio',
                            scope: 'restorePassword',
                        });
                        break;
                }

                return false;
            } finally {
                this.apiName = null;
            }
        },
        async unlockAccount(email, ci, birthdate) {
            try {
                this.apiName = 'unlockAccount';
                this.clearAlerts(); // Limpia cualquier alerta existente


                const simulateDelay = async (ms) => new Promise(resolve => setTimeout(resolve, ms));
                const response = await axios.put(`${BASE_URL}api/v1/auth/account/unlock`, { email, ci, birthdate });
                await simulateDelay(2000);

                if (response.data.statusCode === 200) {
                    this.addAlert({
                        type: 'success',
                        title: '¡Cuenta desbloqueada!',
                        message: response?.data?.message,
                        scope: 'unlockAccount',
                    });
                }
            } catch (error) {
                this.apiName = null;

                switch (error.response?.data?.statusCode) {
                    case 404:
                        this.addAlert({
                            type: 'danger',
                            title: '¡Cuenta no encontrada!',
                            message: error.response?.data?.message,
                            scope: 'unlockAccount',
                        });
                        break;
                    case 409:
                        this.addAlert({
                            type: 'warning',
                            title: '¡Cuenta no desbloqueada!',
                            message: error.response?.data?.message,
                            scope: 'unlockAccount',
                        });
                        break;

                    default:
                        this.addAlert({
                            type: 'danger',
                            title: '¡Servicio no disponible!',
                            message: 'Por favor recarga la página para verificar el servicio',
                            scope: 'unlockAccount',
                        });

                        break;
                }
            } finally {
                this.apiName = null;
            }
        },
        async filterProfile() {
            try {
                this.apiName = 'filterProfile';
                this.clearAlerts();

                const user = JSON.parse(sessionStorage.getItem("user") || "{}");

                const headers = { Authorization: `Bearer ${user.token}` };
                // const simulateDelay = async (ms) => new Promise(resolve => setTimeout(resolve, ms));
                const response = await axios.get(`${BASE_URL}api/v1/account/filter/profile`, { headers });
                // await simulateDelay(3000);

                if (response.data.statusCode === 200) {
                    this.profile = response.data.data
                }

                if (response.data.statusCode === 401) {
                    this.isAuthenticated === false;
                    sessionStorage.clear();
                }

            } catch (error) {
                this.apiName = null;
                console.log(error.response.data);
                this.isAuthenticated === false;
                sessionStorage.clear();
            } finally {
                this.apiName = null;
            }
        },
        async updateProfile(profile) {
            try {
                this.apiName = 'updateProfile';
                this.clearAlerts(); // Limpia cualquier alerta existente

                const user = JSON.parse(sessionStorage.getItem("user") || "{}");

                const headers = { Authorization: `Bearer ${user.token}` };

                const simulateDelay = async (ms) => new Promise(resolve => setTimeout(resolve, ms));
                const response = await axios.put(`${BASE_URL}api/v1/account/update/profile`,
                    {
                        'origen': profile.origen,
                        'ci': profile.ci,
                        'first_name': profile.first_name,
                        'last_name': profile.last_name,
                        'birthdate': profile.birthdate,
                        'phone': profile.phone,
                    },
                    {
                        headers
                    });
                await simulateDelay(2000);

                if (response.data.statusCode === 200) {
                    // this.addAlert({
                    //     type: 'success',
                    //     title: '¡Perfil actualizado exitosamente!',
                    //     message: response?.data?.message,
                    //     scope: 'updateProfile',
                    // });
                    const Toast = Swal.mixin({
                        toast: true,
                        position: 'bottom-end',
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                        customClass: {
                            popup: 'custom-toast'
                        },
                        didOpen: (toast) => {
                            toast.addEventListener('mouseenter', Swal.stopTimer)
                            toast.addEventListener('mouseleave', Swal.resumeTimer)
                        }
                    });
                    Toast.fire({
                        icon: 'success',
                        title: response?.data?.message
                    })
                    return true;
                }

                return false;
            } catch (error) {
                this.apiName = null;

                // console.log(error.response?.data?.statusCode);
                // console.log(error.response?.data?.message);


                switch (error.response?.data?.statusCode) {
                    case 422:
                        this.addAlert({
                            type: 'danger',
                            title: '¡Ups!',
                            message: error.response?.data?.message,
                            scope: 'updateProfile',
                        });
                        break;

                    default:
                        this.addAlert({
                            type: 'danger',
                            title: '¡Servicio no disponible!',
                            message: 'Por favor recarga la página para verificar el servicio',
                            scope: 'updateProfile',
                        });
                        break;
                }

                return false;
            } finally {
                this.apiName = null;
            }

        },

        async newPassword(currentPassword, password) {
            try {
                this.apiName = 'newPassword';
                this.clearAlerts(); // Limpia cualquier alerta existente


                const user = JSON.parse(sessionStorage.getItem("user") || "{}");
                const headers = { Authorization: `Bearer ${user.token}` };



                // Realizar la solicitud PUT con axios
                const response = await axios.put(`${BASE_URL}api/v1/account/update/password`,
                    {
                        'currentPassword': currentPassword,
                        'password': password,
                    },
                    {
                        headers
                    });

              

                if (response.data.statusCode === 200) {
                    this.addAlert({
                        type: 'success',
                        title: '¡Contraseña actualizada!',
                        message: response?.data?.message,
                        scope: 'newPassword',
                    });
                    return true;
                }

                return false;
            } catch (error) {
                this.apiName = null;

                console.log(error.response?.data?.statusCode);
                console.log(error.response?.data?.message);



                switch (error.response?.data?.statusCode) {
                    case 409:
                        this.addAlert({
                            type: 'danger',
                            title: '¡Ups!',
                            message: error.response?.data?.message,
                            scope: 'newPassword',
                        });
                        break;

                    default:
                        this.addAlert({
                            type: 'danger',
                            title: '¡Servicio no disponible!',
                            message: 'Por favor recarga la página para verificar el servicio',
                            scope: 'newPassword',
                        });
                        break;
                }

                // return false;
            } finally {
                this.apiName = null;
            }
        }

    },
});

// Configura los interceptores de Axios para verificar el token automáticamente
axios.interceptors.request.use(
    (config) => {
        if (user.token) {
            config.headers.Authorization = `Bearer ${user.token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Manejo de respuestas con error 401 (token expirado o no válido)
axios.interceptors.response.use(
    (response) => response,
    async (error) => {
        // Si la respuesta tiene un error 401, deslogueamos al usuario
        if (error.response && error.response.status === 401) {
            sessionStorage.clear();

        }
        return Promise.reject(error);
    }
);
