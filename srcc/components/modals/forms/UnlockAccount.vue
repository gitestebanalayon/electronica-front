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

// Stores de pinia
import { useAccountStore } from "@/stores/account";
const useAccount = useAccountStore();

/*--------------------------------------------------------*/

const schema = ref(yup.object().shape({
    email: yup
        .string()
        .email('Debe ser un correo válido')
        .required('El correo es obligatorio'),
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
})
);

const formData = ref({
    ci: '',
    email: '',
    birthdate: '',
});

async function unlockAccount() {
    await useAccount.unlockAccount(formData.value.email, Number(formData.value.ci), formData.value.birthdate);
}

/*--------------------------------------------------------*/

</script>

<template>
    <div class="modal modal-blur fade" id="modal-unlock" tabindex="-1" style="display: none;" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">

            <!------------------------------------------- Formulario ------------------------------------------->
            <Form id="restore-password" class="modal-content" @submit="unlockAccount" :validation-schema="schema"
                v-slot="{ errors }">
                <HeaderModal title="Desbloquear cuenta" />
                <div class="modal-body d-flex flex-column">
                    <!-- Campo de Cédula -->
                    <div class="mb-3">
                        <LabelGlobal label="Cédula" />
                        <Field v-model="formData.ci" class="form-control" :class="{ 'is-invalid': errors.ci }"
                            type="number" name="ci" placeholder="Cédula de identidad" />
                        <ErrorMessage name="ci" class="invalid-feedback" />
                    </div>

                    <!-- Campo de Correo -->
                    <div class="mb-3">
                        <LabelGlobal label="Correo" />
                        <Field v-model="formData.email" class="form-control" :class="{ 'is-invalid': errors.email }"
                            type="email" name="email" placeholder="tucorreo@gmail.com" />
                        <ErrorMessage name="email" class="invalid-feedback" />
                    </div>

                    <!-- Campo de Fecha de nacimiento -->
                    <div class="mb-3">
                        <LabelGlobal label="Fecha de nacimiento" />
                        <Field v-model="formData.birthdate" class="form-control"
                            :class="{ 'is-invalid': errors.birthdate }" type="date" name="birthdate" />
                        <ErrorMessage name="birthdate" class="invalid-feedback" />
                    </div>

                    <!-- Mensages de alertas -->
                    <AlertGlobal scope="unlockAccount" />
                </div>

                <div class="modal-footer d-flex justify-content-between">
                    <ButtonGlobal type="button" label="Cancelar" class="btn" data-bs-toggle="modal"
                        data-bs-target="#modal-unlock" />
                    <ButtonGlobal type="submit" label="Desbloquear cuenta" class="btn btn-primary"
                        :disabled="useAccount.apiName === 'unlockAccount'"
                        :loading="useAccount.apiName === 'unlockAccount'" />
                </div>
            </Form>

        </div>
    </div>
</template>


<style scoped></style>