<script setup>
import { onMounted, ref, watch } from 'vue';
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';

import HeaderPage from '@/components/page/header/Component.vue';
import FooterPage from '@/components/page/footer/Component.vue';
import TitleGlobal from '@/components/global/TitleGlobal.vue';
import NavItemGlobal from '@/components/global/NavItemGlobal.vue';
import ButtonGlobal from '@/components/global/ButtonGlobal.vue';
import LabelGlobal from "@/components/global/LabelGlobal.vue";
import LoadingGlobal from '@/components/global/LoadingGlobal.vue'
import AlertGlobal from '@/components/global/AlertGlobal.vue'

import avatar from '@/assets/img/esteban.jpg';
import { useAccountStore } from '@/stores/account';
import LabelGlobalPlaceholder from '@/components/global/LabelGlobalPlaceholder.vue';

const useAccount = useAccountStore();
onMounted(async () => {
    await useAccount.filterProfile();
})

const schema = ref(yup.object().shape({
    first_name: yup
        .string()
        .required('El nombre es obligatorio'),
    last_name: yup
        .string()
        .required('El apellido es obligatorio'),
    origen: yup
        .string()
        .required('El origen es obligatorio')
        .length(1, 'El origen debe tener exactamente 1 dígito')
        .oneOf(['V', 'E'], 'El origen debe ser "V" o "E"'),
    ci: yup
        .number()
        .typeError('La cédula debe ser tipo numérico')
        .required('La cédula es obligatoria')
        .test(
            'len',
            'La cédula debe tener entre 6 y 8 dígitos',
            value => String(value).length >= 6 && String(value).length <= 8
        ),
    birthdate: yup
        .string()
        .required('La fecha de nacimiento es obligatoria'),
    phone: yup
        .string()
        .required('El teléfono es obligatorio')
        .length(11, 'El teléfono debe tener exactamente 11 dígitos'),
})
);

async function updateProfile() {
    await useAccount.updateProfile(useAccount.profile);
}

</script>

