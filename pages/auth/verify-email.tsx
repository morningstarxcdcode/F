import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import axios from 'axios';

export default function VerifyEmail() {
  const router = useRouter();
  const { token } = router.query;
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    if (token) {
      verifyEmail();
    }
  }, [token]);

  const verifyEmail = async () => {
    try {
      const response = await axios.post('/api/auth/verify-email', { token });
      if (response.data.success) {
        setStatus('success');
        toast.success('Email verified successfully!');
        // Redirect to login after 3 seconds
        setTimeout(() => router.push('/auth/signin'), 3000);
      } else {
        setStatus('error');
        toast.error('Verification failed. Please try again.');
      }
    } catch (error) {
      setStatus('error');
      toast.error((error as any).response?.data?.message || 'Verification failed');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-green-50 to-green-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
        {status === 'loading' && (
          <div className="space-y-4">
            <div className="animate-spin mx-auto w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full"></div>
            <p className="text-gray-600">Verifying your email...</p>
          </div>
        )}

        {status === 'success' && (
          <div className="space-y-4">
            <div className="text-6xl">✅</div>
            <h1 className="text-2xl font-bold text-gray-900">Email Verified!</h1>
            <p className="text-gray-600">
              Your email has been successfully verified. You will be redirected to login...
            </p>
            <button
              onClick={() => router.push('/auth/signin')}
              className="inline-flex justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Continue to Login
            </button>
          </div>
        )}

        {status === 'error' && (
          <div className="space-y-4">
            <div className="text-6xl">❌</div>
            <h1 className="text-2xl font-bold text-gray-900">Verification Failed</h1>
            <p className="text-red-600">
              We couldn't verify your email. The link may be expired or invalid.
            </p>
            <button
              onClick={() => router.push('/auth/signup')}
              className="inline-flex justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Back to Sign Up
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
