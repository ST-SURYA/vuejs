<template>
    <div>
        <h2>Upload SCORM Package</h2>

        <!-- File input for selecting SCORM package -->
        <form @submit.prevent="uploadScorm">
            <div>
                <label for="scormFile">Select SCORM File (ZIP):</label>
                <input type="file" id="scormFile" @change="handleFileChange" accept=".zip" />
            </div>

            <!-- Submit button -->
            <button type="submit" :disabled="!scormFile">Upload SCORM</button>
        </form>

        <!-- Display success or error messages -->
        <div v-if="uploadSuccessMessage" class="success-message">
            {{ uploadSuccessMessage }}
        </div>
        <div v-if="uploadErrorMessage" class="error-message">
            {{ uploadErrorMessage }}
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            scormFile: null, // Holds the selected file
            uploadSuccessMessage: '', // To show success message
            uploadErrorMessage: '', // To show error message
        };
    },
    methods: {
        // Handle file selection
        handleFileChange(event) {
            const file = event.target.files[0];
            if (file && file.type === 'application/zip') {
                this.scormFile = file;
                this.uploadSuccessMessage = '';
                this.uploadErrorMessage = '';
            } else {
                this.scormFile = null;
                this.uploadErrorMessage = 'Please select a valid SCORM zip file.';
            }
        },

        // Upload SCORM file to backend
        uploadScorm() {
            const formData = new FormData();
            formData.append('scorm', this.scormFile);
            fetch('/upload-scorm', {
                method: 'POST',
                body: formData,
                // headers: {
                //     'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                // }
            }).then((res) => {
                console.log('File uploaded', res.json());
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
    },
};
</script>

<style>
.success-message {
    color: green;
}

.error-message {
    color: red;
}
</style>
