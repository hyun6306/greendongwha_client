import { caller } from '@/api/caller'

export default {
	common: {
		// 파일 다운로드
		FileDownload(params) {
			return caller.Call('POST', 'common/file/download/get', params, null)
		},
	},
}
