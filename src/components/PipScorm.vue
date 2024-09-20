<template>
    <div>
        <h2>SCORM Player</h2>
        <button @click="course1">Course 1</button>
        <button @click="course2">Course 2</button>
        <div v-if="scormUrl">
        <iframe ref="scormIframe" :src="scormUrl" frameborder="0" width="100%" height="600px"></iframe>
        </div>
        <!-- <button @click="completeScormSession">Complete SCORM Session</button> -->
    </div>
</template>

<script>
// Import Pipwerks SCORM API wrapper
import pipwerks from 'pipwerks-scorm-api-wrapper';

export default {
    data() {
        return {
            course: '',
            scormUrl: '', // Path to the SCORM content's index.html
        };
    },
    mounted() {
        this.injectScormAPI();  // Inject SCORM API into the parent window
        this.initializeSCORM(); // Initialize SCORM when the iframe content loads
    },
    methods: {
        course1() {
            this.scormUrl = '/public/Creatingapsychologicallysafeandhealthyworkplace_v4SCORM1.2b88990fa-6c1c-4777-a3f1-1c6788380f66/index.html';
            this.course = 'course1'

        },
        course2() {
            this.scormUrl = '/public/the-prevent-duty-in-higher-education_-an-introduction-2021_SCORM-1-2/launch.html';
            this.course = 'course2'

        },
        // Inject Mock SCORM API into the parent window
        injectScormAPI() {
            window.API = {
                LMSInitialize: function () {
                    console.log("LMS initialized");
                    return "true";
                },
                LMSFinish: function () {
                    console.log("LMS finished");
                    return "true";
                },
                LMSGetValue: (param) => {
                    console.log("LMSGetValue called for: ", param);
                    const value = JSON.parse(localStorage.getItem(this.course) ?? '{}');
                    console.log(`Retrieved ${param} from localStorage: ${value[param]}`);
                    return value[param];
                    // return '';
                },
                LMSSetValue: (param, value) => {
                    console.log(`LMSSetValue called for ${param}: ${value}`);
                    const val = JSON.parse(localStorage.getItem(this.course) ?? '{}');
                    const newCheckPoint = { ...val, [param]: value }
                    localStorage.setItem(this.course, JSON.stringify(newCheckPoint));
                    console.log(`Stored ${param} in localStorage: ${value}`);
                    return "true";
                },
                LMSCommit: function () {
                    console.log("LMSCommit called");
                    return "true";
                },
                LMSGetLastError: function () {
                    return "0"; // No error
                },
                LMSGetErrorString: function () {
                    return "No error";
                },
                LMSGetDiagnostic: function () {
                    return "No diagnostic";
                },
            };
            console.log("Mock SCORM API injected into window");
        },

        // Initialize SCORM communication using Pipwerks
        initializeSCORM() {
            if (this.scormUrl) {
                pipwerks.SCORM.version = "1.2"; // or "2004" depending on SCORM version
                const success = pipwerks.SCORM.init();

                if (success) {
                    console.log("SCORM API Initialized successfully");

                    // Example: Retrieve SCORM data
                    const completionStatus = pipwerks.SCORM.get("cmi.core.lesson_status");
                    console.log("Lesson status: ", completionStatus);

                    // Set initial status if not attempted
                    if (completionStatus === "not attempted") {
                        pipwerks.SCORM.set("cmi.core.lesson_status", "incomplete");
                    }
                } else {
                    console.error("SCORM API initialization failed");
                }
            }
        },

        // Complete SCORM session and save data
        completeScormSession() {
            pipwerks.SCORM.set("cmi.core.lesson_status", "completed");
            pipwerks.SCORM.set("cmi.core.score.raw", "95");

            const success = pipwerks.SCORM.save();
            if (success) {
                console.log("SCORM data saved successfully");
                pipwerks.SCORM.quit();
            } else {
                console.error("Failed to save SCORM data");
            }
        },
    },
    beforeDestroy() {
        // Quit SCORM session if the component is destroyed
        pipwerks.SCORM.quit();
    },
};
</script>
