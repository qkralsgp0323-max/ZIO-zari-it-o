import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY;


//key, url 확인용
if(!supabaseUrl || !supabaseKey){
  console.error('환경변수 에러! env 설정 파일 확인');
}

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;