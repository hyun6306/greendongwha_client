export default {
    data:() => ({
    }),
    watch:{},
    computed:{
    },
    created(){
        const scriptElem = document.createElement('script')

        // script download
        scriptElem.src = `https://partner.talk.naver.com/banners/script`

        document.head.appendChild(scriptElem)
    },
    mounted(){
    },
    methods:{
        async naver_chatbot_on_click(){

            // id = naverChatBot 정보 가져오기
            let btnNaver =  document.getElementById('naverChatBot').firstChild.firstChild

            // onClick value 수정
            // preRender '/' open error 이슈
            // ref= encodeurl 삽입 https%3A%2F%2Fwww.greendongwha.com%2Fhome 고정
            btnNaver.setAttribute('onClick', `javascript:window.open(\'http://talk.naver.com/wcc1l9?ref=https%3A%2F%2Fwww.greendongwha.com%2Fhome\', \'talktalk\', \'scrollbars=1, resizable=1, width=486, height=745\');return false;`)
            btnNaver.click()
        }
    }
}
