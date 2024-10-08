<script>
import AdminUploadScorm from './components/AdminUploadScorm.vue';
import CompositionLifeCycle from './components/CompositionLifeCycle.vue';
import HelloWorld from './components/HelloWorld.vue'
import LifeCycle from './components/LifeCycle.vue';
import PipScorm from './components/PipScorm.vue';
import Rustici from './components/Rustici.vue';
import Scorm from './components/Scorm.vue';
import ScormAgain from './components/ScormAgain.vue';
import SCORMAPI from './components/SCORMAPI.vue';
import TheWelcome from './components/TheWelcome.vue'
// import * as ScormA from 'scorm-again'
export default {
  name: 'App',
  components: {
    LifeCycle,
    CompositionLifeCycle,
    SCORMAPI,
    AdminUploadScorm
  },
  data() {
    return {
      showLifecycle: true,
    };
  },
  methods: {
    toggleLifecycleComponent() {
      this.showLifecycle = !this.showLifecycle; // Toggles the display of the LifeCycle component  
    },
    checkEmifunction(value) {
      console.log('value from child',value);
    }
  },
};  

</script>

<template>
  For Life cycle of hook

  <h1>Option API</h1>

  <LifeCycle v-if="showLifecycle" @emit-event="checkEmifunction" />

  <h1>composition API</h1>
  
  <CompositionLifeCycle v-if="showLifecycle" @emit-event="checkEmifunction" />
  <button @click="toggleLifecycleComponent">Toggle LifeCycle Component</button>

  <!-- <Rustici />  -->
  <!-- <Scorm/> -->
  <!-- <PipScorm/> -->
  <!-- <ScormAgain/> -->
  <!-- <AdminUploadScorm/> -->
  <!-- <SCORMAPI /> -->
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
