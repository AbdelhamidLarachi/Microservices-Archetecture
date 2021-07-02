<template>
<v-btn
  color="primary"
  @click="onPress()"
>{{text}}</v-btn>

</template>


<script>
export default {
    name: 'Button',
    props: {
        text: String
    },
    methods: {
        onPress(){
            console.log('Pressed')
        }
    }
}
</script>
