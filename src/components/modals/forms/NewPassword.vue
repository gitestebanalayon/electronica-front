<script setup>
/*--------------------------------------------------------*/
// Librerias
import { ref } from 'vue';
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';

// Componentes
import HeaderModal from "../component_base/HeaderModal.vue";
import AlertGlobal from "../../global/AlertGlobal.vue";
import LabelGlobal from "../../global/LabelGlobal.vue";
import ButtonGlobal from "../../global/ButtonGlobal.vue";

// SVG para los iconos
import svg from '../../../assets/svg/icons-svg.json';

// Stores de pinia
import { useAccountStore } from "@/stores/account";
const useAccount = useAccountStore();

/*--------------------------------------------------------*/

const schema = ref(yup.object().shape({
    currentPassword: yup.string()
        .required('La contraseña actual es obligatoria')
        .min(3, 'La contraseña actual debe tener al menos 3 dígitos')
        .max(8, 'La contraseña actual no puede tener más de 8 dígitos'),
    password: yup.string()
        .required('La contraseña es obligatoria')
        .min(3, 'La contraseña debe tener al menos 3 dígitos')
        .max(8, 'La contraseña no puede tener más de 8 dígitos'),
    confirmPassword: yup.string()
        .required('Debes repetir la contraseña')
        .oneOf([yup.ref('password')], 'Las contraseñas no coinciden'),
})
);

const formData = ref({
    currentPassword: '',
    password: '',
    confirmPassword: '',
});

async function newPassword() {
    try {
        await schema.value.validate(formData.value, { abortEarly: false });
        await useAccount.newPassword(formData.value.currentPassword, formData.value.password);




    } catch (validationErrors) {
        console.log(validationErrors);
    }
}


/*--------------------------------------------------------*/

</script>

<template>
    <div class="modal modal-blur fade" id="modal-simple" tabindex="-1" style="display: none;" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">

            <!--------------------------------------------- Formulario --------------------------------------------->
            <Form class="modal-content" @submit="newPassword" :validation-schema="schema" v-slot="{ errors }">
                <HeaderModal title="Establecer nueva contraseña" />

                <div class="modal-body d-flex flex-column">
                    <!-- Campo de Contraseña -->
                    <div class="mb-3">
                        <LabelGlobal label="Contraseña actual" />
                        <Field v-model="formData.currentPassword" class="form-control"
                            :class="{ 'is-invalid': errors.currentPassword }" type="password" name="currentPassword"
                            placeholder="nueva contraseña" />
                        <ErrorMessage name="currentPassword" class="invalid-feedback" />
                    </div>

                    <!-- Campo de Contraseña -->
                    <div class="mb-3">
                        <LabelGlobal label="Nueva contraseña" />
                        <Field v-model="formData.password" class="form-control"
                            :class="{ 'is-invalid': errors.password }" type="password" name="password"
                            placeholder="nueva contraseña" />
                        <ErrorMessage name="password" class="invalid-feedback" />
                    </div>

                    <!-- Campo de Confirmar Contraseña -->
                    <div class="mb-3">
                        <LabelGlobal label="Repetir contraseña" />
                        <Field v-model="formData.confirmPassword" class="form-control"
                            :class="{ 'is-invalid': errors.confirmPassword }" type="password" name="confirmPassword"
                            placeholder="confirmar contraseña" />
                        <ErrorMessage name="confirmPassword" class="invalid-feedback" />
                    </div>

                    <!-- Alerta de error -->
                    <AlertGlobal scope="newPassword" />
                </div>

                <div class="modal-footer d-flex justify-content-between">
                    <ButtonGlobal type="button" label="Cancelar" class="btn" data-bs-dismiss="modal" />
                    <ButtonGlobal class="btn btn-primary" type="submit" :disabled="useAccount.apiName === 'newPassword'"
                        label="Listo" :loading="useAccount.apiName === 'newPassword'" />
                </div>
            </Form>

        </div>
    </div>
</template>


<style scoped></style>