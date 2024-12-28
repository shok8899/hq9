# 服务器维护指南

## 一、日常维护

1. 监控服务状态
```bash
# 检查服务是否正常运行
curl http://localhost:8000/

# 检查具体币种价格
curl http://localhost:8000/price/BTCUSD
```

2. 使用 PM2 管理进程
```bash
# 安装 PM2
npm install -g pm2

# 启动服务
pm2 start server.js --name crypto-mt4

# 查看日志
pm2 logs crypto-mt4

# 监控状态
pm2 monit
```

## 二、性能优化

1. 定期维护
   - 更新 Node.js 和依赖包
   - 清理日志文件
   - 监控内存使用

2. 安全建议
   - 定期更新系统
   - 配置防火墙规则
   - 监控异常访问
   - 设置访问限制