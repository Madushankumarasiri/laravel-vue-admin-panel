<template>
  <div class="container">
    <!-- /.row --> 
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Categories</h3>

            <div class="card-tools">
              <button
                class="btn btn-success"
                @click="openModal"
              >
                Add New Category
              </button>
            </div>
          </div>
          <!-- /.card-header -->
          <div class="card-body table-responsive p-0">
            <table class="table table-hover">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Modify</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="category in categories" :key="category.Cat_ID">
                  <td>{{ category.Category_ID }}</td>
                  <td>{{ category.Category_Name }}</td>
                  <td>{{ category.Description }}</td>
                  
                  <td>
                    <a href="#" @click="updateCategoryModal(category)"> Edit <i class="fa fa-edit fa"></i> </a> |
                    <a href="#" @click="deleteCategory(category.Category_ID)">
                      Delete <i class="fa fa-trash fa red"></i>
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <!-- /.card-body -->
        </div>
        <!-- /.card -->
      </div>
    </div>

    <!--modal -->

    <div
      class="modal fade"
      id="categoryModel"
      tabindex="-1"
      role="dialog"
      aria-labelledby="categoryModelLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" v-show="!editmode" id="categoryModelLabel">Add new Category</h5>
            <h5 class="modal-title" v-show="editmode" id="categoryModelLabel">Update Category</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          <form @submit.prevent="editmode ? updateCategory() : createCategory()">
            <div class="modal-body">
              <div class="form-group">
                <input
                  v-model="form.Category_ID"
                  type="text"
                  name="Category_ID"
                  placeholder="Category Id"
                  class="form-control"
                  :class="{ 'is-invalid': form.errors.has('Category_ID') }"
                />
                <has-error :form="form" field="Category_ID"></has-error>
              </div>
              <div class="form-group">
                <input
                  v-model="form.Category_Name"
                  type="text"
                  name="name"
                  placeholder="Name"
                  class="form-control"
                  :class="{ 'is-invalid': form.errors.has('name') }"
                />
                <has-error :form="form" field="name"></has-error>
              </div>

              <div class="form-group">
                <input
                  v-model="form.Description"
                  type="description"
                  name="description"
                  placeholder="Description"
                  class="form-control"
                  :class="{ 'is-invalid': form.errors.has('description') }"
                />
                <has-error :form="form" field="description"></has-error>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button v-show="editmode" type="submit" class="btn btn-warning">
                Save changes
              </button>
              <button v-show="!editmode" type="submit" class="btn btn-success">
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Form from "vform";

export default {
  data() {
    
    return {
      editmode: true,

      categories: {},

      form: new Form({
        Category_ID: "",
        Category_Name: "",
        Description: "",
      }),
    };
  },
  methods: {
    updateCategory(Category_ID) {
      this.$Progress.start();
      this.form.put("api/category/"+this.form.Category_ID).then(() => {
        $("#categoryModel").modal("hide");
          Swal.fire("Updated!", "The Category has been updated.", "success");
      this.$Progress.finish();
      Fire.$emit("AfterCreated");
      }).catch(()=> {
        this.$Progress.fail();
      });
    },

    openModal() {
      this.editmode = false;
      this.form.reset(); 
        $("#categoryModel").modal("show");
    },
    updateCategoryModal(category) {
      this.editmode = true;
      this.form.reset();
        $("#categoryModel").modal("show");
        this.form.fill(category);
    },

    loadCategories() {
      axios.get("api/category").then(({ data }) => (this.categories = data ));
      //axios.get("api/category").then(({ data }) => ( console.log(data)));
    },
    createCategory() {
      this.$Progress.start();

      this.form
        .post("api/category")
        .then(() => {
          Fire.$emit("AfterCreated");

          $("#categoryModel").modal("hide");

          Toast.fire({
            icon: "success",
            title: "Category Added successfully",
          });
          this.$Progress.finish();
        })
        .catch(() => {});
    },

    deleteCategory(Category_ID) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        //send request to the server
        if (result.isConfirmed) {
          this.form
            .delete("api/category/" + Category_ID)
            .then(() => {
              {
                Swal.fire("Deleted!", "Your file has been deleted.", "success");
              }
              Fire.$emit("AfterCreated");
            })
            .catch(() => {
              Swal.fire("Failed!", "Something went wrong", "warning");
            });
        }
      });
    },
  },

  created() {
    this.loadCategories();
    Fire.$on("AfterCreated", () => {
      this.loadCategories();
    });
  },
};
</script>
