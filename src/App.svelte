<script lang="ts">
// VPN FOR DEPLOYNG
// https://www.softether.org/


import { Router, Route, navigate } from "svelte-routing";
import UP2CLONE from "./routes/up2clone/Up2CloneMain.svelte"
import UP2DATA from "./routes/up2data/Up2DataMain.svelte"
import UP2AI from "./routes/up2ai/Up2AiMain.svelte"
import UP2LEARN from "./routes/up2learn/Up2LearnMain.svelte"
import HOME from "./routes/Home.svelte"
import UP2CLONEMONITOR from "./routes/up2clone/monitor/Up2CloneMonitor.svelte" 
import UP2CLONEBUILD from "./routes/up2clone/build/Up2CloneBuild.svelte" 
import UP2CLONEAUTH from "./routes/up2clone/auth/Up2CloneAuth.svelte" 
import UP2DATAMONITOR from "./routes/up2data/monitor/Up2DataMonitor.svelte" 
import UP2DATABUILD from "./routes/up2data/build/Up2DataBuild.svelte" 
import UP2DATACONF from "./routes/up2data/configuration/Up2DataConfiguration.svelte" 
import UP2DATADEPLOY from "./routes/up2data/deploy/Up2DataDeploy.svelte" 
import UP2ADMINLOG from "./routes/up2admin/Up2AdminLog.svelte"

import { register,init, getLocaleFromNavigator, _  } from 'svelte-i18n';
import {dataNavigation, cloneNavigation, clonegraphmenuoptions, clonesubmenuoptions, datagraphmenuoptions} from '../src/lib/ustore.js'
import { onMount} from "svelte";

register('en', () => import('../src/lib/i18n/en.json'));
register('it', () => import('../src/lib/i18n/it.json'));

export let url = "/";

const localizeNavigation = ()=>{
    // Localize Clone Navigation
    for(let i=0; i< $cloneNavigation.length; i++){
        switch($cloneNavigation[i].name){
            case 'MONITOR':
                $cloneNavigation[i].name = $_('up2clone_nav_monitor')
                break;
            case 'BUILD':
                $cloneNavigation[i].name = $_('up2clone_nav_build')
                break;
            case 'AUTHORIZATION':
                $cloneNavigation[i].name = $_('up2clone_nav_auth')
                break
        }
    }
    // Localize Data Navigation
    for(let i=0; i< $dataNavigation.length; i++){
        switch($dataNavigation[i].name){
            case 'MONITOR':
                $dataNavigation[i].name = $_('up2data_nav_monitor')
                break;
            case 'BUILD':
                $dataNavigation[i].name = $_('up2data_nav_build')
                break;
            case "CONFIGURATION":
                /*for(let j=0;j<$dataNavigation[i].subnav.length;j++){
                    switch($dataNavigation[i].subnav[j].name){
                        case "DEVICE":
                            $dataNavigation[i].subnav[j].name =  $_('up2data_nav_conf_device')
                            break;
                        case "AGENT":
                            $dataNavigation[i].subnav[j].name =  $_('up2data_nav_conf_agent')
                            break;
                    }
                }*/
                $dataNavigation[i].name = $_('up2data_nav_conf')
                break;
             case 'DEPLOY':
                $dataNavigation[i].name = $_('up2data_nav_deploy')
                break;
        }
    }
}

const localizeGraphContext = ()=>{
    for(let i=0; i< $clonegraphmenuoptions.length; i++){
        switch($clonegraphmenuoptions[i].id){
            case 'context-menu-master-node':
                $clonegraphmenuoptions[i].name = $_('up2clone_build_context_monitor')
                break;
            case 'context-menu-phase-node':
                $clonegraphmenuoptions[i].name = $_('up2clone_build_context_phase')
                break;
        }
    }
    for(let i=0; i< $clonesubmenuoptions.length; i++){
        switch($clonesubmenuoptions[i].id){
            case 'context-menu-operation-node':
                $clonesubmenuoptions[i].name = $_('up2clone_build_context_op')
                break;
            case 'context-menu-choice-node':
                $clonesubmenuoptions[i].name = $_('up2clone_build_context_choice')
                break;
        }
    }
    for(let i=0; i< $datagraphmenuoptions.length; i++){
        switch($datagraphmenuoptions[i].id){
            case 'context-menu-isa-node':
                $datagraphmenuoptions[i].name = $_('up2data_build_context_node')
                break;
        }
    }
}

 onMount(async () => {  
     await init({
        fallbackLocale: 'en',
        initialLocale: "it",
        //initialLocale:getLocaleFromNavigator()
        })
    localizeNavigation()
    localizeGraphContext()
 })

</script>

<Router {url}>
  <div>
    <Route path="/UP2CLONE" component={UP2CLONE} />
    <Route path="/UP2DATA" component={UP2DATA} />
    <Route path="/UP2AI" component={UP2AI} />
    <Route path="/UP2LEARN" component={UP2LEARN} />
    <Route path="/UP2ADMIN/LOG" component={UP2ADMINLOG} />
    <Route path="/UP2CLONE/MONITOR" component={UP2CLONEMONITOR} />
    <Route path="/UP2CLONE/BUILD" component={UP2CLONEBUILD} />
    <Route path="/UP2CLONE/AUTH" component={UP2CLONEAUTH} />
    <Route path="/UP2DATA/MONITOR" component={UP2DATAMONITOR} />
    <Route path="/UP2DATA/BUILD" component={UP2DATABUILD} />
    <Route path="/UP2DATA/CONFIGURATION" component={UP2DATACONF} />
    <Route path="/UP2DATA/DEPLOY" component={UP2DATADEPLOY} />
    <Route path="/" component={HOME}/>
  </div>
</Router>

<style>
</style>