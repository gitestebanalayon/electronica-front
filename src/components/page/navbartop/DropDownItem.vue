<script setup>
    import avatar from '@/assets/img/esteban.jpg';

    defineProps(['bg_color', 'subtitle', 'bodytext', 'active'])
</script>

<template>
    <div class="list-group-item">
        <div class="row align-items-center">
            <div class="col-auto d-flex align-items-center gap-3">
                <span :class="bg_color" class="status-dot status-dot-animated d-block"></span>
                <span v-if="active == 'd-block'" :class="active" class="avatar rounded">
                    <!-- <div class="rounded" :style="{ backgroundImage: `url(${logo})` }"></div> -->
                </span>
            </div>
            <div class="col text-truncate">
                <a href="#" class="text-body d-block text-decoration-none">{{ subtitle }}</a>
                <div class="d-block text-muted text-truncate mt-n1">
                    {{ bodytext }}
                </div>
            </div>
            <div class="col-auto">
                <a href="#" class="nav-link list-group-item-actions">
                    <i class="icon ti ti-star text-secondary"></i>
                </a>
            </div>
        </div>
    </div>
</template>