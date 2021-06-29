<template>
  <v-layout>
          <br/><br/>
    <v-card
  elevation="2"
  shaped
  loading="false">
  <v-card-text>
      <div>Microservice</div>
      <br/>
      <div class="random">
    <trend-chart
      :datasets="datasets"
      :grid="grid"
      :labels="labels"
      :min="0"
      padding="5"
      :interactive="true"
      @mouse-move="onMouseMove"
      class="random-chart"
      v-if="datasets.length"
    ></trend-chart>
    <div id="pop" role="tooltip" ref="tooltip" class="tooltip" :class="{'is-active': tooltipData}">
      <div class="tooltip-container" v-if="tooltipData">
        <strong>{{labels.xLabels[tooltipData.index]}}</strong>
        <div class="tooltip-data">
          <div class="tooltip-data-item tooltip-data-item--1">{{tooltipData.data[0]}}</div>
          <div class="tooltip-data-item tooltip-data-item--2">{{tooltipData.data[1]}}</div>
          <div class="tooltip-data-item tooltip-data-item--3">{{tooltipData.data[2]}}</div>
        </div>
      </div>
    </div>
  </div>
    </v-card-text>
    <v-card-actions>
      <v-col
        class="d-flex"
        cols="12"
        sm="3"
      >
      <v-select
          :items="items"
          label="freeMemoryMB"
          v-on:change="onSelectChange"
          dense
          outlined
        ></v-select>
      </v-col>
      
      <v-col
        class="text-right"
      >
      <div class="text-right">
    <v-chip
      class="ma-2"
      color="#ff00aa"
      text-color="white"
    >
      Client
    </v-chip>
    <v-chip
      class="ma-2"
      color="#000000"
      text-color="white"
    >
      Livreur
    </v-chip>

    <v-chip
      class="ma-2"
      color="#b40f0f"
      text-color="white"
    >
      Restaurateur
    </v-chip>

    <v-chip
      class="ma-2"
      color="#fbe1b6"
    >
      Technique
    </v-chip>

    <v-chip
      class="ma-2"
      color="#947fdf"
      text-color="white"
    >
      Commercial
    </v-chip>

    <v-chip
      class="ma-2"
      color="#fbac91"
      text-color="black"
    >
      Server 2
    </v-chip>

    <v-chip
      class="ma-2"
      color="#7fdfd4"
      text-color="black"
    >
      Server 1
    </v-chip>
  </div>
      </v-col>
    </v-card-actions>
    </v-card>
  </v-layout>
</template>

<script>
/* ============
 * Account Index Page
 * ============
 *
 * Page where the user can view the account information.
 */

  import VLayout from "@/layouts/Default.vue";
  import { http } from "@/config/index.js";
  import Popper from "popper.js";

  export default {
    name: "PerformanceIndex",
    components: {
      VLayout,
    },


    data () {

      return {
        datasets: this.generateDataset(0, 8000),
        grid: {
          verticalLines: true,
          horizontalLines: true
        },

        labels: this.getXlabels(),
        tooltipData: null,
        popper: null,
        popperIsActive: false,

        items: ['freeMemoryMB', 'freeMemoryPercent', 'loadAverage5s', 'totalMemoryMB', 'sysUptime'],
      }
    },


    mounted() {
      this.initPopper();
      //this.generateDataset(0, 1000)
      this.getPerformance();
    },


    methods: {

      getRndInteger(min, max){
        return Math.floor(Math.random() * (max - min) ) + min;
      },


      onSelectChange(v){
        const props = 
          {
            freeMemoryPercent: {min: 0, max: 90},
            totalMemoryMB: {min: 1000, max: 30000},
            sysUptime: {min: 1000000, max: 9999999},
            freeMemoryMB: {min: 0, max: 8000},
            loadAverage5s: {min: 2, max: 8}
          }

        this.datasets = this.generateDataset(props[v].min, props[v].max);      
      },


      /*
        * @GET Xlabels & yLabels.
        * Push last 5 hours.
      */
      

      generateDataset(min, max) {

        let datasets = [];

        for (let i = 0; i < 7; i++) {
          let data = [];

          for (let i = 1; i <= 7; i++) {
            data.push(this.getRndInteger(min, max))
          }

          datasets.push({
            data,
            smooth: true,
            showPoints: true,
            className: "curve"+i
          });
        }

        return datasets;
      },

      /*
        * @GET Xlabels & yLabels.
        * Push last 5 hours.
      */

      getXlabels() {

        let xLabels = [];
        var hour = new Date().getHours()+1; 

        for (let i = 7; i > 0; i--) {
          xLabels.push(hour-i+'h');
        }
        return { xLabels, yLabels: 5, yLabelsTextFormatter: val => Math.round(val * 100) / 100 }
      },

      /* 
      @GET * logs
      */

      getPerformance() {
        http.get('technique/performance/all').then((res) => {
          console.log(res.data)
          //this.logs = res.data;
        }).catch(function(err) {
          // display err
          console.log(err);
        });
        
      },


      initPopper() {
        const chart = document.querySelector(".random-chart");
        const ref = chart.querySelector(".active-line");
        const tooltip = this.$refs.tooltip;
        this.popper = new Popper(ref, tooltip, {
          placement: "right",
          modifiers: {
            offset: { offset: "0,10" },
            preventOverflow: {
              boundariesElement: chart
            }
          }
        });
      },


      onMouseMove(params) {
        this.popperIsActive = !!params;
        this.popper.scheduleUpdate();
        this.tooltipData = params || null;
      }
    },
  };
