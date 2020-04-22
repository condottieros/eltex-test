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

type ReturnLogin =
  | { result: false; code: string; message: string }
  | { result: true; user: string };

@Component<Home>({
  components: { LoginForm }
})
export default class Home extends Vue {
  protected loading = true;
  protected error = false;

  async login(credentials: {}) {
    try {
      const { data } = await axios.post<ReturnLogin>("/login", credentials, {
        withCredentials: true
      });
      console.log(data);
      if (!data.result) return alert(data.message);

      this.$store.commit("login", data.user);
      this.$router.push("/");
    } catch (e) {
      alert("Ошибка соедиения. Повторите попытку !");
    }
  }
}
/*
  public async created() {    
    const checked = await this.checkAuth();
    if (checked === "error") return (this.error = true);
    if (checked) return this.$router.push({ name: "test_line" });
    this.loading = false;    
  }*/
/*
  async checkAuth(): Promise<boolean | "error"> {
    try {
      const { data: res } = await axios.get<ResultLogin>("/check-auth", {
        withCredentials: true
      });
      console.log(res);
      if (res.result) {
        this.$store.commit("login", res.user);
        return true;
      }
      return false;
    } catch (e) {
      return "error";
    }
  } */
</script>
<style scoped>
.home {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
