<script lang="ts">
import * as echarts from "echarts";
import { onMount} from "svelte";


export let data:any ={data:[],timestamp:[],title:''}
export let options:any
export let component:any

let myChart:any 
let ldata = []
let labels = []
let title = ""

onMount(async ()=>{
      ldata = JSON.parse(JSON.stringify(data.data))
      labels = JSON.parse(JSON.stringify(data.timestamp))
      title = data.title

    });

const drawChart = (node:any,series:any)=>{
        console.log("SVELTE ECHART",node,series)
	    myChart = echarts.init(node);
         console.log("SVELTE ECHART",node,myChart)
      // Specify the configuration items and data for the chart
      var option = {
        title: {
          text: title
        },
        tooltip: {},
        toolbox: {
            left: 'center',
            itemSize: 25,
            top: 20,
            feature: {
                dataZoom: {
                yAxisIndex: 'none'
                },
                restore: {}
            }
         },
        legend: {
          data: ['sales']
        },
        xAxis: {
          type: 'category',
          data: labels,
        },
        yAxis: {},
        series: [
          {
            name: 'sales',
            type: 'line',
            data: ldata,
            showAllSymbol: true,
            smooth: true
          }
        ]
      };

      // Display the chart using the configuration items and data just specified.
      myChart.setOption(option);

      return {
         update: (newParams) => {
              ldata = JSON.parse(JSON.stringify(newParams.series.data))
              labels = JSON.parse(JSON.stringify(newParams.series.timestamp))
              title = String(newParams.series.title)
              option.title.text=title
              option.series[0].data = ldata
              option.xAxis.data = labels
              console.log("SVELTE ECHART UPDATEA",option,newParams)
             myChart.setOption(option);
         },
    }

}
</script>

    <div id="svelte-chart-viewer" use:drawChart={{series:data}} />

<style>
#svelte-chart-viewer{
    width: 800px;
    height: 300px;
}
</style>
