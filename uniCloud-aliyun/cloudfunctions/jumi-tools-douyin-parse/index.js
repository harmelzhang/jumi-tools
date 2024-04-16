'use strict';

const xbogus = require("./X-Bogus.js")

const douyinCookie =
    "ttwid=1%7CkZCryomIijuDSB3kvIAyNgIP0Hkp35vn_wLIpFhnlp4%7C1692864417%7Cf18ba647b81bb0261673e0afe556ea57ab4bd61a98eecd08dae160317c49fdae; my_rd=2; xgplayer_user_id=456912872191; n_mh=9Raa-SNCYo8_Hz5tDUAzh0hM3ZzUPDYSzbYN8eoP_Wc; sso_uid_tt=b00f30ca81b2f99490b12fa8493ff3a8; sso_uid_tt_ss=b00f30ca81b2f99490b12fa8493ff3a8; toutiao_sso_user=98d77562545db64fbca260689ef275ae; toutiao_sso_user_ss=98d77562545db64fbca260689ef275ae; _bd_ticket_crypt_cookie=05b0b858378e999d713834c675cf46af; xgplayer_device_id=85293081392; live_use_vvc=%22false%22; passport_csrf_token=bee902ce980058197d7dbd0cdd474c52; passport_csrf_token_default=bee902ce980058197d7dbd0cdd474c52; dy_swidth=1536; dy_sheight=864; bd_ticket_guard_client_web_domain=2; uid_tt=a2285be8f74a20b0c1d2fd5cd6fb58a3; uid_tt_ss=a2285be8f74a20b0c1d2fd5cd6fb58a3; sid_tt=0bc46d88c056c39bfbd85f6eb79dd6ca; sessionid=0bc46d88c056c39bfbd85f6eb79dd6ca; sessionid_ss=0bc46d88c056c39bfbd85f6eb79dd6ca; passport_assist_user=CkGequVJtW6hXZGtwsMB1vKywgVT68FvZD9rMd-xatnJIkeXV8091OwkeGtcNZ77bH802dhbsuS5EV58fOX0u8gLaRpKCjzhsl8Pv_gNjhldu1PFKmRsLpbV95mdnl4CQ-4iJwVs7i8qvOVGWkIc8nwpK73Cb5MBxxbiJq7XQKCTP9MQkczEDRiJr9ZUIAEiAQPySxM8; sid_ucp_sso_v1=1.0.0-KGNmOTNkNDhmMzE3YThhMjRjYzU2ZjlkZDY1ZmQ5NTJlY2Q5N2E4OTMKHwje-8Hwh42CAxCvm5SsBhjvMSAMMLHGn4wGOAZA9AcaAmxxIiA5OGQ3NzU2MjU0NWRiNjRmYmNhMjYwNjg5ZWYyNzVhZQ; ssid_ucp_sso_v1=1.0.0-KGNmOTNkNDhmMzE3YThhMjRjYzU2ZjlkZDY1ZmQ5NTJlY2Q5N2E4OTMKHwje-8Hwh42CAxCvm5SsBhjvMSAMMLHGn4wGOAZA9AcaAmxxIiA5OGQ3NzU2MjU0NWRiNjRmYmNhMjYwNjg5ZWYyNzVhZQ; sid_guard=0bc46d88c056c39bfbd85f6eb79dd6ca%7C1703218609%7C5184000%7CTue%2C+20-Feb-2024+04%3A16%3A49+GMT; sid_ucp_v1=1.0.0-KDJmNDljZDc0MzExOGRiNzg1ODM0M2NmNjY4MWQwMjRlMjQ5ZGRiNGMKGwje-8Hwh42CAxCxm5SsBhjvMSAMOAZA9AdIBBoCaGwiIDBiYzQ2ZDg4YzA1NmMzOWJmYmQ4NWY2ZWI3OWRkNmNh; ssid_ucp_v1=1.0.0-KDJmNDljZDc0MzExOGRiNzg1ODM0M2NmNjY4MWQwMjRlMjQ5ZGRiNGMKGwje-8Hwh42CAxCxm5SsBhjvMSAMOAZA9AdIBBoCaGwiIDBiYzQ2ZDg4YzA1NmMzOWJmYmQ4NWY2ZWI3OWRkNmNh; _bd_ticket_crypt_doamin=2; __security_server_data_status=1; s_v_web_id=verify_lqkep5xl_xKzUiJVn_8GcO_4gX9_Am2E_yNSu6z68xXPQ; live_can_add_dy_2_desktop=%220%22; LOGIN_STATUS=1; __live_version__=%221.1.1.7010%22; stream_recommend_feed_params=%22%7B%5C%22cookie_enabled%5C%22%3Atrue%2C%5C%22screen_width%5C%22%3A1536%2C%5C%22screen_height%5C%22%3A864%2C%5C%22browser_online%5C%22%3Atrue%2C%5C%22cpu_core_num%5C%22%3A12%2C%5C%22device_memory%5C%22%3A8%2C%5C%22downlink%5C%22%3A10%2C%5C%22effective_type%5C%22%3A%5C%224g%5C%22%2C%5C%22round_trip_time%5C%22%3A50%7D%22; douyin.com; device_web_cpu_core=12; device_web_memory_size=8; architecture=amd64; csrf_session_id=24633ead6cb7bdd3a0ed7e594ba3ef98; strategyABtestKey=%221705030608.256%22; __ac_signature=_02B4Z6wo00f01bkrxoQAAIDChILcGy.e8QW5D8IAAAvraQVIHDE2Hp65byFIaNKpIi5z13WJxAy7ZdqcvscGC0mVtGLSi7q9H9jf7aB1TGfyG6NSUhYgdZYv3u.Pqg7jCTGqciQzqQBXE1CD48; download_guide=%223%2F20240105%2F1%22; volume_info=%7B%22isUserMute%22%3Afalse%2C%22isMute%22%3Afalse%2C%22volume%22%3A0.991%7D; pwa2=%220%7C0%7C3%7C0%22; SEARCH_RESULT_LIST_TYPE=%22single%22; tt_scid=L-u-K3f5nB4VtnfQahKzG5j-3ga16VepMxK9s283Gl4nFbUDTfHTcm3DSqnUb3aQa8fd; webcast_leading_last_show_time=1705034334778; webcast_leading_total_show_times=1; publish_badge_show_info=%220%2C0%2C0%2C1705034338814%22; FOLLOW_NUMBER_YELLOW_POINT_INFO=%22MS4wLjABAAAANrFaE_3uqACbIKK6fOkwIAAyHOzq5FuSUaEKi9s4oD6-XNDDEsIOzHtWwxmfD5FK%2F1705075200000%2F0%2F0%2F1705035539523%22; bd_ticket_guard_client_data=eyJiZC10aWNrZXQtZ3VhcmQtdmVyc2lvbiI6MiwiYmQtdGlja2V0LWd1YXJkLWl0ZXJhdGlvbi12ZXJzaW9uIjoxLCJiZC10aWNrZXQtZ3VhcmQtcmVlLXB1YmxpYy1rZXkiOiJCTm1LRHNLTy9lWE9ydXRvblEzcGtoQThJcWQydnQxMlgxUWdNWG5JczY1YkhpTXZndytuR3ArZGNPL0dKV01FSXVaN0pna09WNFZsc29wUCs0eVNZdms9IiwiYmQtdGlja2V0LWd1YXJkLXdlYi12ZXJzaW9uIjoxfQ%3D%3D; home_can_add_dy_2_desktop=%221%22; odin_tt=cba5764bb4779709840c48177dc4836efab4ddf2632c4aceb65990e22d72341ef0ad5c5ff1bf823086fda5a7381874f6; msToken=qOC3_qK1NPn3opjKo33BJDIBdY4RId0gNUbluQbpkRi5SlSsXD-LjKb42byfwwL9mKn08HDtJbuCd_cU6fC9IJ0ZOyn-GnP1v_7fSSRTxaXSwgMuHblEDdKw; msToken=e80DLM4WPExu-V3ZQSgcXFCQveUUIlEnnKuoKgHfvX6y44xZqmM4IFLeTPwUJ38vp2TQmPhuhtrQxljvcLNCgz8D9ctHdUUv7W2NIC6scEgAHzb__32QujCr; IsDouyinActive=false; passport_fe_beating_status=false; xg_device_score=7.560990893971474; stream_player_status_params=%22%7B%5C%22is_auto_play%5C%22%3A1%2C%5C%22is_full_screen%5C%22%3A0%2C%5C%22is_full_webscreen%5C%22%3A0%2C%5C%22is_mute%5C%22%3A0%2C%5C%22is_speed%5C%22%3A1.5%2C%5C%22is_visible%5C%22%3A0%7D%22";

