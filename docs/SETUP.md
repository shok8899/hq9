# 加密货币行情服务器使用指南

## 一、服务器要求

- Node.js 16.x 或更高版本
- 2GB 或以上内存
- 稳定的网络连接

## 二、快速开始

```bash
# 安装依赖
npm install

# 启动服务器
npm run dev
```

服务器将在以下端口启动：
- HTTP API: 8000
- WebSocket: 8001

## 三、可用端点

1. 基础信息
   - `GET http://[服务器IP]:8000/` - 获取服务器信息
   - `GET http://[服务器IP]:8000/symbols` - 获取支持的交易对列表
   - `GET http://[服务器IP]:8000/price/[币种]` - 获取指定币种价格
   - `WebSocket ws://[服务器IP]:8001` - 实时价格推送

2. 支持的币种：
   - BTCUSD (比特币)
   - ETHUSD (以太坊)
   - BNBUSD (币安币)
   - XRPUSD (瑞波币)
   - ADAUSD (艾达币)
   - DOGEUSD (狗狗币)
   - SOLUSD (索拉纳)
   - DOTUSD (波卡)
   - LINKUSD (链接)
   - 等多个主流币种