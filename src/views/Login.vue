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

type ResponseResult<Payload = any> = {
  result: boolean;
  payload?: Payload;
  error?: any;
};

@Component<Home>({
  components: { LoginForm }
})
export default class Home extends Vue {
  protected loading = true;

  protected error = false;

  protected redirect!: string;

  public created() {
    /** сохраняем роут по которому пытался войти юзер чтобы перенаправить его после логина */
    this.redirect = (this.$route.query.redirect as string) || "/";
  }

  async login(credentials: {}) {
    const { data } = await axios.post<ResponseResult<string>>(
      "/login",
      credentials
    );
    if (!data.result) {
      return alert(data.error);
    }
    this.$store.commit("login", data.payload);
    const rdr = this.redirect || "/";
    this.redirect = "";
    this.$router.push(rdr);
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