exports.main = async (event, context) => {
    let queryArgs = {
        "aweme_id": event.videoId,
        "device_platform": "webapp",
        "aid": "6383",
        "channel": "channel_pc_web",
        "pc_client_type": 1,
        "version_code": "170400",
        "version_name": "17.4.0",
        "cookie_enabled": "true",
        "screen_width": 1920,
        "screen_height": 1080,
        "browser_language": "zh-CN",
        "browser_platform": "Win32",
        "browser_name": "Edge",
        "browser_version": "117.0.2045.47",
        "browser_online": "true",
        "engine_name": "Blink",
        "engine_version": "117.0.0.0",
        "os_name": "Windows",
        "os_version": "10",
        "cpu_core_num": 12,
        "device_memory": 8,
        "platform": "PC",
        "downlink": 10,
        "effective_type": "4g",
        "round_trip_time": 100,
        "msToken": "DRG35f4g45e"
    }
    let headers = {
        "Referer": `https://www.douyin.com/video/${event.videoId}`,
        "Cookie": douyinCookie,
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36"
    }

    let queryParams = "";
    for (let name in queryArgs) {
        queryParams += `&${name}=${queryArgs[name]}`
    }
    queryParams = queryParams.substr(1);
    let url = `https://www.douyin.com/aweme/v1/web/aweme/detail/?${queryParams}`
    let xbogusSign = xbogus.sign(queryParams, headers["User-Agent"])
    url += `&X-Bogus=${xbogusSign}`

    let realUrl = "";
    const res = await uniCloud.request({
        url: url,
        header: headers
    })
    if (res.statusCode == 200) {
        if (res.data.status_code == 0) {
            realUrl = res.data.aweme_detail.video.bit_rate[0].play_addr.url_list[0]
        }
    }

    let result = {
        "code": 0,
        "url": realUrl,
        "message": "查询成功"
    }
    if (realUrl == "") {
        result["code"] = -1
        result["message"] = "抖音更新了规则，请联系开发者处理"
    }

    return result;
};