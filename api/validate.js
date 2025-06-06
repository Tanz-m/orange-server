// 极简验证API - 无需Express
const { createClient } = require('@supabase/supabase-js')

module.exports = async (req, res) => {
  try {
    const supabase = createClient(
      process.env.SUPABASE_URL, 
      process.env.SUPABASE_KEY
    )
    
    const { key } = JSON.parse(req.body)
    
    const { data, error } = await supabase
      .from('activation_keys')
      .select('*')
      .eq('key', key)
      .single()

    res.json({ 
      valid: !error,
      data: error ? null : data
    })
    
  } catch (e) {
    res.status(500).json({ 
      valid: false, 
      error: '服务器错误' 
    })
  }
}
