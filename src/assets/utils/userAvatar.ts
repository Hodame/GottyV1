import { ref } from "vue";

function avatar() {
	const url = ref("")

	const get = () => url.value
	const set = (val: string) => (url.value = val)

	return () => ({ get, set })
}

export const useAvatar = avatar()