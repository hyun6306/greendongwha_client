export default {
    data:()=>({
    }),
    computed: {
    },
    methods:{
        image_resizer_resize (file, onComplete, size = 2080) {
            const mimetype = file.type.split('/') // NB: Not supprted by Safari on iOS !??! @todo: TEST!
            const isImage = mimetype[0] === 'image'
            if (isImage) {
                const img = document.createElement('img')
                const reader = new FileReader()
                reader.onload = function() {
                    img.src = reader.result
                    img.onload = function() {
                        const orgWidth = img.width
                        const orgHeight = img.height
                        let targetWidth = size
                        let targetHeight = size
                        let ratio = 1
                        if (orgWidth > orgHeight && orgWidth > targetWidth) {
                            ratio = targetWidth / orgWidth
                        }
                        else if (orgHeight > targetHeight) {
                            ratio = targetHeight / orgHeight
                        }
                        if(ratio !== 1) {
                            targetWidth = Math.round(orgWidth * ratio)
                            targetHeight = Math.round(orgHeight * ratio)
                            console.log('org: ', orgWidth, orgHeight, ' target: ', targetWidth, targetHeight)

                            let canvas = document.createElement('canvas')
                            const ctx = canvas.getContext('2d')
                            canvas.width = targetWidth
                            canvas.height = targetHeight
                            ctx.drawImage(img, 0, 0, targetWidth, targetHeight)
                            const dataUrl = canvas.toDataURL(file.type)
                            onComplete(dataUrl)
                        }
                        else {
                            onComplete(null)    // target보다 작아 변경할 필요가 없음
                        }
                    }
                }
                reader.readAsDataURL(file)
            }
            else {
                console.error('This is not an image!!!')
            }
        },
        image_resizer_create_url (dataurl, fileName) {
            // console.log('dataurl', dataurl)
            let arr = dataurl.split(',')
            let mime = arr[0].match(/:(.*?);/)[1]
            let bstr = atob(arr[1])
            let n = bstr.length
            let u8arr = new Uint8Array(n)

            while(n--){
                u8arr[n] = bstr.charCodeAt(n);
            }
            return new File([u8arr], fileName, {type:mime})
        },
    }
}
