<template>
  <div>
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
                <v-col></v-col>
              </v-row>
          </v-card>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data: () => ({
    text: '',
  }),
}
</script>