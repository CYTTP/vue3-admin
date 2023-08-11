import { defineStore } from "pinia";
import { reqC1, reqC2, reqC3 } from "@/api/product/attr";
import { CategoryResponseData } from "@/api/product/attr/type";
import { CategoryState } from "./stateType/type";

//小仓库
const useCategoryStore = defineStore("Category", {
  state(): CategoryState {
    return {
      //存储一级分类的数据
      c1Arr: [],
      //存储一级分类的ID
      c1Id: "",
      //存储对应一级分类下二级分类的数据
      c2Arr: [],
      //收集二级分类的ID
      c2Id: "",
      //存储三级分类的数据
      c3Arr: [],
      //存储三级分类的ID
      c3Id: "",
    };
  },
  actions: {
    //获取一级分类
    async getC1() {
      let res: CategoryResponseData = await reqC1();
      if (res.code == 200) this.c1Arr = res.data;
    },
    //获取二级分类
    async getC2() {
      let res: CategoryResponseData = await reqC2(this.c1Id);
      if (res.code == 200) this.c2Arr = res.data;
    },
    //获取三级分类
    async getC3() {
      let res: CategoryResponseData = await reqC3(this.c2Id);
      if (res.code == 200) this.c3Arr = res.data;
    },
  },
  getters: {},
});

export default useCategoryStore;
