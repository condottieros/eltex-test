<template>
  <div>popup</div>
</template>
<script lang="ts">
import { Vue, Component, Emit } from "vue-property-decorator";

@Component({})
export default class Popup extends Vue {
  @Emit()
  public clicked() {
    return true;
  }
}
</script>
