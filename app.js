const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const app = express();
app.use(express.json());

// 从 Vercel 环境变量读取密钥（不在代码中硬编码！）
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// 验证激活码的 API
app.post('/validate', async (req, res) => {
  const { key } = req.body;
  try {
    const { data, error } = await supabase
      .from('activation_keys') // 假设 Supabase 表名为 activation_keys
      .select('*')
      .eq('key', key)
      .single();
    res.json({ valid: !error, data });
  } catch (e) {
    res.status(400).json({ valid: false, error: '无效的激活码' });
  }
});

app.listen(process.env.PORT || 3000, () => {});
