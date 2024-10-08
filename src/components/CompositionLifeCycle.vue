<template>
    <div v-if="show">
        <h1>Life Cycle of Vue.js Component</h1>
        <p>Count: {{ count }}</p>
        <p>User Name: {{ userObj.name }}</p>
        <p>User Age: {{ userObj.age }} <input type="number" v-model="userObj.age"></p>
        <p>Emit Event: <input type="text" @keyup="checkEmifunction" /></p>
        <button @click="incrementCount">Increment Count</button>
        <button @click="updateduser">Update user age</button>
        <button @click="stopWatcher">Stop Watcher</button>
    </div>
</template>

<script>
import { ref, reactive, watch, onBeforeMount, onMounted, onBeforeUpdate, onUpdated, onBeforeUnmount, onUnmounted } from 'vue';

export default {
    name: 'CompositionLifeCycle',
    setup(props, { emit }) {
        const count = ref(0);
        const userObj = reactive({
            name: 'John Doe',
            age: 30
        });
        const show = ref(true);
        let userObjWatch = null;

        console.log('beforeCreate');

        // Watch for count updates
        watch(count, (newVal, oldVal) => {
            console.log("state value of count is updated from", oldVal, "to", newVal);
        });

        // Watch for userObj deep updates
        userObjWatch = watch(
            () => userObj,
            (newVal, oldVal) => {
                console.log("state value of UserObj is updated from", oldVal, "to", newVal);
            },
            { deep: true }
        );

        // Lifecycle hooks
        onBeforeMount(() => {
            console.log('beforeMount');
        });

        onMounted(() => {
            console.log('mounted');
        });

        onBeforeUpdate(() => {
            console.log('beforeUpdate');
        });

        onUpdated(() => {
            console.log('updated');
        });

        onBeforeUnmount(() => {
            console.log('beforeUnmount');
        });

        onUnmounted(() => {
            console.log('unmounted');
        });

        // Methods
        const incrementCount = () => {
            count.value += 1;
        };

        const updateduser = () => {
            userObj.age = Math.round(Math.random() * 100);
        };

        const stopWatcher = () => {
            if (userObjWatch) {
                console.log('stopWatch');
                userObjWatch(); // Unwatch
            }
        };

        const checkEmifunction = (e) => {
            emit('emit-event', e.target.value);
        };

        return {
            count,
            userObj,
            show,
            incrementCount,
            updateduser,
            stopWatcher,
            checkEmifunction
        };
    }
};
</script>

<style scoped>
h1 {
    color: #42b983;
}
</style>
