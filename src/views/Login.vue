<template>
  <div class="home">
    <div class="row">
      <LoginForm @submit="login" />
    </div>
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import axios from "@/plugins/axios";
import { Component, Vue } from "vue-property-decorator";
import LoginForm from "@/components/LoginForm.vue";
import { checkLoginService } from "@/services";
import store from "@/store";

type ResponseResult<Payload = any> = {
  result: boolean;
  payload?: Payload;
  error?: any;
};

@Component<Home>({
  components: { LoginForm },
  async beforeRouteEnter(to, from, next) {
    /**
     * Если флаг в сторе, выставленн в true
     * значит мы заходили на другой роут и были перенаправлены сюда
     * то есть мы не залогинены и проверку производить еще раз не нужно
     * остаемся в этом роуте (компоненте)
     */
    if (store.state.loginIsChecked) {
      return next();
    }
    const isLogined = await checkLoginService();
    /**  при попытке входа на страницу логина авторизованного
     * пользователя редиректим его
     * на страницу теста
     */
    isLogined ? next("/") : next();
  }
})
export default class Home extends Vue {
  protected loading = true;

  protected error = false;

  async login(credentials: {}) {
    const { data } = await axios.post<ResponseResult<string>>(
      "/login",
      credentials
    );
    if (!data.result) {
      return alert(data.error);
    }
    this.$store.commit("login", data.payload);
    this.$router.push("/");
  }
}
</script>
<style scoped>
.home {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
