import { useForm } from 'react-hook-form';
import * as WineCellarAPI from '../../services/ApiService';
import { useAuthContext } from '../../contexts/AuxContext';
import { useNavigate, Link } from 'react-router-dom';

function RegisterForm() {
  const { register, handleSubmit, formState, setError } = useForm();
  const { login } = useAuthContext();
  const navigate = useNavigate();
  const errors = formState.errors;

  const handleRegister = async (user) => {
    const formData = new FormData();

    formData.append('name', user.name);
    formData.append('email', user.email);
    formData.append('password', user.password);
    formData.append('avatar', user.avatar[0]);

    try {
      const newUser = await WineCellarAPI.register(user);
      login(newUser);

      navigate('/dashboard');
    } catch (error) {
      const { data } = error.response;

      Object.keys(data.errors).forEach((inputName) =>
        setError(inputName, { message: data.errors[inputName] })
      );
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-lg bg-white px-8 pt-12 pb-10 shadow-2xl ring-1 ring-gray-900/5 sm:rounded-2xl sm:px-12">
        <div className="w-full text-center">
          <h1 className="text-4xl font-bold text-gray-900">Register</h1>
          <p className="mt-3 text-lg text-gray-600">
            Create an account to get started
          </p>
        </div>

        <div className="mt-6">
          <form onSubmit={handleSubmit(handleRegister)}>
            {/* Name Field */}
            <div className="relative mt-6">
              <input
                type="text"
                className={`peer mt-1 w-full border-b-2 px-0 py-2 text-lg focus:outline-none ${
                  errors.name
                    ? 'border-red-500 text-red-600'
                    : 'border-gray-300 focus:border-gray-500'
                }`}
                placeholder="Full Name"
                {...register('name', { required: 'Name is required' })}
                autoComplete="off"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

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

            {/* Avatar Upload */}
            <div className="relative mt-6 text-center">
              <label
                htmlFor="profile-picture-input"
                className="w-10 h-5 bg-pink-200 border-2 border-b-slate-600 p-2 rounded-full"
              >
                Choose profile picture
              </label>
              <input
                id="profile-picture-input"
                type="file"
                className="hidden w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700"
                {...register('avatar', { required: 'Avatar is required' })}
              />
              {errors.avatar && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.avatar.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div className="my-6">
              <button
                type="submit"
                className="w-full rounded-full bg-black px-4 py-4 text-lg font-semibold text-white hover:bg-gray-800 transition focus:bg-gray-600 focus:outline-none"
              >
                Register
              </button>
            </div>

            {/* Login Link */}
            <p className="text-center text-sm text-gray-500">
              Already have an account?{' '}
              <Link
                to="/login"
                className="font-semibold text-gray-600 hover:underline focus:text-gray-800 focus:outline-none"
              >
                Sign in
              </Link>
              .
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterForm;
