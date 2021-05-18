<template>
  <div class="signIn-view">
    <v-row>
      <v-col>
        <v-row>
          <v-card class="signInCard">
              <v-row no-gutters>
                <v-col style="justify-content:center; text-align:center">
                  <img src="../assets/logo.png">
                </v-col>
              </v-row>
              <v-row no-gutters>
                <v-col>
                  <v-text-field
                    clearable
                    id="signIn-username-textfield"
                    label="Benutzername"/>
                </v-col>
              </v-row>
              <v-row no-gutters>
                <v-col>
                  <v-text-field
                    clearable
                    id="signIn-password-textfield"
                    label="Passwort"
                    append-icon="mdi-eye"/>
                </v-col>
              </v-row>
              <v-row no-gutters>
                <v-col></v-col>
                <v-col style="justify-content: center;text-align:center">
                  <v-btn                
                    @click="login"
                    class="loginButton">Login</v-btn>
                </v-col>
                <v-col></v-col>
              </v-row>
          </v-card>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import UserController from '@/Helper/Getter/UserController'
export default {
  data: () => ({
    text: '',
  }),
  methods:{
     async login(){
        var user = new Object();
        user.username = document.getElementById("signIn-username-textfield").value;
        user.password = document.getElementById("signIn-password-textfield").value;
        console.log(user);
        var authorized = await UserController.getLogin(user);
          if(authorized == true){
            setTimeout(function() {window.location.href = "/cookbookview"},1000);
          } else{
            console.log("falsch");
          }      
     },
  }
}
</script>