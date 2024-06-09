import type { Todo } from "~/types";

type TodoFetchResponse = {
  todo: Todo;
};

export const useGlobalStore = defineStore("globalStore", () => {
  const config = useRuntimeConfig();
  const loading = ref(false);
  const todos = ref<Todo[]>([]);
  const updateStatus = ref("");

  const startLoader = (): void => {
    loading.value = true;
  };
  const stopLoader = (): void => {
    loading.value = false;
  };

  const refreshTodos = async (): Promise<void> => {
    try {
      const response = await $fetch<TodoFetchResponse>(config.public.api_url, {
        method: "GET",
        headers: {
          "x-api-key": config.public.api_token,
        },
      });

      const todo = response.todo;
      const duplicateEntryExists = todos.value.some(
        (todoItem) => todoItem.id === todo.id
      );

      if (!duplicateEntryExists) {
        todos.value.push(todo);
        updateStatus.value = "Er is 1 nieuwe todo";
      } else {
        updateStatus.value = "Geen nieuwe todo's gevonden";
      }
    } catch (error) {
      console.error(error);
      updateStatus.value = "er ging iets fout bij het ophalen van todo's";
    } finally {
      setTimeout(() => {
        updateStatus.value = "";
      }, 3500);
    }
  };

  return {
    loading,
    todos,
    refreshTodos,
    startLoader,
    stopLoader,
    updateStatus,
  };
});
