<template>
  <div class="container">
    <!-- /.row --> 
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Employee</h3>

            <div class="card-tools">
              <!-- <button
                class="btn btn-success"
                @click="openModal"
              >
                Add New Employee
              </button> -->
            </div>
          </div>
          <!-- /.card-header -->
          <div class="card-body table-responsive p-0">
            <table class="table table-hover">
              <thead>
                <tr>
                  <th>First Name</th>
                  <th>Email</th>
                  <th>Gender</th>
                  <th>Phone number</th>
                  <th>Hire Date</th>
                  <th>Changes</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="employee in Employees" :key="employee.Cat_ID">
                  <td>{{ employee.Fname }}</td>
                  <td>{{ employee.E_mail }}</td>
                  <td>{{ employee.Gender }}</td>
                  <td>{{ employee.Phone_Num }}</td>
                  <td>{{ employee.Hired_Date }}</td>
                  
                  <td>
                    <a href="#" @click="updateCategoryModal(category)"> Edit <i class="fa fa-edit fa"></i> </a> |
                    <a href="#" @click="deleteCategory(category.Cat_ID)">
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
      id="userModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="userModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" v-show="!editmode" id="userModalLabel">Add new Category</h5>
            <h5 class="modal-title" v-show="editmode" id="userModalLabel">Update Category</h5>
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
                  v-model="form.Cat_ID"
                  type="text"
                  name="id"
                  placeholder="Category Id"
                  class="form-control"
                  :class="{ 'is-invalid': form.errors.has('id') }"
                />
                <has-error :form="form" field="id"></has-error>
              </div>
              <div class="form-group">
                <input
                  v-model="form.Cat_Name"
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

      Employees: {},

      form: new Form({
        Cat_ID: "",
        Cat_Name: "",
        Description: "",
      }),
    };
  },
  methods: {
    updateCategory(Cat_ID) {
      this.$Progress.start();
      this.form.put("api/category/"+this.form.Cat_ID).then(() => {
        $("#userModal").modal("hide");
          Swal.fire("Updated!", "The user has been updated.", "success");
      this.$Progress.finish();
      Fire.$emit("AfterCreated");
      }).catch(()=> {
        this.$Progress.fail();
      });
    },

    openModal() {
      this.editmode = false;
      this.form.reset(); 
        $("#userModal").modal("show");
    },
    updateCategoryModal(category) {
      this.editmode = true;
      this.form.reset();
        $("#userModal").modal("show");
        this.form.fill(category);
    },

    loadEmployees() {
      axios.get("api/employee").then(({ data }) => (this.Employees = data ));
      //axios.get("api/category").then(({ data }) => ( console.log(data)));
    },
    createCategory() {
      this.$Progress.start();

      this.form
        .post("api/category")
        .then(() => {
          Fire.$emit("AfterCreated");

          $("#userModal").modal("hide");

          Toast.fire({
            icon: "success",
            title: "User Added successfully",
          });
          this.$Progress.finish();
        })
        .catch(() => {});
    },

    deleteCategory(id) {
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
            .delete("api/category/" + id)
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
    this.loadEmployees();
    Fire.$on("AfterCreated", () => {
      this.loadEmployees();
    });
  },
};
</script>
