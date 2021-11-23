{
  "apps": {
      "name": "wuwu",                             // 项目名          
      "script": "./bin/www",                      // 执行文件
      "cwd": "./",                                // 根目录
      "args": "",                                 // 传递给脚本的参数
      "interpreter": "",                          // 指定的脚本解释器
      "interpreter_args": "",                     // 传递给解释器的参数
      "watch": true,                              // 是否监听文件变动然后重启
      "ignore_watch": [                           // 不用监听的文件
          "node_modules",
          "logs"
      ],
      "exec_mode": "cluster_mode",                // 应用启动模式，支持fork和cluster模式
      "instances": 4,                             // 应用启动实例个数，仅在cluster模式有效 默认为fork；或者 max
      "max_memory_restart": 8,                    // 最大内存限制数，超出自动重启
      "error_file": "./logs/app-err.log",         // 错误日志文件
      "out_file": "./logs/app-out.log",           // 正常日志文件
      "merge_logs": true,                         // 设置追加日志而不是新建日志
      "log_date_format": "YYYY-MM-DD HH:mm:ss",   // 指定日志文件的时间格式
      "min_uptime": "60s",                        // 应用运行少于时间被认为是异常启动
      "max_restarts": 30,                         // 最大异常重启次数，即小于min_uptime运行时间重启次数；
      "autorestart": true,                        // 默认为true, 发生异常的情况下自动重启
      "cron_restart": "30 21 * * *",              // crontab时间格式重启应用，目前只支持cluster模式;
      "restart_delay": "60s"                      // 异常重启情况下，延时重启时间
      "env": {
         "NODE_ENV": "production",                // 环境参数，当前指定为生产环境 process.env.NODE_ENV
         "REMOTE_ADDR": "爱上大声地"               // process.env.REMOTE_ADDR
      },
      "env_dev": {
          "NODE_ENV": "development",              // 环境参数，当前指定为开发环境 pm2 start app.js --env_dev
          "REMOTE_ADDR": ""
      },
      "env_test": {                               // 环境参数，当前指定为测试环境 pm2 start app.js --env_test
          "NODE_ENV": "test",
          "REMOTE_ADDR": ""
      }
  }
}

//cron_restart 格式
// 30 21 * * * /usr/local/apache/bin/apachectl restart
// 上面的例子表示每晚的21:30重启apache。

// 45 4 1,10,22 * * /usr/local/apache/bin/apachectl restart
// 上面的例子表示每月1、10、22日的4 : 45重启apache。

// 10 1 * * 6,0 /usr/local/apache/bin/apachectl restart
// 上面的例子表示每周六、周日的1 : 10重启apache。

// 0,30 18-23 * * * /usr/local/apache/bin/apachectl restart
// 上面的例子表示在每天18 : 00至23 : 00之间每隔30分钟重启apache。

// 0 23 * * 6 /usr/local/apache/bin/apachectl restart
// 上面的例子表示每星期六的23 : 00 重启apache。

// * */1 * * * /usr/local/apache/bin/apachectl restart
// 上面的例子表示每一小时重启apache

// * 23-7/1 * * * /usr/local/apache/bin/apachectl restart
// 上面的例子表示晚上11点到早上7点之间，每隔一小时重启apache

// 0 11 4 * mon-wed /usr/local/apache/bin/apachectl restart
// 上面的例子表示每月的4号与每周一到周三的11点重启apache

// 0 4 1 jan * /usr/local/apache/bin/apachectl restart

// 上面的例子表示一月一号的4点重启apache