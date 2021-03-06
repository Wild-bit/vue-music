# vue-music
首先在这里感谢小马哥老师的指导
基于vue 的音乐播放器,通过这个项目能够了解vue组件中是如何通信的,以及vue的基础

技术栈:
```
html/css/javascript
Es6
vue
```

实现功能:
```
搜索歌曲功能
歌曲列表
热门评论
上一首下一首歌曲切换
歌曲mv的播放
```
###启动项目先启动vue-serve
```
  npm install -g nodemon
  cd vue-server //切换到项目根目录下
  npm install //下载对应的依赖包
  npm start //启动项目
  ```
 ###在cd musicPlay文件夹
 ```
 npm install 
 npm run serve
```

接口文档:
### 所有歌曲列表接口

请求地址

```js
http://localhost:3000/artist/top/song?id=6452
```

请求方式：get

请求参数：id

示例
```json
{
    "code":200,
    "more":true,
    "songs":[
        {
            "name": "刀马旦",
            "id": 255020,
            "pst": 0,
            "t": 0,
            "ar": [
                {
                    "id": 8331,
                    "name": "李玟",
                    "tns": [],
                    "alias": []
                },
                {
                    "id": 6452,
                    "name": "周杰伦",
                    "tns": [],
                    "alias": []
                }
            ],
            "alia": [],
            "pop": 100,
            "st": 0,
            "rt": "600902000005319691",
            "fee": 8,
            "v": 22,
            "crbt": null,
            "cf": "",
            "al": {
                "id": 25475,
                "name": "Promise",
                "picUrl": "https://p1.music.126.net/bsgJVzkmAwVs1emr4b8hRw==/109951163250111834.jpg",
                "tns": [],
                "pic_str": "109951163250111834",
                "pic": 109951163250111840
            },
            "dt": 193000,
            "h": {
                "br": 320000,
                "fid": 0,
                "size": 7757405,
                "vd": -8000
            },
            "m": {
                "br": 192000,
                "fid": 0,
                "size": 4654476,
                "vd": -5299
            },
            "l": {
                "br": 128000,
                "fid": 0,
                "size": 3103012,
                "vd": -4100
            },
            "a": null,
            "cd": "1",
            "no": 2,
            "rtUrl": null,
            "ftype": 0,
            "rtUrls": [],
            "djId": 0,
            "copyright": 1,
            "s_id": 0,
            "mark": 8192,
            "originCoverType": 0,
            "noCopyrightRcmd": null,
            "mst": 9,
            "cp": 7001,
            "mv": 5287134,
            "rtype": 0,
            "rurl": null,
            "publishTime": 1001865600000,
            "privilege": {
                "id": 255020,
                "fee": 8,
                "payed": 0,
                "st": 0,
                "pl": 128000,
                "dl": 0,
                "sp": 7,
                "cp": 1,
                "subp": 1,
                "cs": false,
                "maxbr": 320000,
                "fl": 128000,
                "toast": false,
                "flag": 4,
                "preSell": false,
                "playMaxbr": 320000,
                "downloadMaxbr": 320000
            }
        },
    ]
}
```

### 歌曲搜索接口

请求地址
```js
http://localhost:3000/search?keywords=xxxx
```
请求方式:get
请求参数:keywords(查询关键字)

示例：
```json
{
  "result":{
    "songs":[
      "id": 475152589,
                "name": "火（Original Mix）",
                "artists": [
                    {
                        "id": 12002020,
                        "name": "LeeAlive",
                        "picUrl": null,
                        "alias": [],
                        "albumSize": 0,
                        "picId": 0,
                        "img1v1Url": "https://p2.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg",
                        "img1v1": 0,
                        "trans": null
                    }
                ],
                "album": {
                    "id": 35439219,
                    "name": "火（Original Mix）",
                    "artist": {
                        "id": 0,
                        "name": "",
                        "picUrl": null,
                        "alias": [],
                        "albumSize": 0,
                        "picId": 0,
                        "img1v1Url": "https://p2.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg",
                        "img1v1": 0,
                        "trans": null
                    },
                    "publishTime": 1493305755855,
                    "size": 1,
                    "copyrightId": 0,
                    "status": 0,
                    "picId": 109951162915453650,
                    "mark": 0
                },
                "duration": 212350,
                "copyrightId": 0,
                "status": 0,
                "alias": [],
                "rtype": 0,
                "ftype": 0,
                "mvid": 0,
                "fee": 8,
                "rUrl": null,
                "mark": 64
    ],
    "songCount":600
  },
  "code":200
}
```
### 歌曲url获取接口
请求地址:http://localhost:3000/song/url?id=255020



请求方式:get
请求参数:id(歌曲id)

