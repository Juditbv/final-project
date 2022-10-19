import { defineStore } from "pinia";
import { supabase } from "../supabase";
import { useUserStore } from "./user";

export const useTaskStore = defineStore("tasks", {
  state: () => ({
    tasks: [],
    dates: [],
  }),
  actions: {
    async fetchTasks() {
      const { data: tasks } = await supabase
        .from("tasks")
        .select("*")
        .order("inserted_at", { ascending: false });
      this.tasks = tasks;
      return this.tasks;
    },

    async fetchTasksPriority() {
      const { data: tasks } = await supabase
        .from("tasks")
        .select("*")
        .order("priority", { ascending: false })
        .order("inserted_at", { ascending: false });
      this.tasks = tasks;
      return this.tasks;
    },
    //filters
    async filterTasks(number, date, ordertasks) {
      let query = supabase.from("tasks").select("*");

      if ((number || date) && number === "3" && date !== "all" && ordertasks) {
        query = query
          .eq("priority", 3)
          .eq("date_plain", date)
          .order(ordertasks, { ascending: false });
      }
      if ((number || date) && number === "3" && date === "all" && ordertasks) {
        query = query.eq("priority", 3).order(ordertasks, { ascending: false });
      }
      if ((number || date) && number === "2" && date !== "all" && ordertasks) {
        query = query
          .eq("priority", 2)
          .eq("date_plain", date)
          .order(ordertasks, { ascending: false });
      }
      if ((number || date) && number === "2" && date === "all" && ordertasks) {
        query = query.eq("priority", 2).order(ordertasks, { ascending: false });
      }
      if ((number || date) && number === "1" && date !== "all" && ordertasks) {
        query = query
          .eq("priority", 1)
          .eq("date_plain", date)
          .order(ordertasks, { ascending: false });
      }
      if ((number || date) && number === "1" && date === "all" && ordertasks) {
        query = query.eq("priority", 1).order(ordertasks, { ascending: false });
      }
      if ((number || date) && number === "0" && date === "all" && ordertasks) {
        query = query.order(ordertasks, { ascending: false });
      }
      if ((number || date) && number === "0" && date !== "all" && ordertasks) {
        query = query
          .eq("date_plain", date)
          .order(ordertasks, { ascending: false });
      }

      const { data: tasks } = await query;
      this.tasks = tasks;
      return this.tasks;
    },

    async fetchOnlyDates() {
      const { data: dates } = await supabase
        .from("tasks")
        .select("date_plain")
        .order("id", { ascending: false });

      const formatedDates = [];
      dates.forEach(date => {
        formatedDates.push(date.date_plain);
      });
      const noRepeatedDates = new Set(formatedDates);
      this.dates = noRepeatedDates;
      this.noRepeatedDates = dates;
      return this.dates;
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
