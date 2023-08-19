<script lang="ts">
import * as echarts from "echarts";

export let data:any
export let options:any
export let component:any

let myChart:any 
const drawChart = (node:any,data:any)=>{
        console.log("SVELTE ECHART",node)
	    myChart = echarts.init(node);
         console.log("SVELTE ECHART",node,myChart)
      // Specify the configuration items and data for the chart
      var option = {
        title: {
          text: 'ECharts Getting Started Example'
        },
        tooltip: {},
        legend: {
          data: ['sales']
        },
        xAxis: {
          data: ['Shirts', 'Cardigans', 'Chiffons', 'Pants', 'Heels', 'Socks']
        },
        yAxis: {},
        series: [
          {
            name: 'sales',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
          }
        ]
      };

      // Display the chart using the configuration items and data just specified.
      myChart.setOption(option);

      return {
         update: (newParams) => {
              console.log("SVELTE ECHART UPDATEA",newParams)
             myChart.setOption(option);
         },
    }

}
</script>

    <div id="svelte-chart-viewer" use:drawChart={{data:data}} />

<style>
#svelte-chart-viewer{
    width: 800px;
    height: 300px;
    border: 1px solid;
}
</style>
