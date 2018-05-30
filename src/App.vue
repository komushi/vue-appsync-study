<!-- <template>
  <div id="app" v-if="hydrated">
		<app-sync-example></app-sync-example>
    <img src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template> -->

<template>
  <div id="app">
    <router-view/>
  </div>
</template>


<script>
// import HelloWorld from './components/HelloWorld.vue'
// import AppSyncExample from './components/AppSyncExample.vue'

export default {
  name: 'app',
  // data: () => ({ hydrated: false }),
  // async mounted() {
  //   await this.$apollo.provider.defaultClient.hydrated();
  //   this.hydrated = true;
  // },
  // components: {
		// AppSyncExample,
  //   HelloWorld
  // }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
