<template>
    <div>
        <saveButton></saveButton>
        <cancelButton></cancelButton>
    </div>
</template>

<script>

import saveButton from '@/ViewModel/Elements/Buttons/saveButton'
import cancelButton from '@/ViewModel/Elements/Buttons/cancelButton'

export default {
  data(){
        return{

        }
    },
    async mounted(){},
    computed:{},
    methods:{},
    props:[],
    components:{
        'saveButton':saveButton,
        'cancelButton': cancelButton
    },
}
</script>

