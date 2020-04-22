<template>
  <div class>
    <form @submit.prevent="submit">
      <div class="form-group">
        <label>Логин</label>
        <input v-model="login" class="form-control" />
      </div>
      <div class="form-group">
        <label>Пароль</label>
        <input v-model="password" class="form-control" />
      </div>
      <div class="form-group">
        <button class="btn btn-block btn-primary">войти</button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Emit } from "vue-property-decorator";

@Component
export default class HelloWorld extends Vue {
  protected login = "";
  protected password = "";

  @Emit()
  public submit() {
    console.log("submit form");
    return {
      login: this.login,
      password: this.password
    };
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus"></style>
