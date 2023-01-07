<script setup lang="ts">
import ControlCenter from "@/components/shared/ControlCenter";
import { onClickOutside } from "@vueuse/core";
import type { Ref } from "vue";
import { ref } from "vue";
import Icon from "../Icon";

const controlCenter: Ref<HTMLElement | null | undefined> = ref(null);
const showControlCenter: Ref<boolean> = ref(false);

const toggleControlCenter = () => {
	showControlCenter.value = true;
};

onClickOutside(controlCenter, () => (showControlCenter.value = false));
</script>
<template>
	<div class="status-bar">
		<div class="container">
			<div class="status-bar__inner">
				<div class="status-bar__leftSide">
					<div class="logo">
						<Icon name="apple-white" />
					</div>
					<ul class="menu">
						<li class="menu__item"><span>Finder</span></li>
						<li class="menu__item"><span>File</span></li>
						<li class="menu__item"><span>Edit</span></li>
						<li class="menu__item"><span>View</span></li>
						<li class="menu__item"><span>Go</span></li>
						<li class="menu__item"><span>Window</span></li>
						<li class="menu__item"><span>Help</span></li>
					</ul>
				</div>
				<ul class="status-bar__rightSide">
					<li>
						<Icon name="sound-off" size="large" />
					</li>
					<li>
						<Icon name="user" size="large" />
					</li>
					<li>
						<Icon name="battery" size="large" />
					</li>
					<li :class="{ active: showControlCenter }">
						<Icon name="control" size="large" @click="toggleControlCenter" />
					</li>
					<li class="clock">
						<span>12:43 PM</span>
					</li>
				</ul>
			</div>
		</div>
	</div>

	<ControlCenter ref="controlCenter" v-model="showControlCenter" />
</template>

<style lang="scss" scoped>
.status-bar {
	height: 32px;
	width: 100%;
	background-color: rgba(0, 0, 0, 0.25);

	&__inner {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 32px;
	}

	&__leftSide {
		display: flex;
		align-items: center;

		.logo {
			height: 32px;
			width: 32px;
			margin-right: 12px;

			&:hover {
				background: rgba(255, 255, 255, 0.26);
				border-radius: 5px;
			}

			img {
				width: 100%;
				height: 100%;
			}
		}

		.menu {
			display: flex;
			justify-content: flex-start;

			&__item {
				display: flex;
				align-items: center;
				padding: 0 8px;
				height: 32px;
				cursor: default;

				&:hover {
					background: rgba(255, 255, 255, 0.26);
					border-radius: 5px;
				}

				span {
					font-size: 13px;
					font-weight: 600;
					color: $white;
				}
			}
		}
	}

	&__rightSide {
		display: flex;
		align-items: center;

		li {
			display: flex;
			align-items: center;
			height: 32px;
			margin: 0 5px;

			&:hover {
				background: rgba(255, 255, 255, 0.26);
				border-radius: 5px;
			}

			span {
				font-size: 13px;
				font-weight: 600;
				color: $white;
			}
		}

		li.clock {
			padding: 0 5px;
		}
	}
}

.active {
	background: rgba(255, 255, 255, 0.26);
	border-radius: 5px;
}
</style>
