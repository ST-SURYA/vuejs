<template>
    <div v-if="show">
        <h1>Life Cycle of Vue.js Component</h1>
        <p>Count: {{ count }}</p>
        <p>User Name: {{ userObj.name }}</p>
        <p>User Age: {{ userObj.age }} <input type="number" v-model="userObj.age"></p>
        <button @click="incrementCount">Increment Count</button>
        <button @click="updateduser">Update user age</button>
        <button @click="stopWatcher">Stop Watcher</button>
    </div>
</template>

<script>
export default {
    name: 'LifeCycle',
    data() {
        return {
            count: 0,
            userObj: {
                name: 'John Doe',
                age: 30
            },
            show: true,
            userObjWatch:null
        };
    },
    beforeCreate() {
        console.log('beforeCreate');
    },
    created() {
        console.log('created');

        //watcher for userObj state
        this.userObjWatch = this.$watch("userObj", (currentValue, prevValue) => {
            console.log("state value of UserObj is been updated from ", prevValue, "to", currentValue);
        }, { deep: true });
    },
    beforeMount() {
        console.log('beforeMount');
    },
    mounted() {
        console.log('mounted');
    },
    beforeUpdate() {
        console.log('beforeUpdate');
    },
    updated() {
        console.log('updated');
    },
    beforeUnmount() {
        console.log('beforeUnmount');
    },
    unmounted() {
        console.log('unmounted');
    },
    watch:{
        count(currentValue, prevValue) {
            console.log("state value of count is been updated from ",prevValue , "to" ,currentValue)
        },
        // userObj:{
        //     handler(currentValue, prevValue) {
        //         // Note: `newValue` will be equal to `oldValue` here
        //         // on nested mutations as long as the object itself
        //         // hasn't been replaced.
        //         console.log("state value of UserObj is been updated from ", prevValue, "to", currentValue);
        //     },
        //     deep: true,
        //     // once:true,
        //     // immediate:true
        // }
    },
    methods: {
        incrementCount() {
            this.count += 1;
        },
        toggleVisibility() {
            this.show = !this.show;
        },
        updateduser() {
            this.userObj.age = Math.round(Math.random() * 100);

        },
        stopWatcher() {
            console.log("stopWatch")
            this.userObjWatch();
        }
    },
};  
</script>

<style scoped>
h1 {
    color: #42b983;
}
</style>