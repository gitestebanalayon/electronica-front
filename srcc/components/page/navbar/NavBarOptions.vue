<script setup>
import Items from './NavBarOptionsItems.vue';
import ItemsSub from './NavBarOptionsItemsSub.vue';

</script>

<template>
    <div class="collapse navbar-collapse dropdown" id="sidebar-menu">
        <ul class="navbar-nav pt-lg-2 pb-lg-2 d-flex gap-1">
            <Items :icon="['fas', 'home']" name="Inicio" routs="/home" />
            <Items :icon="['fas', 'crown']" name="Clientes" routs="/customers" badge="active" />

            <li>
                <ItemsSub name="Interface" :icon="['fab', 'dropbox']" active="#active1" />
                <div id="active1" class="collapse rounded-2 bg-gray-700">
                    <ul class="navbar-nav d-flex gap-1">
                        <Items class="mt-1" :icon="['fab', 'dropbox']" name="Cajas" routs="/cajas" />
                        <Items :icon="['fas', 'layer-group']" name="Categorias" routs="/categorias" />
                        <Items :icon="['fas', 'folder-open']" name="Archivos" routs="/archivos" />


                        <li>
                            <ItemsSub name="Social" :icon="['fas', 'icons']" active="#active2" />
                            <div id="active2" class="collapse">
                                <ul class="navbar-nav d-flex gap-1">
                                    <Items class="mt-1" :icon="['fas', 'message']" name="Mensajes" routs="/mensajes" />
                                    <Items :icon="['fab', 'facebook']" name="Facebook" routs="/facebook" />
                                    <Items :icon="['fas', 'envelope']" name="Correos" routs="/correos" />

                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>
            </li>

            <Items :icon="['fas', 'star']" name="Favoritos" routs="/a" />
            <Items :icon="['fas', 'users']" name="Personas" routs="/b" badge="active" />
            <Items :icon="['fas', 'hand-point-up']" name="Puntos" routs="/c" />
            <Items :icon="['fas', 'radio']" name="Radios" routs="/d" />
            <Items :icon="['fas', 'video']" name="Videos" routs="/e" />

            <Items :icon="['fas', 'gear']" name="Configuración" icon="ti ti-settings" routs="/profile" />



        </ul>
    </div>
</template>

<style scoped></style>