<template>
	<vSnackbar
		class="notification-item"
		:elevation="elevation"
		:timeout="timer"
		:color="type"
		right
		v-model="isVisible"
	>
		<template>
			<vProgressCircular :value="loading" :rotate="360">
        <template>
          <vIcon>mdi-information</vIcon>
        </template>
			</vProgressCircular>
		</template>
		{{ message }}
		<template v-slot:action="{ attrs }">
			<vBtn fab text v-bind="attrs" @click="closeNotification"> Close </vBtn>
		</template>
	</vSnackbar>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "nuxt-property-decorator";

import { flatNotificationStore } from "@/store";

@Component
export default class NotificationItem extends Vue {
	isVisible: boolean = true;
	value: number = 0;
	interval: any = {};
	loading: number = 0

	@Prop({ type: Number, default: 1 }) readonly elevation!: number;
	@Prop({ type: Number, default: 5000 }) readonly timer!: number;
	@Prop({ type: String, default: "" }) readonly message!: string;
	@Prop({ type: String, required: true })
	readonly type!: string;
	@Prop({ type: Number, required: true }) readonly index!: number;

	loadingNotifie(): void {
		const porcemptual = this.timer / 1000;
		const timer = 100 / porcemptual;
		this.interval = setInterval(() => {
			this.value += 1
			this.loading += timer
			if (this.value > porcemptual + 1) {
				flatNotificationStore.removeNotification(this.index);
				clearInterval(this.interval);
			}
		}, 1000);
	}

	closeNotification(): void {
		clearInterval(this.interval);
		flatNotificationStore.removeNotification(this.index);
	}

	mounted(): void {
		this.loadingNotifie();
	}
}
</script>

<style lang="scss" scoped>
.notification-item {
	height: auto;
	position: relative;
}
</style>
