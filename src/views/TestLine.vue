<template>
  <div class="about">
    <h1>Тестирование линии.</h1>
    <div class="my-3 text-right">
      <button @click="logout" class="btn btn-sm btn-success">Выйти</button>
    </div>
    <div class="card">
      <div class="card-body">
        <div class="text-right">
          <button
            v-if="!completed"
            @click="startTest"
            :disabled="pending"
            class="btn btn-sm btn-success"
            style="inline-block"
          >Запуск теста</button>
          <button
            @click="reset"
            v-if="completed"
            class="btn btn-sm btn-primary"
          >Сброс результатов теста</button>
        </div>
        <div v-if="pending" class="text-left mt-3">До конца теста осталось - {{ timeToEnd }}</div>
        <div v-if="testResult" class="text-left mt-3">Результат теста линии - {{ testResult }}</div>
        <div v-if="pending" class="row mt-3 mb-3">
          <div class="jjj" :style="{width: indicator + '%'}"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import axios from "@/plugins/axios";
import { BaseAPIURL } from "@/constats";

type LogoutResult = { result: boolean };

@Component({})
export default class TestLine extends Vue {
  public currentTick = 0;

  public testResult = 0;

  public completed = false;

  public pending = false;

  async created() {
    try {
      const { data: res } = await axios.get("/check-test", {
        withCredentials: true
      });
      if (!res.result)
        return alert("Ошибка сервера! Попробуйте перелогиниться !");
      if (res.current) return this.startTest();
      if (res.testResult) {
        this.testResult = res.testResult.count;
        this.completed = true;
      }
      return true;
    } catch (e) {
      alert("Ошибка соединения! Перезагрузите страницу пожалуйста");
      console.log(e);
    }
  }

  async logout() {
    try {
      const { data } = await axios.get<LogoutResult>("/logout");
      if (data.result) {
        this.$store.commit("logout");
        this.$router.push({ name: "login" });
      }
    } catch (e) {
      console.log(e);
    }
  }

  get indicator() {
    return Math.round((this.currentTick / 30) * 1000) / 10;
  }
  get timeToEnd() {
    return 30 - this.currentTick;
  }

  startTest() {
    const es = new EventSource(`${BaseAPIURL}/api/v1/test-line`, {
      withCredentials: true
    });
    es.onmessage = ev => {
      console.log("evdata--->", ev.data);

      const data = JSON.parse(ev.data);
      if (data.type === "complete") {
        this.setCompleted(data.result);
        es.close();
      }

      if (data.type === "tick") {
        this.currentTick = Number(data.tick) + 1;
      }
      return null;
    };
    es.onerror = err => {
      es.close();
      console.log("error server event ---> ", err);
      this.pending = false;
    };

    this.setStarted();
  }
  async reset() {
    try {
      const { data } = await axios.get("/test-reset", {
        withCredentials: true
      });
      if (data.result) this.setReseted();
    } catch (e) {
      console.log(e);
    }
  }
  setStarted() {
    this.pending = true;
  }
  setCompleted(result: number) {
    this.testResult = result;
    this.completed = true;
    this.pending = false;
    this.currentTick = 0;
  }
  setReseted() {
    this.completed = false;
    this.testResult = 0;
  }
}
</script>
<style>
.jjj {
  background: #282;
  height: 8px;
  transition: width 1.1s linear;
}
</style>
