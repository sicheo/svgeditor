<script lang="ts">
// https://echarts.apache.org/en/index.html
//import "@carbon/styles/css/styles.css";
import "@carbon/charts/styles.css";
import { LineChart} from "@carbon/charts-svelte";


export let component:any = LineChart
export let data:any
export let options:any



</script>

	<div id="svelte-chart-viewer">
		<svelte:component this={component} bind:data={data} bind:options={options}/>
	</div>
<style>
</style>