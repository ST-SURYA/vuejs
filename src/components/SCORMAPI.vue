<template>
    <div>
        <h2>Upload SCORM</h2>
        <input type="file" @change="handleFileChange" />
        <button @click="uploadFile">Upload</button>

        <h2>SCORM Player</h2>
        <button @click="loadCourse('115')">Course 1</button>
        <button @click="loadCourse('116')">Course 2</button>
        <button @click="loadCourse('117')">Course 3</button>

        <div v-if="scormUrl">
            <iframe ref="scormIframe" :src="scormUrl" frameborder="0" width="100%" height="600px"></iframe>
        </div>
    </div>
</template>

<script>
import pipwerks from "pipwerks-scorm-api-wrapper";

export default {
    data() {
        return {
            scormUrl: "", // SCORM content URL
            course: "", // Current course identifier
            scormFile: null, // SCORM file for upload
        };
    },
    methods: {
        handleFileChange(event) {
            const file = event.target.files[0];
            if (file && file.type === "application/zip") {
                this.scormFile = file;
            } else {
                this.scormFile = null;
                alert("Please select a valid SCORM zip file");
            }
        },
        uploadFile() {
            if (!this.scormFile) {
                alert("No file selected for upload");
                return;
            }

            const formData = new FormData();
            formData.append("scorm", this.scormFile);

            fetch("/upload-scorm", {
                method: "POST",
                body: formData,
                // headers: {
                //     "X-CSRF-TOKEN": document
                //         .querySelector('meta[name="csrf-token"]')
                //         .getAttribute("content"),
                // },
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.url) {
                        alert("File uploaded successfully");
                        console.log(data);
                    } else {
                        alert("Failed to upload file");
                        console.log(data);
                    }
                })
                .catch((error) => {
                    console.error("Error during upload:", error);
                });
        },
        loadCourse(scormId) {
            fetch(`/scorm/view/${scormId}`)
                .then((response) => {
                    if (response.ok) {
                        this.scormUrl = `/storage/scorm/${scormId}/index.html`;

                        this.course = `course${scormId}`;
                        this.initializeSCORM();
                    } else {
                        alert("SCORM package not found.");
                    }
                })
                .catch((error) => {
                    console.error("Error loading SCORM content:", error);
                });
        },
        injectScormAPI() {
            const courseName = this.course;
            window.API = {
                LMSInitialize: function () {
                    console.log("LMS initialized");
                    return "true";
                },
                LMSFinish: function () {
                    console.log("LMS finished");
                    return "true";
                },
                LMSGetValue: function (param) {
                    const value = JSON.parse(localStorage.getItem(courseName) || "{}");
                    console.log(`Retrieved ${param} from localStorage: ${value[param]}`);
                    return value[param] || "";
                },
                LMSSetValue: function (param, value) {
                    const val = JSON.parse(localStorage.getItem(courseName) || "{}");
                    const newCheckPoint = { ...val, [param]: value };
                    localStorage.setItem(courseName, JSON.stringify(newCheckPoint));
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
        initializeSCORM() {
            this.injectScormAPI(); // Inject API into window
            pipwerks.SCORM.version = "1.2"; // Set SCORM version

            const success = pipwerks.SCORM.init();
            if (success) {
                console.log("SCORM API Initialized successfully");

                // Retrieve initial status
                const status = pipwerks.SCORM.get("cmi.core.lesson_status");
                console.log("Lesson status:", status);

                if (status === "not attempted") {
                    pipwerks.SCORM.set("cmi.core.lesson_status", "incomplete");
                }
            } else {
                console.error("SCORM API initialization failed");
            }
        },
    },
};
</script>

<style scoped>
h2 {
    margin-top: 20px;
}

button {
    margin-right: 10px;
    margin-top: 10px;
}

iframe {
    margin-top: 20px;
    border: 1px solid #ccc;
}
</style>
