<template>
    <div class="login">
        <v-row>
            <v-col>
                <v-img class="image" src="../assets/logo.svg"/>
            </v-col>
        </v-row>      
        <v-row no-gutters>
            <v-col>
                <v-text-field
                class="textfield"
                clearable
                id="signIn-username-textfield"
                label="Benutzername"/>
            </v-col>
        </v-row>
        <v-row no-gutters>
            <v-col>
                <v-text-field
                class="textfield"
                clearable
                id="signIn-password-textfield"
                label="Passwort"
                append-icon="mdi-eye"/>
            </v-col>
        </v-row>
        <v-row no-gutters>
            <v-col></v-col>
            <v-col style="justify-content: center;text-align:center">
                <v-btn class="loginButton">
                    <router-link class="link" :to="`/home?sort=asc`" >Login</router-link>
                </v-btn>
                   
            </v-col>
            <v-col></v-col>
        </v-row> 
    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.login{
    height: 100vh;
    width: 100%;
    & .row{
        margin-top: 50px;
        & .col{
            display: grid;
            justify-content: center;
            align-content: center;            
            & .image{
                height: 300px;
                width: 300px;
            }
            & .textfield{
                width: 300px;
            }
            & .loginButton{
                & .link{
                    text-decoration: none;
                }
            }
        }
    }
}

</style>