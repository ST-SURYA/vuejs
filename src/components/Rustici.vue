<template>
    <div>
        <button @click="() => saveProgress()">Click</button>
        <div v-if="scormUrl">

            <iframe :src="scormUrl" width="100%" height="600" @load="initializeScorm"></iframe>
        </div>
    </div>
</template>

<script>

export default {
    data() {
        return {
            scormUrl: 'https://app.cloud.scorm.com/sc/InvitationConfirmEmail?publicInvitationId=7764944f-b362-4806-bbb6-d96a00b60962', // URL of your SCORM content
        };
    },
    methods: {
        async fetchData() {
            const encodeKey = 'OVJOFSB1J8:b4xJzLGF4JC3cSojV9f9EBZpQlXHqjOwClYvR5u6'
            const encodedString = btoa(encodeKey)
            fetch('https://cloud.scorm.com/api/v2/registrations', {
                headers: {
                    Authorization:`Basic ${encodedString}`
                }
            })
        }
    },
    mounted() { 
        this.fetchData();
    }
};
</script>
