<template>
    <button type="button" class="stay-filter" @click="(open = true)">
        <div class="flex justify-center align-center">
            <icon icon-type="filter" />
            <span>Filters</span>
        </div>

        <el-drawer v-model="open" direction="btt">
            <p>TODO: Render filters</p>
        </el-drawer>
    </button>
</template>

<script>
import icon from '../icon-cmp.vue'

export default {
    components: { icon },
    emits: ['change'],
    data() {
        return {
            open: false,
            filterBy: {}
        }
    },
    methods: {
        handleClose() {
            this.open = false
            this.$emit('change', this.filterBy)
        }
    }
}
</script>