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
                    label="Benutzername"></v-text-field>
                </v-col>
              </v-row>
              <v-row no-gutters>
                <v-col>
                  <v-text-field
                    clearable
                    label="Passwort"
                    append-icon="mdi-eye"></v-text-field>
                </v-col>
              </v-row>
              <v-row no-gutters>
                <v-col></v-col>
                <v-col style="justify-content: center;text-align:center">
                  <v-btn                
                    href="/cookbookview"
                    class="loginButton">Login</v-btn>
                </v-col>
                <v-col>
                  <v-btn                
                    @click="login"
                    class="loginButton">test</v-btn>
                </v-col>
              </v-row>
          </v-card>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import helper from '@/Helper/dataController'
export default {
  data: () => ({
    text: '',
  }),
  methods:{
     async login(){
        var authorized = await helper.getLogin();
          if(authorized == true){
            setTimeout(function() {window.location.href = "/cookbookview"},1000);
          } else{
            console.log("falsch");
          }      
     },
  }
}
</script>