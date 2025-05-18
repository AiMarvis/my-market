'use client';

import { useState } from 'react';
import { supabase } from '../../lib/supabaseClient'; // Supabase 클라이언트 import
import { useRouter } from 'next/navigation'; // useRouter import 추가

const AuthPage = () => {
  const [activeTab, setActiveTab] = useState('login'); // 'login' or 'signup'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const router = useRouter(); // useRouter 초기화

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setError(null);
    setMessage('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage('');

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      setMessage('로그인 성공! 잠시 후 메인 페이지로 이동합니다.');
      router.push('/'); // 로그인 성공 시 홈으로 리디렉션
    }
    setLoading(false);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage('');

    if (password !== confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.');
      setLoading(false);
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      setMessage('회원가입 성공! 이메일에서 확인 링크를 클릭해주세요.');
      console.log('Signup successful, user:', data.user);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-base-200 p-4">
      <div className="card w-full max-w-sm shadow-2xl bg-base-100">
        <div className="card-body">
          <div className="tabs tabs-boxed justify-center mb-6">
            <a
              className={`tab tab-lg ${activeTab === 'login' ? 'tab-active' : ''}`}
              onClick={() => handleTabChange('login')}
            >
              로그인
            </a>
            <a
              className={`tab tab-lg ${activeTab === 'signup' ? 'tab-active' : ''}`}
              onClick={() => handleTabChange('signup')}
            >
              회원가입
            </a>
          </div>

          {error && <div className="alert alert-error shadow-lg mb-4"><p>{error}</p></div>}
          {message && <div className="alert alert-success shadow-lg mb-4"><p>{message}</p></div>}

          {activeTab === 'login' && (
            <form onSubmit={handleLogin}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">이메일</span>
                </label>
                <input 
                  type="email" 
                  placeholder="이메일" 
                  className="input input-bordered" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                />
              </div>
              <div className="form-control mt-4">
                <label className="label">
                  <span className="label-text">비밀번호</span>
                </label>
                <input 
                  type="password" 
                  placeholder="비밀번호" 
                  className="input input-bordered" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                />
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">비밀번호를 잊으셨나요?</a>
                  {/* TODO: 비밀번호 재설정 기능 구현 */}
                </label>
              </div>
              <div className="form-control mt-6">
                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {loading ? <span className="loading loading-spinner"></span> : '로그인'}
                </button>
              </div>
            </form>
          )}

          {activeTab === 'signup' && (
            <form onSubmit={handleSignup}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">이메일</span>
                </label>
                <input 
                  type="email" 
                  placeholder="이메일" 
                  className="input input-bordered" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                />
              </div>
              <div className="form-control mt-4">
                <label className="label">
                  <span className="label-text">비밀번호</span>
                </label>
                <input 
                  type="password" 
                  placeholder="비밀번호" 
                  className="input input-bordered" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                />
              </div>
              <div className="form-control mt-4">
                <label className="label">
                  <span className="label-text">비밀번호 확인</span>
                </label>
                <input 
                  type="password" 
                  placeholder="비밀번호 확인" 
                  className="input input-bordered" 
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required 
                />
              </div>
              <div className="form-control mt-6">
                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {loading ? <span className="loading loading-spinner"></span> : '회원가입'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPage; 