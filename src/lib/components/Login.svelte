<script lang="ts">

import {login} from '../script/api.js'
import {navigate} from 'svelte-routing'
import {role,user} from '../ustore.js'

export let userid = ''
export let password = ''
export let target = 'UP2DATA'
export let color = "#007d35"
export let bgcolor = "#d5e8d4"


const handleSubmit=(e)=>{
       let loginFields={userid,password};
       // CALL LOGN API
       login(userid,password,true)
       .then((res:any) =>{
           console.log(res.data)
           $role = res.data.role
           $user = userid
           // CONTROL RESULT
           if(res.error == null){
                navigate(target, {replaceState:true}) 
           }
           else
                console.log(res.error)
       }).catch((err:any) =>{
           // ELSE MANAGE ERROR
           console.log(err)
       })
    }

</script>


    <form class="login-form" on:submit|preventDefault="{handleSubmit}" style="--color:{color}; --background-color:{bgcolor}">
      <input
        class="form-field"
        bind:value="{userid}"
        type="text"
        placeholder="userid"
      />
      <input
        class="form-field"
        bind:value="{password}"
        type="password"
        placeholder="Password"
      />
      <button class="form-field" style="--color:{color}; --background-color:{bgcolor}">
        Login
      </button>
    </form>

<style>

.login-form input{
    width:100%;
    margin-bottom: 10px;
    border: 1px solid var(--color);
    border-radius: 3px ;
}
.login-form input:focus{
    outline:var(--background-color) solid;
}
.login-form button{
   background-color:var(--background-color);
   color: var(--color) ;
}

</style>