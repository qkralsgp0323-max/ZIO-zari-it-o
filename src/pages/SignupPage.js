// SignupPage.js
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

import './SignupPage.scss';

const normalizePhone = (value) => {
  const digits = String(value || "").replace(/[^0-9]/g, "");
  if (digits.length === 11) return `${digits.slice(0,3)}-${digits.slice(3,7)}-${digits.slice(7)}`;
  return value.trim(); // 11자리 아니면 일단 그대로(정확하지 않지만)
};

const normalizeCarNum = (value) => String(value || "").replace(/\s/g, "").trim();

const SignupPage = () => {
  const navigate = useNavigate();
  const { signUpUsers, loading } = useAuth();

  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [carNum, setCarNum] = useState("");

  const handleSignup = async () => {
    try {
      await signUpUsers({
        userId: userId.trim(),
        password: password.trim(),
        phone: normalizePhone(phone),   // 저장형식 통일
        email: email.trim(),
        carNum: normalizeCarNum(carNum),      // 공백 제거
      });

      navigate("/"); // 회원가입 성공 + 자동로그인 → 메인 이동 
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="signup-page">
      <h2>회원가입</h2>

      <div className="form">
        <div className="inputData">
          <label>아이디</label>
          <input
            placeholder="영문으로 입력해주세요."
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
        </div>

        <div className="inputData">
          <label>비밀번호</label>
          <input
            placeholder="영문과 숫자 조합으로 입력해주세요"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="inputData">
          <label>연락처</label>
          <input
            placeholder="010-xxxx-xxxx"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <div className="inputData">
          <label>이메일</label>
          <input
            type="text"
            placeholder="example@text.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="inputData">
          <label>차량 번호</label>
          <input
            type="text"
            placeholder="공백없이 입력해주세요."
            value={carNum}
            onChange={(e) => setCarNum(e.target.value)}
          />
        </div>

        <button className="submit-btn" onClick={handleSignup} disabled={loading}>
          {loading ? "회원가입 중..." : "회원가입"}
        </button>
      </div>
    </div>
  );
};

export default SignupPage;
