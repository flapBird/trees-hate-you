'use client'; // 💡 必须加在最顶部，声明为客户端组件

import { useEffect, useRef } from 'react';

export default function AdsterraBanner() {
  const bannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 确保只在客户端执行，且只加载一次广告
    if (bannerRef.current && !bannerRef.current.querySelector('iframe')) {
      const div = bannerRef.current;

      // 1. 在 window 对象上挂载配置
      (window as any).atOptions = {
        'key': '1362380e0bd383a3424b76882e4c199e',
        'format': 'iframe',
        'height': 60,
        'width': 468,
        'params': {}
      };

      // 2. 动态创建并插入广告的 JS 脚本
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = 'https://highperformanceformat.com';
      
      div.appendChild(script);
    }
  }, []);

  return (
    // 居中容器，并将广告脚本注入到该容器内
    <div 
      ref={bannerRef} 
      style={{ display: 'flex', justifyContent: 'center', margin: '16px 0', minHeight: '60px' }} 
    />
  );
}
