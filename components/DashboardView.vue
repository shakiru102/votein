<template>
    <div class="px-10 mt-3 ">
        <v-container class="mb-5">
          <v-row v-if="present"> 
               <v-col cols="3" v-for="(item, index) in dashboardDetails" :key="index">
                   <v-card tile :color="item.color" max-height="147px" flat>
                       <v-card-text class="d-flex justify-space-betwwen">
                           <div class="white--text mr-2">
                               <div class="title font-weight-bold">{{ item.no }}</div>
                               <div class="subtitle-1 font-weight-bold">No of</div>
                               <div class="subtitle-1 font-weight-bold">{{ item.title }}</div>
                           </div>
                           <v-img class="ml-2" contain width="80px" height="80px" :src="require(`@/assets/${ item.img }.png`)"></v-img>
                       </v-card-text>
                           <v-btn elevation="0" tile :color="item.btncolor" :to="item.to"  block dark class="text-capitalize">more info</v-btn>
                   </v-card>
               </v-col>
              </v-row>            
        </v-container>
        <v-carousel v-if="$store.state.user.super" hide-delimiters hide-delimiter-background cycle show-arrows-on-hover height="100%" >
            <v-carousel-item
            v-for="(item, index) in position"
            :key="index"
            >
            <highchart :options="barChartData(item.position)" />
            </v-carousel-item>
        </v-carousel>
        <div v-else>
     <v-card  class="pa-5 mx-3" flat tile color ="#F9FDFA" v-if ="electionTitle"> 
        <v-card-text>
            <p>
                Information is necessary for efficient functioning in every sphere of human endeavour. For the  {{ electionTitle.electionDate }} Elections in particular, some basic information can be helpful in understanding and interpreting the processes. This compendium is designed to provide such basic information.
            </p>
            <p>
                The Information is a compilation of electoral information about when the Student Representative Council Elections will be conducted. These bits of information will be useful for anyone wishing to follow and understand the polling process. It is hoped that voters, media professionals and election observers, among others, will find this information handy in understanding the processes of the general election.
            </p>
            <p>
                The {{ electionTitle.electionDate }} SRC will kick off on:
            </p>
            <p style="color: #039058; font-size: 22px; font-weight: 600">{{ electionTitle.date || '25th of July, 2022 ' }}at {{ electionTitle.time || '10:00'}}am</p>
            <p style="font-weight: 600">{{ electionTitle.admin || 'Tiamiyu Mubarak O.' }}<br/><span style="font-weight: normal;">admin</span> </p>
        </v-card-text>
     </v-card>
    </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, useContext } from '@nuxtjs/composition-api'
import { candidateDetails, dashboardDetails, editPosition, userDetails, usersVote } from '~/types/interface'

export default defineComponent({
    setup() {
        const position = ref<editPosition[]>([])
        const candidate = ref<candidateDetails[]>([])
        const voter = ref<userDetails[]>([])
        const votes = ref<usersVote[]>([])
        const present = ref<boolean>(false)
        const chartVotes = ref<editPosition[]>([])

            const electionTitle = ref<any>()
      

        const dashboardDetails = ref<dashboardDetails[]>([
            { title: 'Positions', color: '#1ABEDB', btncolor: '#317A88', no: 0, to: '/admin/positions', img: 'Group15' },
            { title: 'Candidates', color: '#05F595', btncolor: '#0A9C62', no: 0, to: '/admin/candidates', img: 'whh_details' },
            { title: 'Voters', color: '#F51D7C', btncolor: '#AA0A51', no: 0, to: '/admin/voters', img: 'entypo_user' },
            { title: 'Votes', color: '#F57F1D', btncolor: '#AD540A', no: 0, to: '/admin/votes', img: 'Group' }
        ])

       const { $axios, store } = useContext()
   
        onMounted(async () => {
            present.value = false

            const title = await $axios.$get('/currentElectionTitle')
            electionTitle.value = title.electionDate

            await $axios.$get('/position').then(res => {
                position.value = res
                dashboardDetails.value[0].no = res.length
            })
            await $axios.$get(`/candidate?electionDate=${ store.state.user.electionDate }`).then(res => {
                candidate.value = res
                dashboardDetails.value[1].no = res.length
            })
            await $axios.$get(`/votes?electionDate=${ store.state.user.electionDate }`).then(res => {
                votes.value = res
                dashboardDetails.value[3].no = res.length
                 votes.value.forEach((item) => {
               item.votes.forEach(doc => chartVotes.value.push(doc))
            })
            })
            await $axios.$get('/admin/users').then(res => {
                voter.value = res
                dashboardDetails.value[2].no = res.length
                
            })
            present.value = true
        })


// TESTING
   


        const barChartData = (position: string) => {
             
            const displayData: object[] = []

             const elected = (id: string) => chartVotes.value.filter((item) => item.vote?.includes(id)).length
        //    return elected.length

            const item = candidate.value.filter(doc => doc.position === position)
            console.log(item)
             item.forEach(doc => {

                 console.log(doc.firstname, elected(doc._id))
                 displayData.push({ name: `${doc.lastname} (${ doc.party })`, y: elected(doc._id)})

             })
          
          const data = {
              chart: {
        type: 'column'
    },
    title: {
        text: `${store.state.user.electionDate} Election`
    },
    subtitle: {
        text: position
    },
    accessibility: {
        announceNewData: {
            enabled: true
        }
    },
    xAxis: {
        type: 'category'
    },
    yAxis: {
        title: {
            text: 'Total number of candidates votes'
        }

    },
    legend: {
        enabled: false
    },
    plotOptions: {
        series: {
            borderWidth: 0,
            dataLabels: {
                enabled: true,
                format: '{point.y:.f} vote(s)'
            },
            color: '#04A967',

        }
    },

    tooltip: {
        headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
        pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.f} vote(s)</b>'
    },

    series: [
        {
            name: "Candidate",
            colorByPoint: false,
            data: displayData
        }
    ]
          }
        return data
            }


        return {
            dashboardDetails,
            present,
            barChartData,
            position,
            electionTitle
        }
    },
})
</script>
