<template>
    <div>        
        <div v-for="item in tags" 
            :key="item.name">
            <div class="tag__container" v-if="item.name != null">
                <a class="tag">{{item.name}}</a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        tags: {
            type: Array,
            required: true,
        },
    },
}
</script>

<style lang="scss" scoped>
.tag__container{
    float: right;  
    .tag{
        border: 2px solid rgba(2, 76, 140, 1);
        border-radius: 15px;
        // background: rgba(2, 76, 140, 1); 
        color: black;
        display: inline-block;
        font-size: 1rem;
        line-height: 20px;
        padding: 5px 8px;
        text-decoration: none;
        -webkit-font-smoothing: antialiased;
    } 
}
</style>