<template>
  <v-overlay>
    <div class="contn">
      <div>
        <h1>Change your anonymity</h1>
      </div>
      <div>
        <h2>Step 1 Verify your email</h2>
        <p>An email will be sent to you with a code, use it in step 2 to authenticate your name change</p>
        <v-text-field id="email-tf"       persistent-hint
                       hint="first.last@mail.mcgill.ca" v-model="email"></v-text-field><v-btn v-on:click="verify">Send Verification Email</v-btn>
      </div>
      <div>
        <h2>Step 2 Change your name</h2>
        <p>Enter your email, token, and the name you would like displayed. Leave blank for a random name.</p>
        <v-text-field id="email-tf" hint="first.last@mail.mcgill.ca"  v-model="email"     persistent-hint
        ></v-text-field>
        <v-text-field id="token-tf" hint="Verification Token"   v-model="token"    persistent-hint
        ></v-text-field>
        <v-text-field id="newname-tf" hint="New Name" v-model="newName" persistent-hint></v-text-field>
        <v-btn v-on:click="changeName">Set Name!</v-btn>
      </div>
      <v-btn v-on:click="modalClose">Close</v-btn>
    </div>

  </v-overlay>

</template>

<script>
export default {
  name: "DeAnonymize",
  data(){
    return{
      email:"",
      newName:"",
      token:""
    }
  },
  methods: {
    modalClose: function() {
      this.$emit("modalClose");
    },
    verify: async function() {
      const data = {
        email: this.email,
      };
      this.$emit("verify", data);
    },
    changeName: function () {
      const data = {
        email: this.email,
        newName: this.newName,
        token: this.token,
      }
      this.$emit("changeName",data)
    }
  },
}
</script>

<style scoped>
.contn{
  background: rgba(0,0,0,0.5);
  border-radius: 20px;
  padding: 20px;
}

.contn div h1, h2, h3, p{
  display: block;
  left: unset;
  text-align: center;
  right: unset;
  color: white;
  float: unset;
  clear: unset;
}

.contn div{
  margin-bottom: 30px;
}

</style>