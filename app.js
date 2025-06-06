const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const app = express();
app.use(express.json());

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

app.post('/validate', async (req, res) => {
  const { key } = req.body;
  try {
    const { data, error } = await supabase
      .from('activation_keys')
      .select('*')
      .eq('key', key)
      .single();
      
    // 修复1: 修正拼写错误 (!error 而不是 lerror)
    res.json({ valid: !error, data });
  } catch (e) {
    res.status(400).json({ valid: false, error: '无效的激活码' });
  }
});

// 修复2: 添加必须的模块导出
module.exports = app;
