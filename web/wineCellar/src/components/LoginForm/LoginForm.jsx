import { useForm } from 'react-hook-form';
import * as WineCellarAPI from '../../services/ApiService';
import { useAuthContext } from '../../contexts/AuxContext';
import { useNavigate, Link } from 'react-router-dom';
import { useEffect } from 'react';

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm();
  const { login } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    reset(); // Limpiar el formulario cuando se monta el componente
  }, [reset]);

  const handleLogin = async (user) => {
    try {
      user = await WineCellarAPI.login(user);
      login(user);
      navigate('/dashboard');
    } catch (error) {
      if (error.response?.status === 401) {
        const { data } = error.response;
        Object.keys(data.errors).forEach((inputName) =>
          setError(inputName, { message: data.errors[inputName] })
        );
      } else {
        console.error(error);
      }
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-lg bg-white px-8 pt-12 pb-10 shadow-2xl ring-1 ring-gray-900/5 sm:rounded-2xl sm:px-12">
        <div className="w-full text-center">
          <h1 className="text-4xl font-bold text-gray-900">Sign in</h1>
          <p className="mt-3 text-lg text-gray-600">
            Sign in below to access your account
          </p>
        </div>

        <div className="mt-6">
          <form onSubmit={handleSubmit(handleLogin)}>
            {/* Email Field */}
            <div className="relative mt-6">
              <input
                type="email"
                className={`peer mt-1 w-full border-b-2 px-0 py-2 text-lg focus:outline-none ${
                  errors.email
                    ? 'border-red-500 text-red-600'
                    : 'border-gray-300 focus:border-gray-500'
                }`}
                placeholder="Email Address"
                {...register('email', { required: 'Email is required' })}
                autoComplete="off"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className="relative mt-6">
              <input
                type="password"
                className={`peer mt-1 w-full border-b-2 px-0 py-2 text-lg focus:outline-none ${
                  errors.password
                    ? 'border-red-500 text-red-600'
                    : 'border-gray-300 focus:border-gray-500'
                }`}
                placeholder="Password"
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters',
                  },
                })}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div className="my-6">
              <button
                type="submit"
                className="w-full rounded-full bg-black px-4 py-4 text-lg font-semibold text-white hover:bg-gray-800 transition focus:bg-gray-600 focus:outline-none"
              >
                Sign in
              </button>
            </div>

            {/* Sign Up Link */}
            <p className="text-center text-sm text-gray-500">
              Don’t have an account yet?{' '}
              <Link
                to="/registration"
                className="font-semibold text-gray-600 hover:underline focus:text-gray-800 focus:outline-none"
              >
                Sign up
              </Link>
              .
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
