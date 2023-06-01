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

export let url = "/";

</script>

<Router {url}>
  <div>
    <Route path="/UP2CLONE" component={UP2CLONE} />
    <Route path="/UP2DATA" component={UP2DATA} />
    <Route path="/UP2AI" component={UP2AI} />
    <Route path="/UP2LEARN" component={UP2LEARN} />
    <Route path="/UP2CLONE/MONITOR" component={UP2CLONEMONITOR} />
    <Route path="/UP2CLONE/BUILD" component={UP2CLONEBUILD} />
    <Route path="/UP2CLONE/AUTH" component={UP2CLONEAUTH} />
    <Route path="/UP2DATA/MONITOR" component={UP2DATAMONITOR} />
    <Route path="/UP2DATA/BUILD" component={UP2DATABUILD} />
    <Route path="/" component={HOME}/>
  </div>
</Router>

<style>
</style>