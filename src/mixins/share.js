export default {
    data:()=>({
        share_shareItems:[
            {text:'카카오톡',  value: 0},
            {text:'네이버블로그',  value: 1},
            {text:'페이스북',  value: 2},
            {text:'카카오스토리',  value: 3},
            {text:'URL복사',  value: 4},
        ],
    }),
    computed:{
    },
    watch:{
    },
    created() {
        this.kakao_start()
    },
    methods: {
        share_operator(item, productItem){
            console.log('share_operator',item)
            switch(item.value) {
                case 0:
                    // 카카오톡
                    this.share_kakao_tak(productItem.image, productItem.title, productItem.description)
                    break;
                case 1:
                    // 네이버블로그
                    this.share_naver_blog(productItem.url, productItem.title)
                    break;
                case 2:
                    // 페이스북
                    this.share_facebook(productItem.url, productItem.title)
                    break;
                case 3:
                    // 카카오스토리
                    this.share_kakao_story(productItem.url, productItem.title)
                    break;
                case 4:
                    // URL복사
                    this.share_copy_url()
                    break;
            }
        },
        // kakao start
        kakao_start(){
            const scriptElem = document.createElement('script')

            // script download
            scriptElem.onload = () => this.kakao_init()
            scriptElem.src = `https://developers.kakao.com/sdk/js/kakao.js`

            document.head.appendChild(scriptElem)
        },
        kakao_init() {
            const kakaoKey = process.env.VUE_APP_KAKAO_KEY

            window.Kakao.init(kakaoKey)
            window.Kakao.isInitialized()
            console.log('window.Kakao', window.Kakao)
        },
        async share_kakao_tak(image, title, text){
            const url = window.location.href

            console.log('share_kakao_tak', image, title, text)
            await window.Kakao.Link.sendDefault({
                objectType: 'feed',
                content:    {
                    title:       title? title :'동화자연마루',
                    description: text? text:'1948년 설립된 동화기업은 대한민국 No.1 목질 전문기업입니다.',
                    imageUrl:    image? image : 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fdongwhamaru.net%2F&psig=AOvVaw1Wg1la19xSWazQfP68CP5_&ust=1648618643447000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCLCjuJrN6vYCFQAAAAAdAAAAABAY',
                    link:        {
                        mobileWebUrl: url,
                        webUrl: url
                    },
                },
                buttons:    [{
                    title: '웹으로 보기',
                    link:  {
                        mobileWebUrl: url,
                        webUrl: url
                    },
                }],
            })
        },
        share_naver_blog( url, title ){
            url = url? url : window.location.href
            title = title? title: '동화자연마루'

            const encodeUrl = encodeURIComponent( url )
            const encodeTitle = encodeURIComponent( title )
            const link = `https://share.naver.com/web/shareView.nhn?url=${encodeUrl}&title=${encodeTitle}`

            window.open( link, 'share', 'width=500, height=500' )
        },
        share_facebook(){
            const url = window.location.href
            window.open("https://www.facebook.com/sharer/sharer.php?u=" + url)
        },
        async share_kakao_story(url, title){
            console.log('share_kakao_story',url, title)
            await window.Kakao.Story.share({
                url: url? url : window.location.href,
                text: title
            })
        },
        share_copy_url(){
            const dummy = document.body.appendChild(document.createElement("input"))
            const url = window.location.href

            document.body.appendChild(dummy)
            dummy.value = url
            dummy.focus()
            dummy.select()

            try {
                document.execCommand('copy')
                document.body.removeChild(dummy)
                this.$toastr.success( url, 'URL 복사', {timeOut: 1000})
                window.scrollTo({ top:0,left:0 });
            } catch (err) {
                this.$toastr.error( url, 'URL 복사 실패', {timeOut: 1000})
            }
        }
    },
}
