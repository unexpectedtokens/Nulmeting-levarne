<template>
  <div class="page-wrapper">
    <div class="element-wrapper">
      <div class="element-body">
        <div class="table-header">
          <h3>Todos</h3>
          <LevButton @clicked="resfresh">Refresh</LevButton>
        </div>
        <p v-if="updateStatus.length > 0" class="update-status">
          {{ updateStatus }}
        </p>
        <div class="table">
          <div v-if="loading"><LevGlobalLoader /></div>
          <LevTodoCard v-if="!loading" v-for="todo of todos" :todo="todo" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const store = useGlobalStore();

const { loading, todos, updateStatus } = storeToRefs(store);

const { refreshTodos, startLoader, stopLoader } = store;

const resfresh = async () => {
  startLoader();

  await refreshTodos();

  stopLoader();
};

onMounted(() => resfresh());
</script>

<style scoped lang="scss">
.table-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid #eee;
}

.table {
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-bottom: 1rem;
}

.update-status {
  background-color: #a0c2f5;
  color: white;
  padding: 1rem;
  border-radius: 2rem;
}
</style>
