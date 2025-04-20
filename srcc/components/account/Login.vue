<template>

    <main class=" d-flex flex-column vh-100">
        <div class="row g-0 flex-fill">
            <div
                class="col-12 col-lg-6 col-xl-4 border-top-wide border-primary d-flex flex-column justify-content-center">
                <div class="container container-tight my-5 px-lg-5">
                    <div class="text-center mb-4">
                        <a href="." class="navbar-brand navbar-brand-autodark"><img src="../../assets/img/logo.png"
                                height="100" alt=""></a>
                    </div>
                    <h2 class="h3 text-center mb-3">
                        Inicie sesión en su cuenta
                    </h2>
                    <Form autocomplete="off" @submit="login" :validation-schema="validate" v-slot="{ errors }">

                        <div class="mb-3">
                            <label class="form-label">Correo electrónico:</label>
                            <Field v-model="email" name="email" placeholder="tucorreo@email.com" id="floating-input-u"
                                autocomplete="off" type="email" class="form-control"
                                :class="{ 'is-invalid': errors.email }" />
                            <div class="invalid-feedback">{{ errors.email }}</div>
                        </div>
                        <div class="mb-2">
                            <label class="form-label">
                                Contraseña:
                                <span class="form-label-description">
                                    <a href="#" data-bs-toggle="modal" data-bs-target="#modal-simple">Olvidé la
                                        contraseña</a>
                                </span>
                            </label>
                            <Field v-model="password" name="password" placeholder="Contraseña" id="floating-input-u"
                                autocomplete="off" type="password" class="form-control"
                                :class="{ 'is-invalid': errors.password }" />
                            <div class="invalid-feedback">{{ errors.password }}</div>
                        </div>


                        <AlertGlobal scope="login" />

                        <div class="form-footer">
                            <button type="submit" class="btn btn-primary w-100"
                                :disabled="useAccount.apiName === 'login'">
                                <LoadingGlobal v-if="useAccount.apiName === 'login'" />
                                <span v-else>Iniciar sesión</span>
                            </button>
                        </div>

                        <div class="text-center text-muted mt-3">
                            ¿Cuenta bloqueada? <a href="#" tabindex="-1" data-bs-toggle="modal"
                                data-bs-target="#modal-unlock">desbloquear cuenta.</a>
                        </div>
                    </Form>
                </div>
            </div>
            <div class="col-12 col-lg-6 col-xl-8 d-none d-lg-block">
                <!-- Photo -->
                <div class="bg-cover h-100 min-vh-100" :style="{ backgroundImage: `url(${logo})` }"></div>
            </div>
        </div>

    </main>

    <RestorePassword />
    <UnlockAccount />
</template>

<script setup>
import RestorePassword from '@/components/modals/forms/RestorePassword.vue'
import UnlockAccount from '@/components/modals/forms/UnlockAccount.vue'
import AlertGlobal from '@/components/global/AlertGlobal.vue'
import LoadingGlobal from '@/components/global/LoadingGlobal.vue'

import logo from '@/assets/img/fondo.png';

import { Form, Field } from 'vee-validate';
import * as Yup from 'yup';

import { useAccountStore } from '@/stores/account';
import { onBeforeMount, ref } from 'vue';
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2';

const useAccount = useAccountStore();

const validate = Yup.object().shape({
    email: Yup.string()
        .email('Debe ser un correo válido')
        .required('El correo es obligatorio'),
    password: Yup.string()
        .min(8, 'La clave debe tener como mínimo 8 caracteres')
        .required('La clave es obligatoria'),
});

const email = ref('')
const password = ref('')

onBeforeMount(() => {
    sessionStorage.clear();
})

const router = useRouter();

async function login() {
    const response = await useAccount.login(email.value, password.value);

    if (response.statusCode === 200) {
        router.push('/home');
    } else {
        router.push('/');
    }

}

</script>