示例：
```json
{
    "data": [
        {
            "id": 255020,
            "url": "http://m7.music.126.net/20200508120749/a2c8fb1d7e5da910cb0f1ef8c2212f50/ymusic/bc2e/113e/5c74/7bdbe81e15bebf328072e5ab7c358be7.mp3",
            "br": 128000,
            "size": 3103012,
            "md5": "7bdbe81e15bebf328072e5ab7c358be7",
            "code": 200,
            "expi": 1200,
            "type": "mp3",
            "gain": 0,
            "fee": 8,
            "uf": null,
            "payed": 0,
            "flag": 4,
            "canExtend": false,
            "freeTrialInfo": null,
            "level": "standard",
            "encodeType": "mp3"
        }
    ],
    "code": 200
}
```
### 歌曲详情获取接口

请求地址:http://localhost:3000/song/detail?ids=255020

请求方式：get

请求参数: ids（歌曲id）

示例：

```json
{
    "songs": [
        {
            "name": "刀马旦",
            "id": 255020,
            "pst": 0,
            "t": 0,
            "ar": [
                {
                    "id": 8331,
                    "name": "李玟",
                    "tns": [],
                    "alias": []
                },
                {
                    "id": 6452,
                    "name": "周杰伦",
                    "tns": [],
                    "alias": []
                }
            ],
            "alia": [],
            "pop": 100,
            "st": 0,
            "rt": "600902000005319691",
            "fee": 8,
            "v": 22,
            "crbt": null,
            "cf": "",
            "al": {
                "id": 25475,
                "name": "Promise",
                "picUrl": "https://p1.music.126.net/bsgJVzkmAwVs1emr4b8hRw==/109951163250111834.jpg",
                "tns": [],
                "pic_str": "109951163250111834",
                "pic": 109951163250111840
            },
            "dt": 193000,
            "h": {
                "br": 320000,
                "fid": 0,
                "size": 7757405,
                "vd": -8000
            },
            "m": {
                "br": 192000,
                "fid": 0,
                "size": 4654476,
                "vd": -5299
            },
            "l": {
                "br": 128000,
                "fid": 0,
                "size": 3103012,
                "vd": -4100
            },
            "a": null,
            "cd": "1",
            "no": 2,
            "rtUrl": null,
            "ftype": 0,
            "rtUrls": [],
            "djId": 0,
            "copyright": 1,
            "s_id": 0,
            "mark": 8192,
            "originCoverType": 0,
            "noCopyrightRcmd": null,
            "mv": 5287134,
            "rtype": 0,
            "rurl": null,
            "mst": 9,
            "cp": 7001,
            "publishTime": 1001865600000
        }
    ],
    "privileges": [
        {
            "id": 255020,
            "fee": 8,
            "payed": 0,
            "st": 0,
            "pl": 128000,
            "dl": 0,
            "sp": 7,
            "cp": 1,
            "subp": 1,
            "cs": false,
            "maxbr": 320000,
            "fl": 128000,
            "toast": false,
            "flag": 4,
            "preSell": false,
            "playMaxbr": 320000,
            "downloadMaxbr": 320000
        }
    ],
    "code": 200
}
```
### 热门评论获取

请求地址：http://localhost:3000/comment/hot?type=0&id=255020

请求参数：id(歌曲id,地址中的type固定为0)

示例：

```json
{
    "topComments": [],
    "hasMore": true,
    "hotComments": [
        {
            "user": {
                "locationInfo": "同城",
                "liveInfo": null,
                "anonym": 0,
                "avatarUrl": "https://p3.music.126.net/-3dabmAhs6JyBVpIUaRmZg==/109951163065739628.jpg",
                "experts": null,
                "remarkName": null,
                "userType": 0,
                "nickname": "猛酱兄",
                "vipRights": null,
                "expertTags": null,
                "authStatus": 0,
                "userId": 15856960,
                "vipType": 0
            },
            "beReplied": [],
            "pendantData": null,
            "showFloorComment": null,
            "status": 0,
            "commentId": 30470421,
            "content": "那时的周杰伦 在大家都爱唱苦情慢歌的年代 现在想想都觉得屌爆了",
            "time": 1439204996497,
            "likedCount": 28658,
            "expressionUrl": null,
            "commentLocationType": 0,
            "parentCommentId": 0,
            "decoration": null,
            "repliedMark": null,
            "liked": false
        }
    ],
    "total": 352,
    "code": 200
}
```

### mv接口地址

请求地址：http://localhost:3000/mv/url?id=10802105

请求参数：id(mvid,为0表示没有mv)

示例：

```json
{
    "code": 200,
    "data": {
        "id": 10802105,
        "url": "http://vodkgeyttp8.vod.126.net/cloudmusic/JCMhJDIgITRgMDAwODA0Yg==/mv/10802105/b4739f028b90e99c05afed41edf74d6a.mp4?wsSecret=50513f7c461ed561a7eb20d7f5873e76&wsTime=1588917295",
        "r": 1080,
        "size": 165017163,
        "md5": "",
        "code": 200,
        "expi": 3600,
        "fee": 0,
        "mvFee": 0,
        "st": 0,
        "msg": ""
    }
}
```


