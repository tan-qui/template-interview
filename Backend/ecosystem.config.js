module.exports = {
  apps: [
    {
      name: 'service-chat-ai',
      script: './dist/server.js',
      instances: '1',
      autorestart: true,
      watch: false,
      exec_mode: 'cluster',
      max_memory_restart: '2G',
      out_file: "./logs/service-chat-ai/access.log",
      error_file: "./logs/service-chat-ai/error.log",
      log_date_format: "YYYY-MM-DD HH:mm:ss",
      merge_logs: true,
      env_dev: {
        NODE_ENV: 'dev',
      },
      env_qa: {
        NODE_ENV: 'qa',
      },
      env_prod: {
        NODE_ENV: 'prod',
      },
    },
  ],
};
