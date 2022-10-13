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
    async fetchTasksPriority() {
      const { data: tasks } = await supabase
        .from("tasks")
        .select("*")
        .order("priority", { ascending: false })
        .order("id", { ascending: false });
      this.tasks = tasks;
      return this.tasks;
    },
    //filters
    async filterPriority(number) {
      let query = supabase.from("tasks").select("*");
      if (number === "3") {
        query = query.eq("priority", 3);
      }
      if (number === "2") {
        query = query.eq("priority", 2);
      }
      if (number === "1") {
        query = query.eq("priority", 1);
      }
      if (number === "0") {
        query = query.order("id", { ascending: false });
      }

      const { data: tasks } = await query;
      this.tasks = tasks;
      return this.tasks;
    },
    // New code
    async addTask(title, description, priority) {
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

    async updateTask(id, payload) {
      const { data, error } = await supabase
        .from("tasks")
        .update(payload)
        .match({ id: id });
    },
  },
});
