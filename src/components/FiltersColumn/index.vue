<template>
  <el-dialog title="选择展示列表" :visible.sync="dialogVisible" width="500px" @close="close">
    <draggable v-model="sortList" @change="onSortChange">
      <transition-group>
        <div class="sort-container" v-for="item in sortList" :key="item.prop">
          <div class="sort-warpper">
            <el-checkbox
              :disabled="item.disabled"
              @change="onChange(item)"
              v-model="item.checked"
              :label="item.label"
            ></el-checkbox>
          </div>
        </div>
      </transition-group>
    </draggable>
    <span slot="footer" class="dialog-footer">
      <el-button size="mini" @click="close">取 消</el-button>
      <el-button size="mini" type="primary" @click="comform">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import draggable from "vuedraggable";
export default {
  name: "filterColumn",
  props: {
    columnList: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  components: {
    draggable
  },
  data() {
    return {
      dialogVisible: true,
      sortList: [],
      checkList: []
    };
  },
  methods: {
    onChange(value) {
      const findIndex = this.checkList.findIndex(
        item => item.prop === value.prop
      );
      if (findIndex > -1) {
        this.checkList.splice(findIndex, 1);
      } else {
        this.checkList.push(value);
      }
      this.checkList = this.sortable(this.sortList, this.checkList);
    },
    onSortChange() {
      this.checkList = this.sortable(this.sortList, this.checkList);
    },
    sortable(sortList, checkList) {
      let temp = [];
      sortList.forEach(item => {
        item.time = Date.now();
        const findTemp = checkList.find(sub => item.prop === sub.prop);
        if (findTemp) {
          temp.push(findTemp);
        }
      });
      return temp;
    },
    initChecked() {
      this.checkList = this.sortList.filter(item => {
        return item.checked === true;
      });
    },
    comform() {
      localStorage.setItem(
        `columns-${this.$parent.$options.name}`,
        JSON.stringify({
          checkList: this.checkList,
          sortList: this.sortList
        })
      );
      this.$emit("comform", this.checkList, this.sortList);
      this.close();
    },
    close() {
      this.dialogVisible = false;
      this.$emit("close");
    }
  },
  created() {
    this.sortList = this.columnList;
    this.initChecked();
  },
  watch: {
    columnList(value) {
      this.sortList = value;
    }
  }
};
</script>

<style lang="scss" scoped>
.sort-container {
  display: inline-block;
  .sort-warpper {
    margin-right: 15px;
    margin-bottom: 15px;
  }
}
</style>