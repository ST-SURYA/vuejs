// <template>
//     <div>
//         <h2>SCORM Player</h2>
//         <button @click="course1">Course 1</button>
//         <button @click="course2">Course 2</button>
//         <div v-if="scormUrl">
//             <iframe ref="scormIframe" :src="scormUrl" frameborder="0" width="100%" height="600px"></iframe>
//         </div>
//     </div>
// </template>

// <script>
// import * as Scorm from 'scorm-again';

// export default {
//     data() {
//         return {
//             course: '',
//             scormUrl: '', // Path to the SCORM content's index.html
//             scorm: null, // SCORM instance
//         };
//     },
//     mounted() {
//         // console.log(__esModule)
//         this.scorm = new Scorm('1.2'); // Initialize SCORM instance for version 1.2
//         this.injectScormAPI();  // Inject SCORM API into the parent window
//     },
//     methods: {
//         course1() {
//             this.loadCourse('/public/Creatingapsychologicallysafeandhealthyworkplace_v4SCORM1.2b88990fa-6c1c-4777-a3f1-1c6788380f66/index.html', 'course1');
//         },
//         course2() {
//             this.loadCourse('/public/the-prevent-duty-in-higher-education_-an-introduction-2021_SCORM-1-2/launch.html', 'course2');
//         },
//         loadCourse(url, course) {
//             this.scormUrl = url;
//             this.course = course;
//             this.initializeSCORM();
//         },
//         injectScormAPI() {
//             window.API = {
//                 LMSInitialize: () => {
//                     console.log("LMS initialized");
//                     this.scorm.init();
//                     return "true";
//                 },
//                 LMSFinish: () => {
//                     console.log("LMS finished");
//                     this.scorm.quit();
//                     return "true";
//                 },
//                 LMSGetValue: (param) => {
//                     console.log("LMSGetValue called for: ", param);
//                     const value = this.scorm.get(param);
//                     console.log(`Retrieved ${param}: ${value}`);
//                     return value || '';
//                 },
//                 LMSSetValue: (param, value) => {
//                     console.log(`LMSSetValue called for ${param}: ${value}`);
//                     this.scorm.set(param, value);
//                     console.log(`Stored ${param}: ${value}`);
//                     return "true";
//                 },
//                 LMSCommit: () => {
//                     console.log("LMSCommit called");
//                     this.scorm.save();
//                     return "true";
//                 },
//                 LMSGetLastError: () => {
//                     return "0"; // No error
//                 },
//                 LMSGetErrorString: () => {
//                     return "No error";
//                 },
//                 LMSGetDiagnostic: () => {
//                     return "No diagnostic";
//                 },
//             };
//             console.log("Mock SCORM API injected into window");
//         },
//         initializeSCORM() {
//             if (this.scormUrl) {
//                 const success = this.scorm.init();
//                 if (success) {
//                     console.log("SCORM API Initialized successfully");
//                     const completionStatus = this.scorm.get("cmi.completion_status");
//                     console.log("Lesson status: ", completionStatus);
//                     if (completionStatus === "not attempted") {
//                         this.scorm.set("cmi.completion_status", "incomplete");
//                     }
//                 } else {
//                     console.error("SCORM API initialization failed");
//                 }
//             }
//         },
//     },
//     beforeDestroy() {
//         // Quit SCORM session if the component is destroyed
//         this.scorm.quit();
//     },
// };
// </script>
