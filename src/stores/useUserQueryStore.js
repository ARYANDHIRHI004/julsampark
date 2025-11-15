import { create } from "zustand";
import axiosInstance from "../services/axios";
import toast from "react-hot-toast";

const userQueryStore = create((set) => ({
    isSendingQuery: false,
    userQuery: null,
    isFetchingQuery: false,
    userQueryById: null,
    isFetchingQueryById: false,
    allQueries: null,
    isFetchingAllQueries: false,


    submitQuery: async (data) => {
    set({ isSendingQuery: true })
    try {
      const res = await axiosInstance.post("/userQuery/submitQuery", data)
      set({ isSigningUp: false})
      toast.success(res.data.message)
    } catch (error) {
      toast.error("error signing up")
    } finally {
      set({ isSendingQuery: false })
    }
  },
    getPastQuery: async () => {
    set({ isFetchingQuery: true })
    try {
      const res = await axiosInstance.get("/userQuery/getPastQuery")
      set({ isFetchingQuery: false, userQuery: res.data?.data})
      toast.success(res.data.message)
    } catch (error) {
      toast.error("error signing up")
    } finally {
      set({ isFetchingQuery: false })
    }
  },
    getPastQueryById: async (queryId) => {
    set({ isFetchingQueryById: true })
    try {
      const res = await axiosInstance.get(`/userQuery/getPastQueryById/${queryId}`)
      set({ isFetchingQueryById: false, userQueryById: res.data?.data})
      toast.success(res.data.message)
    } catch (error) {
      toast.error("error signing up")
    } finally {
      set({ isFetchingQueryById: false })
    }
  },
    getAllQuery: async () => {
    set({ isFetchingAllQueries: true })
    try {
      const res = await axiosInstance.get(`/userQuery/getAllQuery`)
      set({ isFetchingAllQueries: false, allQueries: res.data?.data})
      toast.success(res.data.message)
    } catch (error) {
      toast.error("error signing up")
    } finally {
      set({ isFetchingAllQueries: false })
    }
  },
    

}));

export default userQueryStore;