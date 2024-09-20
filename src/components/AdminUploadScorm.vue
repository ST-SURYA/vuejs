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
        async uploadScorm() {
            if (!this.scormFile) {
                this.uploadErrorMessage = 'No file selected.';
                return;
            }

            const formData = new FormData();
            formData.append('scorm', this.scormFile);

            try {
                const response = await fetch('/upload-scorm', {
                    method: 'POST',
                    body: formData,
                });

                if (response.ok) {
                    const result = await response.json();
                    this.uploadSuccessMessage = `SCORM package uploaded successfully. View the course: ${result.url}`;
                    this.uploadErrorMessage = '';
                    this.scormFile = null;
                } else {
                    throw new Error('Failed to upload SCORM package.');
                }
            } catch (error) {
                console.error('Error during SCORM file upload:', error);
                this.uploadErrorMessage = 'An error occurred while uploading the SCORM file.';
                this.uploadSuccessMessage = '';
            }
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
