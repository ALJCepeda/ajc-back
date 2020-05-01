import Vue from "vue";
import moment from "moment";
import api from "../../../services/api";

const module = {
  namespaced: true,
  state: {
    manifest: null,
    entries: {},
    content: {}
  },
  getters: {
    manifest(state) {
      return state.manifest;
    },
    entry(state) {
      return id => {
        return state.entries.get(id);
      };
    },
    content(state) {
      return id => {
        return state.content.get(id);
      };
    }
  },
  mutations: {
    manifest(state, manifest) {
      Vue.set(state, "manifest", manifest);
    },
    entry(state, entry) {
      entry.created_at = moment(entry.created_at);
      entry.fromNow = entry.created_at.calendar();
      entry.imageUrl = `${process.env.STATIC_URL}/images/${entry.image}`;
      Vue.set(state.entries, entry.id, entry);
    },
    content(state, { uri, content }) {
      Vue.set(state.content, uri, content);
    }
  },
  actions: {
    manifest({ commit }) {
      return api.get("/blogs/manifest").then(resp => {
        commit("manifest", resp);
        return resp;
      });
    },
    entries({ commit }, ids = []) {
      return api.post("/blogs/entries", ids).then(entries => {
        entries.forEach(entry => commit("entry", entry));

        return Array.from(entries.values()).sort((a, b) => {
          return b.created_at.diff(a.created_at);
        });
      });
    },
    entriesByPage({ dispatch }, page) {
      return api.get("/blogs/entriesByPage", { page, limit: 20 }).then(ids => {
        return dispatch("entries", ids);
      });
    },
    content({ commit }, uri) {
      return api.get(`/blogs/${uri}`).then(resp => {
        commit("content", { uri, content: resp });
        return resp;
      });
    }
  }
};

export default module;