<template>
    <main class="page-wrapper">
        <!-- Page header -->
        <HeaderPage :icon="['fas', 'gear']" text="Configuración" />

        <div class="page-body mt-3 mb-3">
            <div class="ps-3 pe-3">

                <div class="card">
                    <div class="row g-0">
                        <div class="col-3 d-none d-md-block border-right">
                            <div class="card-body">
                                <ul class="nav list-group list-group-transparent" data-bs-toggle="tabs" role="tablist">
                                    <TitleGlobal class="subheader ms-3 mb-3" type="h4" text="Configuración general" />
                                    <NavItemGlobal href="#tabs-profile" text="Perfil" :active="true"
                                        :ariaSelected="true" />
                                    <NavItemGlobal href="#tabs-cuenta" text="Cuenta" :active="false"
                                        :ariaSelected="false" />

                                    <TitleGlobal class="subheader mt-3 mb-3 ms-3" type="h4" text="Experiencia" />
                                    <NavItemGlobal href="#tabs-comment" text="Comentarios" :active="false"
                                        :ariaSelected="false" />
                                </ul>
                            </div>
                        </div>

                        <div class="col d-flex flex-column">
                            <div class="tab-content">

                                <div v-if="useAccount.apiName === 'filterProfile'" id="tabs-profile"
                                    class="container-loader tab-pane active show placeholder-glow rounded" role="tabpanel">
                                    <LoadingGlobal />
                                </div>

                                <div v-else id="tabs-profile" class="tab-pane active show" role="tabpanel">
                                    <div class="card-header border-0 pb-0">
                                        <TitleGlobal type="h2" style="height: 20px;" text="Perfil" />
                                    </div>
                                    <div class="card-body">
                                        <div class="row align-items-center">
                                            <div class="col-auto">
                                                <span class="avatar avatar-xl"
                                                    :style="{ backgroundImage: `url(${avatar})` }"></span>
                                            </div>
                                            <div class="col-auto">
                                                <ButtonGlobal class="btn btn-outline-primary" type="button"
                                                    label="Cambiar avatar" />
                                            </div>
                                            <div class="col-auto">
                                                <ButtonGlobal class="btn btn-outline-danger" type="button"
                                                    label="Eliminar avatar" />
                                            </div>
                                        </div>

                                        <Form id="update-profile" class="g-3 mt-3" @submit="updateProfile"
                                            :validation-schema="schema" v-slot="{ errors }">

                                            <div class="row">
                                                <div class="col-md mb-3">
                                                    <LabelGlobal label="Nombre" style="height: 20px;" />
                                                    <Field v-model="useAccount.profile.first_name" class="form-control"
                                                        :class="{ 'is-invalid': errors.first_name }" type="text"
                                                        name="first_name" />
                                                    <ErrorMessage name="first_name" class="invalid-feedback" />
                                                </div>
                                                <div class="col-md mb-3">
                                                    <LabelGlobal label="Apellido" />
                                                    <Field v-model="useAccount.profile.last_name" class="form-control"
                                                        :class="{ 'is-invalid': errors.last_name }" type="text"
                                                        name="last_name" />
                                                    <ErrorMessage name="last_name" class="invalid-feedback" />
                                                </div>

                                                <div class="col-md mb-3">
                                                    <LabelGlobal label="Fecha de nacimiento" />
                                                    <Field v-model="useAccount.profile.birthdate" class="form-control"
                                                        :class="{ 'is-invalid': errors.birthdate }" type="date"
                                                        name="birthdate" />
                                                    <ErrorMessage name="birthdate" class="invalid-feedback" />
                                                </div>
                                            </div>

                                            <div class="row">
                                                <div class="col-md mb-3">
                                                    <LabelGlobal label="Origen" />

                                                    <Field v-model="useAccount.profile.origen" class="form-control"
                                                        :class="{ 'is-invalid': errors.origen }" type="text"
                                                        name="origen" />
                                                    <ErrorMessage name="origen" class="invalid-feedback" />
                                                </div>
                                                <div class="col-md mb-3">
                                                    <LabelGlobal label="Cédula" />
                                                    <Field v-model="useAccount.profile.ci" class="form-control"
                                                        :class="{ 'is-invalid': errors.ci }" type="number" name="ci" />
                                                    <ErrorMessage name="ci" class="invalid-feedback" />
                                                </div>


                                                <div class="col-md mb-3">
                                                    <LabelGlobal label="Teléfono" />
                                                    <Field v-model="useAccount.profile.phone" class="form-control"
                                                        :class="{ 'is-invalid': errors.phone }" type="text"
                                                        name="phone" />
                                                    <ErrorMessage name="phone" class="invalid-feedback" />
                                                </div>
                                                <!-- 
                                            </div>

                                            <div class="row">
                                                
                                                <div class="col-md mb-3">
                                                    <LabelGlobal label="Correo" />
                                                    <Field v-model="useAccount.profile.email" class="form-control"
                                                        :class="{ 'is-invalid': errors.email }" type="email"
                                                        name="email" />
                                                    <ErrorMessage name="email" class="invalid-feedback" />
                                                </div>

                                                <div class="col-md mb-3">
                                                    <div class="form-label">Cambio de clave:</div>
                                                    <ButtonGlobal class="btn w-100" type="button"
                                                        label="Establecer una nueva" />
                                                </div> -->
                                            </div>

                                            <div class="card-footer border-0 pt-5 bg-transparent mt-auto">
                                                <div class="btn-list justify-content-center">
                                                    <div class="col col-md-2">

                                                        <button type="submit" class="btn btn-primary"
                                                            :disabled="useAccount.apiName === 'updateProfile'"
                                                            style="width: 100%;">
                                                            <LoadingGlobal
                                                                v-if="useAccount.apiName === 'updateProfile'" />
                                                            <span v-else>Entregar</span>
                                                        </button>

                                                        <AlertGlobal scope="updateProfile" />
                                                    </div>
                                                </div>
                                            </div>
                                        </Form>
                                    </div>

                                </div>

                                <div id="tabs-cuenta" class="tab-pane" role="tabpanel">
                                    <div class="card-header border-0 pb-0">
                                        <TitleGlobal type="h2" text="Cuenta" />
                                    </div>
                                    <div class="card-body">
                                        <Form id="update-profile" class="g-3 mt-3" @submit="updateProfile"
                                            :validation-schema="schema" v-slot="{ errors }">

                                            <div class="row">
                                                <div class="col-md mb-3">
                                                    <LabelGlobal label="Correo" style="height: 20px;" />
                                                    <Field v-model="useAccount.profile.email" class="form-control"
                                                        :class="{ 'is-invalid': errors.email }" type="email"
                                                        name="email" />
                                                    <ErrorMessage name="email" class="invalid-feedback" />
                                                </div>
                                                <div class="col-md mb-3">
                                                    <LabelGlobal label="Nombre de usuario" style="height: 20px;" />
                                                    <Field v-model="useAccount.profile.username" class="form-control"
                                                        :class="{ 'is-invalid': errors.email }" type="text"
                                                        name="username" />
                                                    <ErrorMessage name="username" class="invalid-feedback" />
                                                </div>
                                                <div class="col-md mb-3">
                                                    <LabelGlobal label="Contraseña" style="height: 20px;" />
                                                    <ButtonGlobal label="Establecer una nueva" type="button"
                                                        class="btn w-100" />
                                                </div>
                                            </div>



                                            <div class="card-footer border-0 pt-0 bg-transparent mt-auto">
                                                <div class="btn-list justify-content-center">
                                                    <div class="col col-md-2">
                                                        <button type="submit" class="btn btn-primary"
                                                            :disabled="useAccount.apiName === 'updateProfile'"
                                                            style="width: 100%;">
                                                            <LoadingGlobal
                                                                v-if="useAccount.apiName === 'updateProfile'" />
                                                            <span v-else>Entregar</span>
                                                        </button>

                                                        <AlertGlobal scope="updateProfile" />
                                                    </div>
                                                </div>
                                            </div>
                                        </Form>
                                    </div>
                                </div>

                                <div id="tabs-comment" class="tab-pane" role="tabpanel">
                                    <div class="card-header border-0 pb-0">
                                        <TitleGlobal type="h2" text="Comentarios" />
                                    </div>
                                    <div class="card-body">
                                        <p class="text-secondary">En construcción...</p>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>

        <!-- Page footer -->
        <FooterPage />
    </main>

</template>
