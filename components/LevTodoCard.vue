<template>
  <div class="card-container">
    <h5>{{ todo.description }}</h5>
    <div class="pill-container">
      <div class="pill">
        <NuxtIcon name="ph-person-simple-bold" />
        <span>{{ todo.assignee }}</span>
      </div>
      <div class="pill">
        <NuxtIcon name="ph-calendar-minus" />
        <span>{{ dateFormatted }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Todo } from "~/types";
const props = defineProps<{
  todo: Todo;
}>();

const dateFormatted = computed(() => {
  const date = new Date(props.todo.dueDateTime);

  let hours = date.getHours().toString();
  if (hours.length === 1) {
    hours = `0${hours}`;
  }

  let minutes = date.getMinutes();

  const minutesFormatted = minutes < 10 ? `0${minutes}` : minutes.toString();

  return `${date.toDateString()} / ${hours}:${minutesFormatted}`;
});
</script>

<style lang="scss" scoped>
.pill {
  background-color: #eee;
  padding: 0.5rem 1rem;
  margin-right: 1rem;
  border-radius: 10rem;
  color: #555;
  & .nuxt-icon {
    margin-right: 5px;
  }
}

.pill-container {
  display: flex;
}

.card-container {
  padding: 1rem;
  border: 1px solid #eee;
  border-left: 5px solid #175dc7;
  border-radius: 0.5rem;
}
h5 {
  color: #333;
  font-size: 1.2rem;
  font-weight: 600;
  //
  margin-bottom: 1rem;
  margin-top: 0;
}
</style>
