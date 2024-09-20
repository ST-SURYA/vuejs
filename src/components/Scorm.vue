<template>
    <div>
        <button @click="()=>saveProgress()">Click</button>
        <iframe :src="scormUrl" width="100%" height="600" @load="initializeScorm"></iframe>
    </div>
</template>

<script>
import {SCORM} from 'pipwerks-scorm-api-wrapper';

const scorm =  SCORM;
export default {
    data() {
        return {
            scormUrl: '', // URL of your SCORM content
        };
    },
    methods: {
        async loadScorm() {
            try {
                // const response = await fetch(`/scorm/${this.$route.params.scormId}`);
                // const data = await response.json();
                this.scormUrl = "/the-prevent-duty-in-higher-education_-an-introduction-2021_SCORM-1-2/launch.html";
                // console.log("sss", PIPSCORM)
                this.initializeScorm();
            } catch (error) {
                console.error('Error loading SCORM data:', error);
            }
        },
        initializeScorm() {
            // PIPSCORM.init(); // Initialize SCORM API
            scorm.init();
            this.fetchScormData(); // Fetch current data when SCORM content is loaded
        },
        fetchScormData() {
             const score = scorm.get('cmi');
             const completionStatus = scorm.get('cmi.core.lesson_status');
             const timeSpent = scorm.get('cmi.core.total_time');
             console.log('====================================',scorm.data.get());
             console.log('Score:', score);
             console.log('Completion Status:', completionStatus);
             console.log('Time Spent:', timeSpent);
             console.log('====================================');
        },
        saveProgress() {
            this.fetchScormData();
            // Example: Save data to Laravel backend
            // fetch(`/scorm/${this.$route.params.scormId}`, {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify({
            //         score: Scorm.get('cmi.core.score.raw'),
            //         completionStatus: Scorm.get('cmi.core.lesson_status'),
            //         timeSpent: Scorm.get('cmi.core.total_time'),
            //     }),
            // });
            // const score = Scorm.get('cmi.core.score.raw');
            // const completionStatus = Scorm.get('cmi.core.lesson_status');
            // const timeSpent = Scorm.get('cmi.core.total_time');
            // console.log('Score:', score);
            // console.log('Completion Status:', completionStatus);
            // console.log('Time Spent:', timeSpent);
        },
    },
    mounted() {
        this.loadScorm();
    },
    beforeDestroy() {
        // Ensure SCORM data is saved when component is destroyed
        this.saveProgress();
    },
};
</script>

