import { useForm } from 'react-hook-form';
import * as WineCellarAPI from '../../services/ApiService';
import { useAuthContext } from '../../contexts/AuxContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function UpdatedProfile() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm();
  const { user, login } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      reset({
        name: user.name,
        email: user.email,
      });
    }
  }, [user, reset]);

  const handleUpdateProfile = async (data) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('email', data.email);

    if (data.password) {
      formData.append('password', data.password);
    }

    if (data.avatar?.[0]) {
      formData.append('avatar', data.avatar[0]);
    }

    try {
      const updatedUser = await WineCellarAPI.updateUser(formData);
      login(updatedUser);
      navigate('/profile');
    } catch (error) {
      const { data } = error.response;
      Object.keys(data.errors).forEach((inputName) =>
        setError(inputName, { message: data.errors[inputName] })
      );
    }
  };

  return (
    <div className=" mt-10 mx-auto w-full max-w-lg bg-white px-4 pt-4 pb-4 shadow-2xl ring-1 ring-gray-900/5 sm:rounded-2xl sm:px-10">
      <div className="w-full">
        <div className="text-center">
          <h1 className="text-3xl font-semibold text-gray-900">Profile</h1>
          <p className="mt-2 text-base text-gray-500">
            Update your personal details below
          </p>
        </div>

        <div className="mt-4">
          <form onSubmit={handleSubmit(handleUpdateProfile)}>
            <div className="relative mt-8">
              <input
                type="text"
                className={`peer mt-1 w-full border-b-2 px-0 py-1.5 focus:outline-none text-base ${
                  errors.name
                    ? 'border-red-500 text-red-600'
                    : 'border-gray-300 focus:border-gray-500'
                }`}
                placeholder="Full Name"
                {...register('name', { required: 'Name is required' })}
                autoComplete="name"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div className="relative mt-8">
              <input
                type="email"
                className={`peer mt-1 w-full border-b-2 px-0 py-1.5 focus:outline-none text-base ${
                  errors.email
                    ? 'border-red-500 text-red-600'
                    : 'border-gray-300 focus:border-gray-500'
                }`}
                placeholder="Email Address"
                {...register('email', { required: 'Email is required' })}
                autoComplete="email"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="relative mt-8">
              <input
                type="password"
                className={`peer mt-1 w-full border-b-2 px-0 py-1.5 focus:outline-none text-base ${
                  errors.password
                    ? 'border-red-500 text-red-600'
                    : 'border-gray-300 focus:border-gray-500'
                }`}
                placeholder="New Password"
                {...register('password', {
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters long',
                  },
                })}
                autoComplete="new-password"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="relative mt-8">
              <label className="block text-base font-medium text-gray-700 mb-2">
                Profile Picture
              </label>
              <input
                type="file"
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-1.5 file:px-4 file:rounded-lg file:border-0 file:bg-gray-100 file:text-gray-700 mt-2"
                {...register('avatar')}
              />
              {errors.avatar && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.avatar.message}
                </p>
              )}
            </div>

            <div className="my-4">
              <button
                type="submit"
                className="w-full rounded-full bg-black px-4 py-3 text-base text-white hover:bg-gray-800 transition focus:bg-gray-600 focus:outline-none mt-6"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdatedProfile;
