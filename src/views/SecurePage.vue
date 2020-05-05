<template>
  <div>
    <h3 class="mt-5">secure component</h3>
    <div>
      <router-link to="/">Тест линии</router-link>
    </div>
  </div>
</template>
<script>
import { Vue, Component } from "vue-property-decorator";
@Component({})
export default class SecurePage extends Vue {}
</script>
