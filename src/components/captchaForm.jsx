import  { useState, useEffect } from 'react';

const CaptchaForm = () => {
  const [captchaUrl, setCaptchaUrl] = useState('http://localhost:3001/captcha');
  const [captchaInput, setCaptchaInput] = useState('');
  const [verificationMessage, setVerificationMessage] = useState('');

  const refreshCaptcha = () => {
    setCaptchaUrl(`http://localhost:3001/captcha?timestamp=${new Date().getTime()}`);
  };

  useEffect(() => {
    refreshCaptcha();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch('http://localhost:3001/verify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ captcha: captchaInput }),
      credentials: 'include'
    });

    const result = await response.text();
    setVerificationMessage(result);
    refreshCaptcha();
    setCaptchaInput('');
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <img src={captchaUrl} alt="CAPTCHA" />
          <button type="button" onClick={refreshCaptcha}>Refrescar CAPTCHA</button>
        </div>
        <div>
          <input
            type="text"
            value={captchaInput}
            onChange={(e) => setCaptchaInput(e.target.value)}
            placeholder="Ingrese el CAPTCHA"
          />
        </div>
        <button type="submit">Enviar</button>
      </form>
      {verificationMessage && <p>{verificationMessage}</p>}
    </div>
  );
};

export default CaptchaForm;
