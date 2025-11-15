import toast from "react-hot-toast";
import { create } from "zustand";
import axiosInstance from "../services/axios";

const useOperatorsStore = create((set) => ({
    operators: null,
    isFetchingAllOperators: false,

    getAllOperators: async () => {
        set({ isFetchingAllOperators: true })
        try {
            const res = await axiosInstance.get("/operators/getAllOperators")
            set({ isFetchingAllOperators: false, operators: res.data?.data })
            toast.success(res.data.message)
        } catch (error) {
            toast.error("error signing up")
        } finally {
            set({ isFetchingAllOperators: false })
        }
    },
}))

export default useOperatorsStore