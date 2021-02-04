<template>
  <div class="container">
    <!-- /.row --> 
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Product Items</h3>

            <div class="card-tools">
              <button
                class="btn btn-success"
                @click="openModal"
              >
                Add New Product
              </button>
            </div>
          </div>
          <!-- /.card-header -->
          <div class="card-body table-responsive p-0">
            <table class="table table-hover">
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th>Cost Price</th>
                  <th>Unit Price</th>
                  <th>Re Order Level</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="product in products" :key="product.id">
                  <td>{{ product.Item_Name }}</td>
                 
                  <td>{{ product.Cost_Price }}</td>
                  <td>{{ product.Unit_Price }}</td>
                  <td>{{ product.Preorder_Level }}</td>
                  
                  <td>
                    <a href="#" @click="updateUserModal(user)"> Edit <i class="fa fa-edit fa"></i> </a> |
                    <a href="#" @click="deleteUser(user.id)">
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
            <h5 class="modal-title" v-show="!editmode" id="userModalLabel">Add new User</h5>
            <h5 class="modal-title" v-show="editmode" id="userModalLabel">Update User</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          <form @submit.prevent="editmode ? updateUser() : createUser()">
            <div class="modal-body">
              <div class="form-group">
                <input
                  v-model="form.name"
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
                  v-model="form.email"
                  type="email"
                  name="email"
                  placeholder="Email"
                  class="form-control"
                  :class="{ 'is-invalid': form.errors.has('email') }"
                />
                <has-error :form="form" field="email"></has-error>
              </div>

              <div class="form-group">
                <input
                  v-model="form.bio"
                  type="text"
                  name="bio"
                  id="bio"
                  placeholder="Add simple Bio"
                  class="form-control"
                  :class="{ 'is-invalid': form.errors.has('bio') }"
                />
                <has-error :form="form" field="bio"></has-error>
              </div>

              <div class="form-group">
                <select
                  v-model="form.type"
                  name="type"
                  id="type"
                  placeholder="Name"
                  class="form-control"
                  :class="{ 'is-invalid': form.errors.has('type') }"
                >
                  <has-error :form="form" field="name"></has-error>
                  <option value="">Select User Role</option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                  <option value="author">Author</option>
                </select>
              </div>

              <div class="form-group">
                <input
                  v-model="form.password"
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  class="form-control"
                  :class="{ 'is-invalid': form.errors.has('password') }"
                />
                <has-error :form="form" field="password"></has-error>
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

      products: {},

      form: new Form({
        id: "",
        name: "",
        email: "",
        password: "",
        type: "",
        bio: "",
        photo: "",
      }),
    };
  },
  methods: {
    updateUser(id) {
      this.$Progress.start();
      this.form.put("api/user/"+this.form.id).then(() => {
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
    updateUserModal(user) {
      this.editmode = true;
      this.form.reset();
        $("#userModal").modal("show");
        this.form.fill(user);
    },

    loadProducts() {
      axios.get("api/product").then(({ data }) => (this.products = data ));
    },
    createUser() {
      this.$Progress.start();

      this.form
        .post("api/user")
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

    deleteUser(id) {
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
            .delete("api/user/" + id)
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
    this.loadProducts();
    Fire.$on("AfterCreated", () => {
      this.loadProducts();
    });
  },
};
</script>