</script>

<style lang="scss">
.random {
  width: 100%;
  .vtc {
    height: 250px;
    font-size: 12px;
    @media (min-width: 699px) {
      height: 320px;
    }
  }
  .labels {
    stroke: rgba(0, 0, 0, 0.05);
  }
  .active-line {
    stroke: rgba(0, 0, 0, 0.2);
  }
  .point {
    stroke-width: 2;
    transition: stroke-width 0.2s;
  }
  .point.is-active {
    stroke-width: 5;
  }
  .curve1 {
    .stroke {
      stroke: #fbac91;
      stroke-width: 2;
    }
    .fill {
      fill: #fbac91;
      opacity: 0.05;
    }
    .point {
      fill: #fbac91;
      stroke: #fbac91;
    }
  }
  .curve2 {
    .stroke {
      stroke: #fbe1b6;
      stroke-width: 2;
    }
    .point {
      fill: #fbe1b6;
      stroke: #fbe1b6;
    }
  }
  .curve3 {
    .stroke {
      stroke: #7fdfd4;
      stroke-width: 2;
    }
    .point {
      fill: #7fdfd4;
      stroke: #7fdfd4;
    }
  }
  .curve4 {
    .stroke {
      stroke: #947fdf;
      stroke-width: 2;
    }
    .point {
      fill: #947fdf;
      stroke: #947fdf;
    }
  }
    .curve5 {
    .stroke {
      stroke: #b40f0f;
      stroke-width: 2;
    }
    .point {
      fill: #b40f0f;
      stroke: #b40f0f;
    }
  }
    .curve6 {
    .stroke {
      stroke: #000000;
      stroke-width: 2;
    }
    .point {
      fill: #000000;
      stroke: #000000;
    }
  }
    .curve7 {
    .stroke {
      stroke: #ff00aa;
      stroke-width: 2;
    }
    .point {
      fill: #ff00aa;
      stroke: #ff00aa;
    }
  }
  .tooltip {
    &:not(.is-active) {
      display: none;
    }
    padding: 10px;
    background: #fff;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
    pointer-events: none;
    &-data {
      display: flex;
      &-item {
        display: flex;
        align-items: center;
        &:not(:first-child) {
          margin-left: 20px;
        }
        &:before {
          content: "";
          display: block;
          width: 15px;
          height: 15px;
          margin-right: 5px;
        }
        &--1:before {
          background: #fbac91;
        }
        &--2:before {
          background: #fbe1b6;
        }
        &--3:before {
          background: #7fdfd4;
        }
        &--4:before {
          background: #947fdf;
        }
        &--5:before {
          background: #b40f0f;
        }
        &--6:before {
          background: #000000;
        }
        &--7:before {
          background: #ff00aa;
        }
      }
    }
  }
}
</style>
