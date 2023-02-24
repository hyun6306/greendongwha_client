import apiCommon from '@/api/common'

export default {
	state: {},
	mutations: {},
	actions: {
		// 파일 다운로드
		async COMMON_ACT_FILE_DOWNLOAD(Null, params) {
			try {
				let res = await apiCommon.common.FileDownload(params)
				console.log('COMMON_ACT_FILE_DOWNLOAD', res)
				return res
			} catch (e) {
				console.log('admin.reference.FileDownload', e)
			}
		},
	},
	getters: {},
	modules: {},
}
