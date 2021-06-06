<template>
	<div class="notification-list" v-show="listNotifications.length > 0">
		<NotificationItem
			v-for="(notification, index) of listNotifications"
			:message="notification.message"
      :type="notification.type"
			:timer="10000"
      :index="index"
			:key="index"
		/>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";

import { flatNotificationStore } from "@/store";


@Component
export default class NotificationList extends Vue {
	get listNotifications() {
		return flatNotificationStore.notifications;
	}
}
</script>

<style lang="scss" scoped>
.notification-list {
	width: 100%;
	position: absolute;
	bottom: 0;
	display: flex;
	flex-direction: column;
}
</style>
