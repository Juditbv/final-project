import { defineStore } from "pinia";
import { supabase } from "../supabase";
import { useUserStore } from "./user";

export const useTaskStore = defineStore("tasks", {
  state: () => ({
    tasks: [],
  }),
  actions: {
    async fetchTasks() {
      const { data: tasks } = await supabase
        .from("tasks")
        .select("*")
        .order("id", { ascending: false });
      this.tasks = tasks;
      return this.tasks;
    },
    // New code
    async addTask(title, description, priority) {
      console.log(useUserStore().user.id);
      const { data, error } = await supabase.from("tasks").insert([
        {
          user_id: useUserStore().user.id,
          title: title,
          is_complete: false,
          description: description,
          priority: priority,
        },
      ]);
    },

    async deleteTask(id) {
      const { data, error } = await supabase
        .from("tasks")
        .delete()
        .match({ id: id });
    },

    async toggleCompleteTask(id, currStatus) {
      const { data, error } = await supabase
        .from("tasks")
        .update({ is_complete: !currStatus })
        .match({ id: id });
    },

    async updateTask(id, newTitle, newDesc, newPrio) {
      const { data, error } = await supabase
        .from("tasks")
        .update({
          title: newTitle,
          description: newDesc,
          priority: newPrio,
        })
        .match({ id: id });
    },
  },
});
