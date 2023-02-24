export default {
    data:() => ({
    }),
    watch:{},
    computed:{
    },
    created(){
    },
    mounted(){
    },
    methods:{

        // device       : 'B', // -w:웹 -m:모바일 버전 -b:반응형
        // convType     : '전환유형', // -etc:상담신청 등 기타 유형 -join:회원가입 -login:로그인
        // btnSelector  : '이벤트를 등록할 버튼의 selector',
        // productName  : '광고주에서 커스텀 할 상품명'

        ad_mobion_page_convertion(productName, convType = 'etc', ){
            // page
            (function(a,g,e,n,t){a.enp=a.enp||function(){(a.enp.q=a.enp.q||[]).push(arguments)};n=g.createElement(e);n.defer=!0;n.src="https://cdn.megadata.co.kr/dist/prod/enp_tracker_self_hosted.min.js";t=g.getElementsByTagName(e)[0];t.parentNode.insertBefore(n,t)})(window,document,"script");
            enp('create', 'conversion', 'donghwagreen', { device: 'B', convType: convType, productName: productName});
            enp('send', 'conversion', 'donghwagreen', { device: 'B', convType: convType, productName: productName});
        },
        ad_mobion_click_convertion(btnSelector,  productName, convType = 'etc',){
            // click
            (function(a,g,e,n,t){a.enp=a.enp||function(){(a.enp.q=a.enp.q||[]).push(arguments)};n=g.createElement(e);n.defer=!0;n.src="https://cdn.megadata.co.kr/dist/prod/enp_tracker_self_hosted.min.js";t=g.getElementsByTagName(e)[0];t.parentNode.insertBefore(n,t)})(window,document,"script");
            enp('create', 'conversion', 'donghwagreen', { device: 'B', btnSelector: btnSelector, convType: convType, productName: productName});
        },
    }
}
